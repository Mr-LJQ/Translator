/**
 * 一些约定：
 *    对于内部私有的函数都使用 _作为前缀
 *    对于内部私有的函数不进行错误处理，如需外部调用，则另外包裹一层并进行错误处理。
 */

import { setStorage, openOptionsPage, onStorageChange } from "../utils/extensions-api"
import { StatusIcon } from "../iframe/view/components/AnkiButton"
import { TabPaneKey, getStorage } from "../utils/extensions-api"
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//声明
import type { NoteData } from "../utils/extensions-api"
import type { Storage, WordConfig, PhraseConfig, SentenceConfig, WordModelFieldNames, PhraseModelFieldNames, SentenceModelFieldNames } from "../utils/extensions-api"

enum StateCode {
  Duplicate,
  Forget,
  Success,
  RelearnSuccess,
  Disconnect,
  ReturnError,
}

export interface CardInfo {
  code: StateCode;
  state: StatusIcon;
  cardIds?: number[];
  explanation: string;
}

//AnkiConnection所要求的格式
interface AddNoteParams {
  deckName: string,
  modelName: string,
  fields: {
    [key: string]: string
  },
  options: {
    allowDuplicate: boolean,
    duplicateScope: "deck",
    duplicateScopeOptions: {
      deckName: string,
      checkChildren: boolean,
      checkAllModels: boolean
    }
  },
  tags?: string[],
  audio?: MediaField,
  video?: MediaField,
  picture?: MediaField
}

type MediaField = Array<{
  url: string,
  filename: string,
  skipHash?: string,
  fields: string[]
}>


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
  AddNoteDuplicateError = "cannot create note because it is a duplicate"
}

type AnkiConfig = Pick<Storage, "wordConfig" | "phraseConfig" | "sentenceConfig" | "ankiConnectionURL">

enum NoteType {
  Word = 0,//用显式声明进行强调，值是不变的
  Phrase = 1,
  Sentence = 2,
}


enum ResponseStatus {
  Disconnect,
  OldVersion,
  ReturnError,
  RelearnSuccess,
  Unexpected,
  Duplicate,
  Forgotten,
  AddSuccess,
  WordConfigIsNull,
  PhraseConfigIsNull,
  SentenceConfigIsNull,
  DeckNameIsNullInWordConfig,
  DeckNameIsNullInPhraseConfig,
  DeckNameIsNullInSentenceConfig,
  ModelNameIsNullInWordConfig,
  ModelNameIsNullInPhraseConfig,
  ModelNameIsNullInSentenceConfig,
  MismatchedFieldNameInWordConfig,
  MismatchedFieldNameInPhraseConfig,
  MismatchedFieldNameInSentenceConfig,
  AllFieldNamesIsEmptyInWordConfig,
  AllFieldNamesIsEmptyInPhraseConfig,
  AllFieldNamesIsEmptyInSentenceConfig,
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//具体实现
let single: null | AnkiConnection = null
/**
 * 非纯class,内部运行有副作用逻辑，只应该运行一次
 */
export class AnkiConnection {

  version: number
  ankiConfig: AnkiConfig

  constructor() {
    this.version = 6  //版本不同，返回值不同，不能够随意修改
    this.ankiConfig = {} as AnkiConfig //后面会进行初始化赋值

    //单例模式
    if (single != null) return single
    single = this

    //初始化AnkiConfig
    /**
     * 值是必定存在的，因为 getStorage 内部会保证在没值的时候使用默认值，而默认值设定了相应的值
     */
    getStorage(["wordConfig", "phraseConfig", "sentenceConfig", "ankiConnectionURL"], (config) => {
      this.updateAnkiConfig<AnkiConfig>(config)//初始化时，必须包括所有的 AnkiConfig 配置
    })
    //监听用户配置更新
    onStorageChange({
      wordConfig: (_, wordConfig) => this.updateAnkiConfig({ wordConfig }),
      phraseConfig: (_, phraseConfig) => this.updateAnkiConfig({ phraseConfig }),
      sentenceConfig: (_, sentenceConfig) => this.updateAnkiConfig({ sentenceConfig }),
      ankiConnectionURL: (_, ankiConnectionURL) => this.updateAnkiConfig({ ankiConnectionURL }),
    })
  }

