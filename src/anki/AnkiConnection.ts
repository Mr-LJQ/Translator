import omit from "lodash.omit";
import { warning } from "@/utils";
import { COMMON_CONFIG_MAP } from "@/configuration";
import { extractPromiseType, ReturnPromiseType } from "@/types";
import {
  isAnkiResponse,
  createDuplicateResponse,
  createForgottenResponse,
  createAnkiErrorResponse,
  createOldVersionResponse,
  createSuccessAnkiResponse,
  createConfigErrorResponse,
  createDisconnectionResponse,
  createFirstAddSuccessResponse,
  createUnexpectedErrorResponse,
  getConfigName,
  getMediaFields,
  getNotMediaFields,
  getDuplicateConfigName,
} from "./utils";
//声明
import { NoteData } from "@/translation-page";
import { AnkiResponse, NoteType, AddNoteParams, AnkiConfig } from "./types";

//值必须是小写，且必须是这个值，不应该修改，这是 AnkiConnection 所要求的
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

//避免 AnkiResponse 嵌套
type flatAnkiResponse<T extends (...args: any[]) => Promise<any>> =
  ReturnPromiseType<T> extends AnkiResponse<any>
    ? Promise<ReturnPromiseType<T>>
    : Promise<AnkiResponse<ReturnPromiseType<T>>>;
/**
 * 这是用于调用 AnkiConnection 提供的接口的封装
 */
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

    this.addNote = this._addErrorCatch(this._addNote);
    this.getVersion = this._addErrorCatch(this._getVersion);
    this.getDeckNames = this._addErrorCatch(this._getDeckNames);
    this.relearnCards = this._addErrorCatch(this._relearnCards);
    this.getModelNames = this._addErrorCatch(this._getModelNames);
    this.getModelFieldNames = this._addErrorCatch(this._getModelFieldNames);
  }

  private _addErrorCatch<T extends (...args: any[]) => Promise<any>>(
    executor: T
  ): (
    ...args: Parameters<T>
  ) => flatAnkiResponse<T> | Promise<AnkiResponse<unknown>> {
    return async (...args: Parameters<T>) => {
      try {
        /**
         * result 有两种情况：
         *  第一种，返回的是AnkiResponse，那么不需要再次包装，直接返回
         *  第二种，返回的不是AnkiResponse,而是一个正常值，则需要包装后返回
         * 这是为了保证，返回的都是AnkiResponse.
         */
        const result = await executor.apply(this, args);
        if (isAnkiResponse(result)) return result;
        return createSuccessAnkiResponse(result);
      } catch (e) {
        if (isAnkiResponse(e)) return e;
        warning(false, (e as any)?.message);
        if (typeof e === "string" || e instanceof Error) {
          return createUnexpectedErrorResponse(e);
        }
        return createUnexpectedErrorResponse(
          "这是一个出乎该插件开发者预料的错误,如需解决请提交该问题"
        );
      }
    };
  }

  updateAnkiConfig<T extends Partial<AnkiConfig>>(config: T) {
    this.ankiConfig = { ...this.ankiConfig, ...config };
  }

  private async _addNote(data: NoteData) {
    let type = null;
    if ("word" in data) type = NoteType.Word;
    if ("phrase" in data) type = NoteType.Phrase;
    if ("sentence" in data) type = NoteType.Sentence;
    //await是必须的
    await this._testSecurity(type!);
    const note: AddNoteParams = this._formatData(type!, data);
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
    if (deckName == null || !deckNames.includes(deckName)) {
      throw createConfigErrorResponse(
        `卡片对应的${COMMON_CONFIG_MAP.deckName} 为空或在Anki上不存在`
      );
    }
    //检查 modelName 是否为空
    const modelName = config.modelName;
    const modelNames = await this._getModelNames();
    if (modelName == null || !modelNames.includes(modelName)) {
      throw createConfigErrorResponse(
        `卡片对应的${COMMON_CONFIG_MAP.modelName} 为空或在Anki上不存在`
      );
    }
    //检查 fields 是否正确（在Anki上该值是否存在）
    const modelFieldNames = await this._getModelFieldNames(modelName);
    const fieldNames = Object.values(
      omit(config, ["deckName", "modelName", "tags"])
    );

    //检查用户是否配置了任何一个fieldName，fieldNames不能够都没有配置
    const isEmpty = fieldNames.every((val) => val == null || val === "");
    if (isEmpty) {
      throw createConfigErrorResponse(`未配置任何一个 字段名`);
    }

    const includesAll = fieldNames.every((val) => {
      if (val == null || val === "") return true;
      return modelFieldNames.includes(val as string);
    });
    if (!includesAll) {
      throw createConfigErrorResponse(
        `存在一些 字段名 无法在对应的 模型 中找到`
      );
    }
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
        //val为falsy则表示其不是用于查重的字段
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
        return createFirstAddSuccessResponse([cardId]);
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

  /**
   * 将数据格式化为Anki所要求的格式
   */
  private _formatData(type: NoteType, data: NoteData): AddNoteParams {
    const configName = getConfigName(type);
    const config = this.ankiConfig[configName];
    const { deckName, modelName, tags, ...modelFieldNames } = config;

    const audio = getMediaFields(type, data, modelFieldNames);
    const fields = getNotMediaFields(type, data, modelFieldNames);
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
        reject(
          createDisconnectionResponse(
            `无法通过URL: ${ankiConnectionURL} 连接到Anki，可通过检查：\n\t- Anki是否打开\n\t- AnkiConnection插件是否安装\n\t- 目标URL是否正确配置来排查该问题`
          )
        )
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
            throw createAnkiErrorResponse(response.error);
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

export type GetVersionReturnType = extractPromiseType<
  ReturnType<AnkiConnection["getVersion"]>
>;
export type GetDeckNamesReturnType = extractPromiseType<
  ReturnType<AnkiConnection["getDeckNames"]>
>;
export type GetModelFieldNamesReturnType = extractPromiseType<
  ReturnType<AnkiConnection["getModelFieldNames"]>
>;
export type GetModelNamesReturnType = extractPromiseType<
  ReturnType<AnkiConnection["getModelNames"]>
>;
export type AddNoteReturnType = extractPromiseType<
  ReturnType<AnkiConnection["addNote"]>
>;
export type RelearnCardsReturnType = extractPromiseType<
  ReturnType<AnkiConnection["relearnCards"]>
>;
