/**
 * 一些约定：
 *    对于内部私有的函数都使用 _作为前缀
 *    对于内部私有的函数不进行错误处理，如需外部调用，则另外包裹一层并进行错误处理。
 */
import omit from "lodash.omit";
import { getStorageByArray, onStorageChange } from "@/extensions-api";
import {
  createDisconnectionResponse,
  createSuccessAnkiResponse,
  createForgottenResponse,
  createDuplicateResponse,
  createFirstAddSuccessResponse,
  createConfigErrorResponse,
  createAnkiErrorResponse,
  createOldVersionResponse,
  getMediaFields,
  getNotMediaFields,
  isAnkiResponse,
} from "./utils";
import { getConfigName, getDuplicateConfigName } from "./utils";
//声明
import { AnkiResponse, NoteType, AddNoteParams } from "./types";
import { NoteData } from "@/translation-page";
import { Storage, TabPanelName } from "@/extensions-api";

//值必须是小写，且必须是这个值，不应该修改，这是AnkiConnection所要求的
enum Action {
  Version = "version",
  AddNote = "addNote",
  FindCards = "findCards",
  DeckNames = "deckNames",
  ModelNames = "modelNames",
  RelearnCards = "relearnCards",
  ModelFieldNames = "modelFieldNames",
  UpdateNoteFields = "updateNoteFields",
}

type AnkiConfig = Pick<
  Storage,
  | "wordConfig"
  | "phraseConfig"
  | "sentenceConfig"
  | "ankiConnectionURL"
  | "checkWordDuplicate"
  | "checkPhraseDuplicate"
  | "checkSentenceDuplicate"
>;

type ReturnPromiseType<T extends (...args: any[]) => Promise<any>> = T extends (
  ...args: any[]
) => Promise<infer R>
  ? R
  : never;

export class AnkiConnection {
  version: number;
  ankiConfig: AnkiConfig;

  addNote;
  getVersion;
  getDeckNames;
  relearnCards;
  getModelNames;
  getModelFieldNames;

  constructor() {
    this.version = 6; //版本不同，返回值不同，不能够随意修改
    this.ankiConfig = {} as AnkiConfig; //后面会进行初始化赋值

    //初始化AnkiConfig
    //值是必定存在的，因为 getStorage 内部会保证在没值的时候使用默认值，而默认值设定了相应的值
    getStorageByArray(
      [
        "wordConfig",
        "phraseConfig",
        "sentenceConfig",
        "ankiConnectionURL",
        "checkWordDuplicate",
        "checkPhraseDuplicate",
        "checkSentenceDuplicate",
      ],
      (config) => {
        this.updateAnkiConfig<AnkiConfig>(config as AnkiConfig); //初始化时，必须包括所有的 AnkiConfig 配置
      }
    );
    //监听用户配置更新
    onStorageChange({
      wordConfig: (_, wordConfig) => this.updateAnkiConfig({ wordConfig }),
      phraseConfig: (_, phraseConfig) =>
        this.updateAnkiConfig({ phraseConfig }),
      sentenceConfig: (_, sentenceConfig) =>
        this.updateAnkiConfig({ sentenceConfig }),
      ankiConnectionURL: (_, ankiConnectionURL) =>
        this.updateAnkiConfig({ ankiConnectionURL }),
      checkPhraseDuplicate: (_, checkPhraseDuplicate) =>
        this.updateAnkiConfig({ checkPhraseDuplicate }),
      checkSentenceDuplicate: (_, checkSentenceDuplicate) =>
        this.updateAnkiConfig({ checkSentenceDuplicate }),
      checkWordDuplicate: (_, checkWordDuplicate) =>
        this.updateAnkiConfig({ checkWordDuplicate }),
    });

    this.addNote = this._addErrorCatch(this._addNote);
    this.getVersion = this._addErrorCatch(this._getVersion);
    this.getDeckNames = this._addErrorCatch(this._getDeckNames);
    this.relearnCards = this._addErrorCatch(this._relearnCards);
    this.getModelNames = this._addErrorCatch(this._getModelNames);
    this.getModelFieldNames = this._addErrorCatch(this._getModelFieldNames);
  }

  private _addErrorCatch<T extends (...args: any[]) => Promise<any>>(
    executor: T
  ): (...args: Parameters<T>) => Promise<AnkiResponse<ReturnPromiseType<T>>> {
    return async (...args: Parameters<T>) => {
      const result = await executor.apply(this, args);
      if (isAnkiResponse(result)) return result;
      return createSuccessAnkiResponse(result);
    };
  }

  updateAnkiConfig<T extends Partial<AnkiConfig>>(config: T) {
    this.ankiConfig = { ...this.ankiConfig, ...config };
  }

  private async _addNote(data: NoteData) {
    let note: AddNoteParams | null = null;
    let type = null;
    if ("word" in data) type = NoteType.Word;
    if ("phrase" in data) type = NoteType.Phrase;
    if ("sentence" in data) type = NoteType.Sentence; //await是必须的
    //await是必须的
    await this._testSecurity(type!);
    note = this._formatData(type!, data);
    const result = await this._handleDuplicate(type!, data, note);
    return result;
  }

  /**
   * 确保deckName、modelName、fieldNames等是存在的
   */
  private async _testSecurity(type: NoteType) {
    const configName = getConfigName(type);
    const config = this.ankiConfig[configName];
    //检查 deckName 是否为空
    const deckName = config.deckName;
    const deckNames = await this._getDeckNames();
    if (!deckNames.includes(deckName)) {
      throw createConfigErrorResponse();
    }
    //检查 modelName 是否为空
    const modelName = config.modelName;
    const modelNames = await this._getModelNames();
    if (!modelNames.includes(modelName)) {
      throw createConfigErrorResponse();
    }
    //检查 fields 是否正确（在Anki上该值是否存在）
    const modelFieldNames = await this._getModelFieldNames(modelName);
    const fieldNames = omit(config, ["deckName", "modelName", "tags"]);
  }