  private async _catchErrorHandler(executor: Function) {
    try {
      executor()
    } catch (e) {
      if (e instanceof AnkiResponse) {
        return e
      }
      return createUnexpectedErrorResponse()
    }
  }

  updateAnkiConfig<T extends Partial<AnkiConfig>>(config: T) {
    this.ankiConfig = { ...this.ankiConfig, ...config }
  }

  async addNote(data: NoteData): Promise<AnkiResponse> {
    try {
      if ("word" in data) return await this._addNote(NoteType.Word, data)
      if ("phrase" in data) return await this._addNote(NoteType.Phrase, data)
      if ("sentence" in data) return await this._addNote(NoteType.Sentence, data)
    } catch (e) {
      /**
       * 部分错误的处理需要弹出配置页
       * 部分错误直接作为结果返回
       */
      openOptions(TabPaneKey.Word)
      openOptions(TabPaneKey.Phrase)
      openOptions(TabPaneKey.Sentence)
    }
  }

  private async _addNote(type: NoteType, data: NoteData) {
    var note: AddNoteParams | null = null
    try {
      //await是必须的
      await this._testSecurity(type)
      note = this._formatData(type, data)
      let cardId = await this._invoke(Action.AddNote, { note })
      return createAddNoteSuccessAnkiResponse(cardId)
    } catch (e) {
      if (note == null) throw e
      if (//只处理重复添加的错误
        e instanceof AnkiResponse
        && e.status === ResponseStatus.ReturnError
        && e.message === ReturnError.AddNoteDuplicateError
      ) {
        return await this._handleDuplicate(type, data, note)
      }
      //其它错误向下抛出
      throw e
    }
  }

  /**
   * 确保deckName、modelName、fieldNames等是存在的
   */
  private async _testSecurity(type: NoteType) {
    const configName = getConfigName(type)
    const config = this.ankiConfig[configName]
    //检查 deckName 是否为空
    let deckName = config.deckName
    assertion(deckName != null, {
      status: {
        [NoteType.Word]: ResponseStatus.DeckNameIsNullInWordConfig,
        [NoteType.Phrase]: ResponseStatus.DeckNameIsNullInPhraseConfig,
        [NoteType.Sentence]: ResponseStatus.DeckNameIsNullInSentenceConfig
      }[type],
      message: `${configName} 中的 deckName 项为空`,
    })
    let deckNames = await this._getDeckNames()
    deckNames.includes(deckName)
    //检查 modelName 是否为空
    let modelName = config.modelName
    assertion(modelName != null, {
      status: {
        [NoteType.Word]: ResponseStatus.ModelNameIsNullInWordConfig,
        [NoteType.Phrase]: ResponseStatus.ModelNameIsNullInPhraseConfig,
        [NoteType.Sentence]: ResponseStatus.ModelNameIsNullInSentenceConfig
      }[type],
      message: `${configName} 中的 modelName 项为空`,
    })
    let modelNames = await this._getModelNames()
    modelNames.includes(modelName)

    //检查 fields 是否正确（在Anki上该值是否存在）
    let fieldNames = await this._getModelFieldNames(modelName)
    let fields = Object.values(config.modelFieldNames)
    assertion(hasNotMismatchedFieldName(fields, fieldNames), {
      status: {//注意顺序，不能够乱
        [NoteType.Word]: ResponseStatus.MismatchedFieldNameInWordConfig,
        [NoteType.Phrase]: ResponseStatus.MismatchedFieldNameInPhraseConfig,
        [NoteType.Sentence]: ResponseStatus.MismatchedFieldNameInSentenceConfig
      }[type],
      message: `${configName} 中的存在 fieldName 项未在相应的模版(${modelName})中存在`,
    })
  }

