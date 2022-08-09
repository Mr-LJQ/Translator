/**
 * 一些约定：
 *    对于内部私有的函数都使用 _作为前缀
 *    对于内部私有的函数不进行错误处理，如需外部调用，则另外包裹一层并进行错误处理。
 */
import { getStorageByArray, onStorageChange } from "@/extensions-api";
import {
  createDisconnectionResponse,
  createSuccessAnkiResponse,
  createForgottenResponse,
  createDuplicateResponse,
  createFirstAddSuccessResponse,
  createConfigErrorResponse,
} from "./utils";
import { TabPanelName } from "@/extensions-api";
import { getConfigName, getDuplicateConfigName } from "./utils";
import { invariant } from "@/utils";
//声明
import { AnkiResponse, NoteType, AddNoteParams } from "./types";
import { NoteData } from "@/translation-page";
import { Storage } from "@/extensions-api";

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

enum ReturnError {
  // 值不能够修改，其是AnkiConnection返回的字符串,值的所有权不在我
  AddNoteDuplicateError = "cannot create note because it is a duplicate",
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

export class AnkiConnection {
  version: number;
  ankiConfig: AnkiConfig;

  constructor() {
    this.version = 6; //版本不同，返回值不同，不能够随意修改
    this.ankiConfig = {} as AnkiConfig; //后面会进行初始化赋值

    //初始化AnkiConfig
    /**
     * 值是必定存在的，因为 getStorage 内部会保证在没值的时候使用默认值，而默认值设定了相应的值
     */
    getStorageByArray(
      [
        "wordConfig",
        "phraseConfig",
        "sentenceConfig",
        "ankiConnectionURL",
        "checkPhraseDuplicate",
        "checkWordDuplicate",
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
  }

  private async _catchErrorHandler(executor: Function) {}

  updateAnkiConfig<T extends Partial<AnkiConfig>>(config: T) {
    this.ankiConfig = { ...this.ankiConfig, ...config };
  }

  async addNote(data: NoteData): Promise<AnkiResponse<unknown>> {
    try {
      if ("word" in data) return await this._addNote(NoteType.Word, data);
      if ("phrase" in data) return await this._addNote(NoteType.Phrase, data);
      if ("sentence" in data)
        return await this._addNote(NoteType.Sentence, data);
    } catch (e) {
      /**
       * 部分错误的处理需要弹出配置页
       * 部分错误直接作为结果返回
       */
      openOptions(TabPaneKey.Word);
      openOptions(TabPaneKey.Phrase);
      openOptions(TabPaneKey.Sentence);
    }
  }

  private async _addNote(type: NoteType, data: NoteData) {
    var note: AddNoteParams | null = null;
    try {
      //await是必须的
      await this._testSecurity(type);
      note = this._formatData(type, data);
      const cardId = await this._invoke(Action.AddNote, { note });
      return createAddNoteSuccessAnkiResponse(cardId);
    } catch (e) {
      if (note == null) throw e;
      if (
        //只处理重复添加的错误
        e instanceof AnkiResponse &&
        e.status === ResponseStatus.ReturnError &&
        e.message === ReturnError.AddNoteDuplicateError
      ) {
        return await this._handleDuplicate(type, data, note);
      }
      //其它错误向下抛出
      throw e;
    }
  }

  /**
   * 确保deckName、modelName、fieldNames等是存在的
   */
  private async _testSecurity(type: NoteType) {
    const configName = getConfigName(type);
    const config = this.ankiConfig[configName];
    //检查 deckName 是否为空
    const deckName = config.deckName
    const deckNames = await this._getDeckNames()
    if (!deckNames.includes(deckName)) {
      throw createConfigErrorResponse()
    }
    //检查 modelName 是否为空
    const modelName = config.modelName
    const modelNames = await this._getModelNames()
    if (!modelNames.includes(modelName)) {
      throw createConfigErrorResponse()
    }
    //检查 fields 是否正确（在Anki上该值是否存在）
    const modelFieldNames = await this._getModelFieldNames(modelName)
    
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
          return query + " " + val ? `deck:${config[key]}` : "";
        }
        //检查 model
        if (key === "modelName") {
          return query + " " + val ? `note:${config[key]}` : "";
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
        const cardId = await this._invoke(Action.AddNote, { note });
        return createFirstAddSuccessResponse(cardId);
      }
      case 1: //卡片已添加，是否立刻复习/学习
        return createForgottenResponse(cardIds);
      default: //卡片重复添加
        return createDuplicateResponse(cardIds);
    }
  }