  /**
   * 处理卡片重复添加的逻辑
   */
  private async _handleDuplicate(
    type: NoteType,
    data: NoteData,
    note: AddNoteParams
  ) {
    const configName = getConfigName(type);
    const duplicateConfigName = getDuplicateConfigName(type);
    const config = this.ankiConfig[configName];
    const duplicateConfig = this.ankiConfig[duplicateConfigName];
    //改写Anki内置的重复判断逻辑，将控制权交给用户
    const query = Object.entries(duplicateConfig).reduce(
      (query, [key, val]) => {
        //检查deck
        if (key === "deckName") {
          return query + val ? ` deck:${config[key]}` : "";
        }
        //检查 model
        if (key === "modelName") {
          return query + val ? ` note:${config[key]}` : "";
        }
        //val为false则表示其不是用于查重的字段
        if (!val) return query;
        //@ts-ignore,由于Object.entries不能够很好的推断类型，所以导致该问题
        const fieldName = config[key];
        //@ts-ignore,由于Object.entries不能够很好的推断类型，所以导致该问题
        const content = data[key];
        if (!fieldName || !content) return query;
        //注意前方的空格，其是必须的
        query += ` "${content}"`;
        return query;
      },
      ""
    );

    // - cardIds没有值，此时逻辑应该为:再次添加卡片，添加方式为允许重复。
    // - cardIds有一个值，此时逻辑应该为:立刻开始学习
    // - cardIds有多个值，此时逻辑应该为:报错，返回查询字符串，让用户到Anki中查看重复。
    const cardIds = await this._findCards(query);
    const { length } = cardIds;
    switch (length) {
      case 0: {
        //卡片不存在，作为新卡片添加
        const cardId = await this._request(Action.AddNote, { note });
        return createFirstAddSuccessResponse(cardId);
      }
      case 1: //卡片已添加，是否立刻复习/学习
        return createForgottenResponse(cardIds);
      default: //卡片重复添加
        return createDuplicateResponse(cardIds);
    }
  }

  private async _findCards(query: string): Promise<number[]> {
    return this._request(Action.FindCards, {
      query,
    });
  }

  private async _relearnCards(cards: number[]) {
    //await是必须的
    await this._request(Action.RelearnCards, { cards });
    return cards;
  }

  private async _getModelNames() {
    const result = await this._request(Action.ModelNames);
    return result;
  }

  private async _getDeckNames() {
    const result = await this._request(Action.DeckNames);
    return result;
  }

  private async _getModelFieldNames(modelName: string) {
    const result = await this._request(Action.ModelFieldNames, { modelName });
    return result;
  }

  private async _getVersion() {
    const result = await this._request(Action.Version);
    //更新 version
    this.version = result;
    return result;
  }

  private _formatData(type: NoteType, data: NoteData): AddNoteParams {
    const configName = getConfigName(type);
    const config = this.ankiConfig[configName];
    const { deckName, modelName, tags, ...modelFieldNames } = config;

    const audio = getMediaFields(type, data, modelFieldNames);
    const fields = getNotMediaFields(type, data, modelFieldNames);

    if (!Object.keys(modelFieldNames).length) throw createConfigErrorResponse();

    return {
      deckName: deckName!, //在调用该函数前已经调用 testSecurity 进行非空检查
      modelName: modelName!, //在调用该函数前已经调用 testSecurity 进行非空检查
      fields,
      audio,
      tags: (tags && tags.trim().split(/\s+/g)) || [],
      options: {
        allowDuplicate: true, //重复判断逻辑已经重写，所以这里恒定true，避免被原有逻辑影响到
        duplicateScope: "deck",
        duplicateScopeOptions: {
          deckName: deckName!, //在调用该函数前已经调用 testSecurity 进行非空检查
          checkChildren: false,
          checkAllModels: false,
        },
      },
    };
  }

  /**
   * 向Anki发送请求的函数
   * @param action 具体请求动作，类似 http 中的 method
   * @param params 请求所携带的参数
   */
  private async _request(action: Action.DeckNames): Promise<string[]>;
  private async _request(action: Action.ModelNames): Promise<string[]>;
  private async _request(action: Action.Version): Promise<number>;
  private async _request(
    action: Action.FindCards,
    params: { query: string }
  ): Promise<number[]>;
  private async _request(
    action: Action.ModelFieldNames,
    params: { modelName: string }
  ): Promise<string[]>;
  private async _request(
    action: Action.AddNote,
    params: { note: AddNoteParams }
  ): Promise<number>;
  private async _request(
    action: Action.RelearnCards,
    params: { cards: number[] }
  ): Promise<null>;
  private async _request(
    action: Action,
    params: { [key: string]: any } = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const { version } = this;
      const { ankiConnectionURL } = this.ankiConfig;
      const xhr = new XMLHttpRequest();
      xhr.addEventListener("error", () =>
        reject(createDisconnectionResponse())
      );
      xhr.addEventListener("load", () => {
        try {
          const response = JSON.parse(xhr.responseText);
          if (
            Object.getOwnPropertyNames(response).length != 2 ||
            !Object.prototype.hasOwnProperty.call(response, "result") ||
            !Object.prototype.hasOwnProperty.call(response, "error")
          ) {
            throw createOldVersionResponse();
          }
          if (response.error) {
            throw createAnkiErrorResponse();
          }
          resolve(response.result);
        } catch (e) {
          reject(e);
        }
      });

      xhr.open("POST", ankiConnectionURL);
      xhr.send(JSON.stringify({ action, version, params }));
    });
  }
}