  /**
   * 处理卡片重复添加的逻辑
   */
  private async _handleDuplicate(type: NoteType, data: NoteData, note: AddNoteParams): Promise<AnkiResponse> {
    let configName = getConfigName(type)
    let config = this.ankiConfig[configName]
    let { modelFieldNames, checkForDuplicateFields } = config
    let deckName = config.deckName!//进入该函数前，已经通过 testSecurity 确保值必定不为空
    //改写Anki内置的重复判断，将控制权交给用户
    const query = Object.entries(checkForDuplicateFields).reduce((query, [key, val]) => {
      //val为false则表示其不是用于查重的字段
      if (!val) return query
      //@ts-ignore,由于Object.entries不能够很好的推断类型，所以导致该问题
      const field = modelFieldNames[key]
      //@ts-ignore,由于Object.entries不能够很好的推断类型，所以导致该问题
      const content = data[key]
      if (!field || !content) return query
      //注意前方的空格，其是必须的
      query += ` "${content}"`
      return query
    }, `deck:${deckName}`)

    // 情况: cardIds没有值，此时逻辑应该为:再次添加卡片，添加方式为允许重复。
    // 情况: cardIds有一个值，此时逻辑应该为:立刻开始学习
    // 情况: cardIds有多个值，此时逻辑应该为:报错，返回查询字符串，让用户到Anki中查看重复。
    const cardIds = await this._findCards(query)
    const { length } = cardIds
    switch (length) {
      case 0://卡片不存在，作为新卡片添加
        note.options.allowDuplicate = true
        let cardId = await this._invoke(Action.AddNote, { note })
        return createAddNoteSuccessAnkiResponse(cardId)
      case 1://卡片已添加，是否立刻复习/学习
        return new AnkiResponse({ statusIcon: StatusIcon.Forget, status: ResponseStatus.Forgotten, message: "卡片重复添加，是否重置其学习进度？", cardIds })
      default://卡片重复添加
        return new AnkiResponse({ statusIcon: StatusIcon.Error, status: ResponseStatus.Duplicate, message: "卡片重复添加(单击将相关ID复制到剪切板)", cardIds })
    }
  }

  private async _findCards(query: string): Promise<number[]> {
    return this._invoke(Action.FindCards, {
      query,
    })
  }

  private async _relearnCards(cards: number[]): Promise<AnkiResponse> {
    //await是必须的
    await this._invoke(Action.RelearnCards, { cards })
    return new AnkiResponse({
      statusIcon: StatusIcon.Success,
      status: ResponseStatus.RelearnSuccess,
      message: "学习进度重置成功"
    })
  }

  private async _getModelNames(): Promise<string[]> {
    let result = await this._invoke(Action.ModelNames)
    return result
  }

  private async _getDeckNames(): Promise<string[]> {
    let result = await this._invoke(Action.DeckNames)
    return result
  }

  private async _getModelFieldNames(modelName: string): Promise<string[]> {
    let result = await this._invoke(Action.ModelFieldNames, { modelName })
    return result
  }

  private async _getVersion(): Promise<number> {
    let result = await this._invoke(Action.Version)
    this.version = result
    return result
  }

  private _formatData(type: NoteType, data: Partial<NoteData>): AddNoteParams {
    let configName = getConfigName(type)
    const config = this.ankiConfig[configName]
    const { deckName, modelName, tags, modelFieldNames } = config

    let mediaNames = getMediaNames(type)
    let notMediaNames = getNotMediaNames(type)
    const audio = getMediaFields(mediaNames, data, modelFieldNames)
    const fields = getNotMediaFields(notMediaNames, data, modelFieldNames)

    if (!Object.keys(modelFieldNames).length) throw new AnkiResponse({
      status: {
        [NoteType.Word]: ResponseStatus.AllFieldNamesIsEmptyInWordConfig,
        [NoteType.Phrase]: ResponseStatus.AllFieldNamesIsEmptyInPhraseConfig,
        [NoteType.Sentence]: ResponseStatus.AllFieldNamesIsEmptyInSentenceConfig,
      }[type],
      statusIcon: StatusIcon.Error,
      message: `${configName} 中的没有配置任何的 field `
    })
    return {
      deckName: deckName!,//在调用该函数前已经调用 testSecurity 进行非空检查
      modelName: modelName!,//在调用该函数前已经调用 testSecurity 进行非空检查
      fields,
      audio,
      tags: tags && tags.trim().split(/\s+/g) || [],
      options: {
        allowDuplicate: false,
        "duplicateScope": "deck",
        "duplicateScopeOptions": {
          deckName: deckName!,//在调用该函数前已经调用 testSecurity 进行非空检查
          "checkChildren": false,
          "checkAllModels": false
        }
      },
    }
  }