  private async _findCards(query: string): Promise<number[]> {
    return this._invoke(Action.FindCards, {
      query,
    });
  }

  private async _relearnCards(cards: number[]) {
    //await是必须的
    await this._invoke(Action.RelearnCards, { cards });
    return createSuccessAnkiResponse(cards);
  }

  private async _getModelNames() {
    const result = await this._invoke(Action.ModelNames);
    return result
  }

  private async _getDeckNames() {
    const result = await this._invoke(Action.DeckNames);
    return result
  }

  private async _getModelFieldNames(modelName: string) {
    const result = await this._invoke(Action.ModelFieldNames, { modelName });
    return createSuccessAnkiResponse(result);
  }

  private async _getVersion() {
    const result = await this._invoke(Action.Version);
    return createSuccessAnkiResponse(result);
  }

  private _formatData(type: NoteType, data: Partial<NoteData>): AddNoteParams {
    const configName = getConfigName(type);
    const config = this.ankiConfig[configName];
    const { deckName, modelName, tags, modelFieldNames } = config;

    const mediaNames = getMediaNames(type);
    const notMediaNames = getNotMediaNames(type);
    const audio = getMediaFields(mediaNames, data, modelFieldNames);
    const fields = getNotMediaFields(notMediaNames, data, modelFieldNames);

    if (!Object.keys(modelFieldNames).length)
      throw new AnkiResponse({
        status: {
          [NoteType.Word]: ResponseStatus.AllFieldNamesIsEmptyInWordConfig,
          [NoteType.Phrase]: ResponseStatus.AllFieldNamesIsEmptyInPhraseConfig,
          [NoteType.Sentence]:
            ResponseStatus.AllFieldNamesIsEmptyInSentenceConfig,
        }[type],
        statusIcon: StatusIcon.Error,
        message: `${configName} 中的没有配置任何的 field `,
      });
    return {
      deckName: deckName!, //在调用该函数前已经调用 testSecurity 进行非空检查
      modelName: modelName!, //在调用该函数前已经调用 testSecurity 进行非空检查
      fields,
      audio,
      tags: (tags && tags.trim().split(/\s+/g)) || [],
      options: {
        allowDuplicate: false,
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
   * 调用Anki接口的函数
   * @param action 调用Anki接口的指令
   * @param params 调用该指令所携带的参数
   * @returns 成功/失败的说明
   */
  private async _invoke(action: Action.DeckNames): Promise<string[]>;
  private async _invoke(action: Action.ModelNames): Promise<string[]>;
  private async _invoke(action: Action.Version): Promise<number>;
  private async _invoke(
    action: Action.FindCards,
    params: { query: string }
  ): Promise<number[]>;
  private async _invoke(
    action: Action.ModelFieldNames,
    params: { modelName: string }
  ): Promise<string[]>;
  private async _invoke(
    action: Action.AddNote,
    params: { note: AddNoteParams }
  ): Promise<number>;
  private async _invoke(
    action: Action.RelearnCards,
    params: { cards: number[] }
  ): Promise<null>;
  private async _invoke(
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
            !response.hasOwnProperty("result") ||
            !response.hasOwnProperty("error")
          ) {
            throw new AnkiResponse({
              statusIcon: StatusIcon.Disconnect,
              status: ResponseStatus.OldVersion,
              message: "AnkiConnection版本过旧，请进行更新。",
            });
          }
          if (response.error) {
            throw new AnkiResponse({
              statusIcon: StatusIcon.Error,
              status: ResponseStatus.ReturnError,
              message: response.error,
            });
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