  /**
   * 调用Anki接口的函数
   * @param action 调用Anki接口的指令
   * @param params 调用该指令所携带的参数
   * @returns 成功/失败的说明
   */
  private async _invoke(action: Action.DeckNames): Promise<string[]>
  private async _invoke(action: Action.ModelNames): Promise<string[]>
  private async _invoke(action: Action.Version): Promise<number>
  private async _invoke(action: Action.FindCards, params: { query: string }): Promise<number[]>
  private async _invoke(action: Action.ModelFieldNames, params: { modelName: string }): Promise<string[]>
  private async _invoke(action: Action.AddNote, params: { note: AddNoteParams }): Promise<number>
  private async _invoke(action: Action.RelearnCards, params: { cards: number[] }): Promise<null>
  private async _invoke(action: Action, params: { [key: string]: any } = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      const { version } = this
      const { ankiConnectionURL } = this.ankiConfig
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('error', () => reject(new AnkiResponse({
        statusIcon: StatusIcon.Disconnect,
        status: ResponseStatus.Disconnect,
        message: `无法通过URL:${ankiConnectionURL} 连接到Anki，可通过检查：Anki是否打开、AnkiConnection插件是否安装、目标URL是否正确配置来排查该问题。`
      })));
      xhr.addEventListener('load', () => {
        try {
          const response = JSON.parse(xhr.responseText);
          if (
            Object.getOwnPropertyNames(response).length != 2
            || !response.hasOwnProperty('result')
            || !response.hasOwnProperty('error')
          ) {
            throw new AnkiResponse({
              statusIcon: StatusIcon.Disconnect,
              status: ResponseStatus.OldVersion,
              message: "AnkiConnection版本过旧，请进行更新。"
            })
          }
          if (response.error) {
            throw new AnkiResponse({
              statusIcon: StatusIcon.Error,
              status: ResponseStatus.ReturnError,
              message: response.error
            });
          }
          resolve(response.result);
        } catch (e) {
          reject(e);
        }
      });

      xhr.open('POST', ankiConnectionURL);
      xhr.send(JSON.stringify({ action, version, params }));
    });
  }

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//工具函数

//如果用户未进行任何短语相关的配置，则弹出配置窗口，让用户进行配置
function openOptions(activeTabPane: TabPaneKey) {
  setStorage({ activeTabPane }, () => { openOptionsPage() })
  return undefined
}

function isOpenOptions() {
  /**
   * - 用户没有设置deckName项
   * - 用户的deckName项无法在Anki上找到
   * - 用户没有设置modelName项
   * - 用户modelName项无法在Anki找到
   * - 用户的modelFieldName项全为空
   * - 用户的modelFieldName项配置无法在Anki上找到
   */
  let wordTestArray = [
    ResponseStatus.DeckNameIsNullInWordConfig,
    ResponseStatus.ModelNameIsNullInWordConfig,
    ResponseStatus.AllFieldNamesIsEmptyInWordConfig,
    ResponseStatus.MismatchedFieldNameInWordConfig,
  ]
  let phraseTestArray = [
    ResponseStatus.DeckNameIsNullInPhraseConfig,
    ResponseStatus.ModelNameIsNullInPhraseConfig,
    ResponseStatus.MismatchedFieldNameInPhraseConfig,
    ResponseStatus.AllFieldNamesIsEmptyInPhraseConfig,
  ]
  let sentenceTestArray = [
    ResponseStatus.DeckNameIsNullInSentenceConfig,
    ResponseStatus.ModelNameIsNullInSentenceConfig,
    ResponseStatus.MismatchedFieldNameInSentenceConfig,
    ResponseStatus.AllFieldNamesIsEmptyInSentenceConfig,
  ]
}

/**
 * 纯类？
 */
class AnkiResponse {
  message: string
  status: ResponseStatus;
  cardIds?: number[];
  statusIcon?: StatusIcon

  constructor(options: AnkiResponse) {
    this.status = options.status
    this.message = options.message
    this.cardIds = options.cardIds
    this.statusIcon = options.statusIcon
  }
}
/**
 * 纯函数
 */
function createUnexpectedErrorResponse() {
  return new AnkiResponse({
    statusIcon: StatusIcon.Error,
    status: ResponseStatus.Unexpected,
    message: "意料之外的错误，请查看插件后台页面相应的输出"
  })
}
/**
 * 纯函数
 */
function createAddNoteSuccessAnkiResponse(cardId: number) {
  return new AnkiResponse({
    status: ResponseStatus.AddSuccess,
    statusIcon: StatusIcon.Success,
    message: "卡片添加成功",
    cardIds: [cardId]
  })
}
/**
 * 纯函数
 */
function getConfigName(type: NoteType) {
  let configNames: ["wordConfig", "phraseConfig", "sentenceConfig"] = [
    "wordConfig",
    "phraseConfig",
    "sentenceConfig"
  ]
  return configNames[type]
}
/**
 * 纯函数
 */
function getMediaNames(type: NoteType): ReadonlyArray<KeyofUnions<NoteData>> {
  let sentenceMedia = [
    "sentence_audio"
  ] as const
  let phraseMedia = [
    "phrase_audio",
    "example_audio_1",
    "example_audio_2",
    "example_audio_3"
  ] as const
  let wordMedia = [
    "am_audio",
    "en_audio",
    "example_audio",
    "definition_audio"
  ] as const
  let mediaNames = [
    wordMedia,
    phraseMedia,
    sentenceMedia
  ][type]
  return mediaNames
}
/**
 * 纯函数
 */
function getMediaFields<T extends Partial<NoteData>>(mediaNames: ReadonlyArray<KeyofUnions<T>>, data: T, matchedFields: T): MediaField {
  return mediaNames.reduce((audio, key) => {
    const url = data[key]
    const field = matchedFields[key]
    if (!url || !field) return audio
    audio.push({
      //@ts-ignore 必定是string
      url,
      //@ts-ignore 必定是string
      fields: [field],
      //@ts-ignore 必定是string
      filename: `${encodeURIComponent(url)}.mp3`,
    })
    return audio
  }, [] as MediaField)
}
/**
 * 纯函数
 */
function getNotMediaNames(type: NoteType): ReadonlyArray<KeyofUnions<NoteData>> {
  let sentenceNames = [
    "sentence",
    "sentence_translation",
  ] as const
  let phraseNames = [
    "phrase",
    "translations",
    "example_sentence_1",
    "example_sentence_2",
    "example_sentence_3",
    "example_sentence_translation_1",
    "example_sentence_translation_2",
    "example_sentence_translation_3",
  ] as const
  let wordNames = [
    "word",
    "star_amount",
    "am",
    "en",
    "part_of_speech",
    "translation",
    "definition",
    "example_sentence",
    "example_sentence_translation",
  ] as const
  let names = [
    wordNames,
    phraseNames,
    sentenceNames
  ][type]
  return names
}
/**
 * 纯函数
 */
function getNotMediaFields<T extends Partial<NoteData>>(keyArray: ReadonlyArray<KeyofUnions<T>>, data: T, matchedFields: T): AddNoteParams["fields"] {
  return keyArray.reduce((fields, key) => {
    const field = matchedFields[key]
    const content = data[key]
    if (!field || !content) return fields
    //@ts-ignore 必定是string
    fields[field] = content
    return fields
  }, {} as AddNoteParams["fields"])
}

/**
 * 纯函数？cond为 false 时报错，否则进行断言
 */
function assertion(cond: boolean, response: AnkiResponse): asserts cond {
  if (!cond) {
    throw new AnkiResponse({ statusIcon: StatusIcon.Error, ...response })
  }
}

/**
 * 纯函数，判断是否存在 fields(用户在插件中配置的)中的某项不在 fieldsNames(用户Anki中配置的) 中 
 */
function hasNotMismatchedFieldName(fields: Array<string | undefined>, fieldNames: string[]) {
  return fields.every((item) => {
    if (item === undefined) return true
    return fieldNames.includes(item)
  })
}

interface A {
  a: "1",
  c: "3"
}
interface B {
  b: "2"
}
type C = A | B

let d: C = {
  a: "1",
  b: "2",
  c: "3"
}
let f: A = {
  a: "1",
  c: "3"
}
let a = Object.values(d)
let g = Object.values(f)