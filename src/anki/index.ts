import { setStorage, openOptionsPage } from "../extensions-api/index"
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//声明

import type { SentenceFields, PhraseFields, WordFields } from "../options/field"
import type { NoteData } from "../shower/view/View"
import type { Storage, WordConfig, PhraseConfig, SentenceConfig } from "../extensions-api/index"
import { TabPaneKey } from "../extensions-api/index"

export enum CardState {
  Add = "➕",
  Loading = "...",
  Success = "√",
  Error = "✖",
  Relearn = "↻",
  Disconnect = "✄",
}

export interface CardsStatus {
  state: CardState;
  explanation: string;
  cardIds?: number[];
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

type AnkiConfig = Partial<Pick<Storage, "wordConfig" | "phraseConfig" | "sentenceConfig" | "ankiConnectionURL">>

//值必须是小写，且必须是这个值，不应该修改，这是AnkiConnection所要求的
enum Indication {
  Version = "version",
  AddNote = "addNote",
  FindCards = "findCards",
  DeckNames = "deckNames",
  ModelNames = "modelNames",
  RelearnCards = "relearnCards",
  ModelFieldNames = "modelFieldNames",
  UpdateNoteFields = "updateNoteFields",
}

enum ErrorList {
  RequestError = "failed to issue request",
  WordConfigError= "wordConfig has not been configured",
  PhraseConfigError= "PhraseConfig has not been configured",
  SentenceConfigError= "sentenceConfig has not been configured",
  //AddNoteDuplicateError 的值不能够修改，其是AnkiConnection返回的字符串
  AddNoteDuplicateError = "cannot create note because it is a duplicate"
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//具体实现

export class AnkiConnection {

  version: number
  ankiConfig: AnkiConfig

  constructor() {
    this.version = 6  //版本不同，返回值不同，不能够随意修改
    this.ankiConfig = {}
  }

  updateAnkiConfig(config: AnkiConfig) {
    this.ankiConfig = { ...this.ankiConfig, ...config }
  }

  async addNote(data: NoteData): Promise<CardsStatus> {
    try {
      if ("word" in data) await this.addWordNote(data)
      if ("phrase" in data) await this.addPhraseNote(data)
      if ("sentence" in data) await this.addSentenceNote(data)
    } catch (e: any) {
      //处理网络异常
      if (e === ErrorList.RequestError) return { state: CardState.Disconnect, explanation: "网络连接异常，请检查Anki连接状况" }
      const ConfigError = { state: CardState.Error, explanation: "请先进行必要配置后再添加卡片" }
      if (e === ErrorList.WordConfigError) {
        openOptions(TabPaneKey.Word)
        return ConfigError
      }
      if (e === ErrorList.PhraseConfigError) {
        openOptions(TabPaneKey.Phrase)
        return ConfigError
      }
      if (e === ErrorList.SentenceConfigError) {
        openOptions(TabPaneKey.Sentence)
        return ConfigError
      }
      //承接对重复添加的处理(会以错误的形式扔出)
      if (Object(e) === e && e.state === CardState.Relearn) return e
      //其它错误不做特殊处理
      let explanation = e
      e.message && (explanation = e.message)
      return { state: CardState.Error, explanation }
    }
    return { state: CardState.Success, explanation: "卡片添加成功" }
  }

  private async addWordNote(data: WordFields) {
    try {
      var note = this.formatWordData(data)
      if (!note) throw ErrorList.WordConfigError
      await this.invoke(Indication.AddNote, { note })
    } catch (e) {
      if (e !== ErrorList.AddNoteDuplicateError) throw e
      const { wordConfig } = this.ankiConfig
      if (!wordConfig) throw ErrorList.WordConfigError
      const { deckName, ...matchedFields } = wordConfig
      if (!deckName) throw ErrorList.WordConfigError
      //重复存在两种可能性：
      //  1.用户曾经添加过，但是其忘了，此时应该询问用户是否要重置学习进度
      //  2.因为Anki查重的逻辑只看第一个field，所以哪怕其它字段不同也会显示重复，但实际上它是新卡片。
      //由 word definition translation这三项确定一个卡片是否重复
      const fields: Array<keyof WordFields> = ["word", "definition", "translation"]
      const query = fields.reduce((query, key) => {
        const field = matchedFields[key]
        const content = data[key]
        if (!field || !content) return query
        //注意前方的空格，其是必须的
        query += ` "${content}"`
        return query
      }, `deck:${deckName}`)
      const cardIds = await this.findCards(query)
      // 情况一:cardIds有一个值，此时逻辑应该为:重置学习进度
      // 情况二:cardIds有多个值，此时逻辑应该为:报错，返回查询字符串，让用户到Anki中查看重复。
      // 情况三：cardIds没有值，此时逻辑应该为:再次添加卡片，添加方式为允许重复。
      const { length } = cardIds
      switch (length) {
        case 0:
          //用于过滤掉ts检查，实际上note此刻必定有值
          if (!note) return
          note.options.allowDuplicate = true
          await this.invoke(Indication.AddNote, { note: note })
          break
        case 1:
          let error: CardsStatus = { state: CardState.Relearn, explanation: "卡片重复添加，是否重置其学习进度？", cardIds }
          throw error
        default:
          throw `通过:${query} , 进行查询后，发现存在多张卡片，请根据该查询字符串，自行查看Anki。(可通过配置更多的用于查重的选项来消除该情况)`
      }
    }
  }

  private async addPhraseNote(data: PhraseFields): Promise<undefined> {
    try {
      var note = this.formatPhraseData(data)
      if (!note) throw ErrorList.PhraseConfigError 
      await this.invoke(Indication.AddNote, { note })
    } catch (e) {
      if (e !== ErrorList.AddNoteDuplicateError) throw e
      const { phraseConfig } = this.ankiConfig
      if (!phraseConfig) throw ErrorList.PhraseConfigError
      const { deckName, ...matchedFields } = phraseConfig
      if (!deckName) throw ErrorList.PhraseConfigError
      const fields: Array<keyof PhraseFields> = [
        "phrase",
        "translations",
        "example_sentence_1",
        "example_sentence_2",
        "example_sentence_3",
        "example_sentence_translation_1",
        "example_sentence_translation_2",
        "example_sentence_translation_3"
      ]
      const query = fields.reduce((query, key) => {
        const field = matchedFields[key]
        const content = data[key]
        if (!field || !content) return query
        //注意前方的空格，其是必须的
        query += ` "${content}"`
        return query
      }, `deck:${deckName}`)
      const cardIds = await this.findCards(query)
      const { length } = cardIds
      switch (length) {
        case 0:
          if (!note) return
          note.options.allowDuplicate = true
          await this.invoke(Indication.AddNote, { note: note })
          break
        case 1:
          let error: CardsStatus = { state: CardState.Relearn, explanation: "卡片重复添加，是否重置其学习进度？", cardIds }
          throw error
        default:
          throw `通过:${query} , 进行查询后，发现存在多张卡片，请用户根据该查询字符串，自行查看Anki。`
      }
    }
  }

  private async addSentenceNote(data: SentenceFields): Promise<undefined> {
    try {
      var note = this.formatSentenceData(data)
      if (!note) throw ErrorList.SentenceConfigError 
      await this.invoke(Indication.AddNote, { note })
    } catch (e) {
      if (e !== ErrorList.AddNoteDuplicateError) throw e
      const { sentenceConfig } = this.ankiConfig
      if (!sentenceConfig) throw ErrorList.SentenceConfigError 
      const { deckName, ...matchedFields } = sentenceConfig
      if (!deckName) throw ErrorList.SentenceConfigError 
      const { sentence } = matchedFields
      if (!sentence) throw ErrorList.SentenceConfigError 
      const fields: Array<keyof SentenceFields> = ["sentence_translation", "sentence"]
      const query = fields.reduce((query, key) => {
        const field = matchedFields[key]
        const content = data[key]
        if (!field || !content) return query
        //注意前方的空格，其是必须的
        query += ` "${content}"`
        return query
      }, `deck:${deckName}`)
      const cardIds = await this.findCards(query)
      const { length } = cardIds
      switch (length) {
        case 0:
          if (!note) return
          note.options.allowDuplicate = true
          await this.invoke(Indication.AddNote, { note: note })
          break
        case 1:
          let error: CardsStatus = { state: CardState.Relearn, explanation: "卡片重复添加，是否重置其学习进度？", cardIds }
          throw error
        default:
          throw `通过:${query} , 进行查询后，发现存在多张卡片，请用户根据该查询字符串，自行查看Anki。`
      }
    }
  }

  async findCards(query: string): Promise<number[]> {
    return this.invoke(Indication.FindCards, {
      query,
    })
  }

  async relearnCards(cards: number[]): Promise<CardsStatus> {
    let result: CardsStatus = { state: CardState.Success, explanation: "学习进度重置成功" }
    try {
      //await是必须的
      await this.invoke(Indication.RelearnCards, { cards })
    } catch (e: any) {
      if (e === ErrorList.RequestError) return { state: CardState.Disconnect, explanation: "网络连接异常，请检查Anki连接状况。" }
      result.state = CardState.Error
      result.explanation = e
      e.message && (result.explanation = e.message)
    }
    return result
  }

  async getModelNames(): Promise<string[]> {
    try {
      let result = await this.invoke(Indication.ModelNames)
      return result
    } catch (e) {
      console.error(e)
      return []
    }
  }

  async getDeckNames(): Promise<string[]> {
    try {
      let result = await this.invoke(Indication.DeckNames)
      return result
    } catch (e) {
      console.error(e)
      return []
    }

  }

  async getModelFieldNames(modelName: string): Promise<string[]> {
    try {
      let result = await this.invoke(Indication.ModelFieldNames, { modelName })
      return result
    } catch (e) {
      console.error(e)
      return []
    }
  }

  async getVersion(): Promise<number | null> {
    try {
      let result = await this.invoke(Indication.Version)
      this.version = result
      return result
    } catch {
      return null
    }
  }

  /**
   * 将数据转换为AnkiConnection所需要的数据结构
   * @param data
   * @returns 
   */
  private formatWordData(data: WordFields): AddNoteParams | void {
    const { wordConfig } = this.ankiConfig
    if (!wordConfig) return
    const { deckName, modelName, tags, ...matchedFields } = wordConfig
    if (!deckName || !modelName || !matchedFields) return
    const noteDataKeyArray: Array<keyof WordFields> = [
      "word",
      "star_amount",
      "am",
      "en",
      "part_of_speech",
      "translation",
      "definition",
      "example_sentence",
      "example_sentence_translation",
    ]
    const audioKeyArray: Array<keyof WordFields> = [
      "am_audio",
      "en_audio",
      "example_audio",
      "definition_audio",
    ]
    const audio = getAudio(audioKeyArray, data, matchedFields)
    const fields = getField(noteDataKeyArray, data, matchedFields)

    if (!Object.keys(fields).length) return

    return {
      deckName,
      modelName,
      fields,
      audio,
      tags: tags && tags.trim().split(/\s+/g) || [],
      options: {
        allowDuplicate: false,
        "duplicateScope": "deck",
        "duplicateScopeOptions": {
          deckName,
          "checkChildren": true,
          "checkAllModels": false
        }
      },
    }
  }
  /**
   * 将数据转换为AnkiConnection所需要的数据结构
   * @param data 
   * @returns 
   */
  private formatPhraseData(data: PhraseFields): AddNoteParams | void {
    const { phraseConfig } = this.ankiConfig
    if (!phraseConfig) return
    const { deckName, modelName, tags, ...matchedFields } = phraseConfig
    if (!deckName) return
    if (!modelName) return
    if (!matchedFields) return
    const noteDataKeyArray: Array<keyof PhraseFields> = [
      "phrase",
      "translations",
      "example_sentence_1",
      "example_sentence_2",
      "example_sentence_3",
      "example_sentence_translation_1",
      "example_sentence_translation_2",
      "example_sentence_translation_3",
    ]
    const audioKeyArray: Array<keyof PhraseFields> = [
      "phrase_audio",
      "example_audio_1",
      "example_audio_2",
      "example_audio_3",
    ]
    const audio = getAudio(audioKeyArray, data, matchedFields)
    const fields = getField(noteDataKeyArray, data, matchedFields)

    if (!Object.keys(fields).length) return
    return {
      deckName,
      modelName,
      fields,
      audio,
      tags: tags && tags.trim().split(/\s+/g) || [],
      options: {
        allowDuplicate: false,
        "duplicateScope": "deck",
        "duplicateScopeOptions": {
          deckName,
          "checkChildren": true,
          "checkAllModels": false
        }
      },
    }
  }
  /**
   * 将数据转换为AnkiConnection所需要的数据结构
   * @param data
   * @returns 
   */
  private formatSentenceData(data: SentenceFields): AddNoteParams | void {
    const { sentenceConfig } = this.ankiConfig
    if (!sentenceConfig) return
    const { deckName, modelName, tags, ...matchedFields } = sentenceConfig
    if (!deckName) return
    if (!modelName) return
    if (!matchedFields) return
    const noteDataKeyArray: Array<keyof SentenceFields> = [
      "sentence",
      "sentence_translation"
    ]
    const audioKeyArray: Array<keyof SentenceFields> = [
      "sentence_audio"
    ]

    const audio = getAudio(audioKeyArray, data, matchedFields)
    const fields = getField(noteDataKeyArray, data, matchedFields)

    if (!Object.keys(fields).length) return
    return {
      deckName,
      modelName,
      fields,
      audio,
      tags: tags && tags.trim().split(/\s+/g) || [],
      options: {
        allowDuplicate: false,
        "duplicateScope": "deck",
        "duplicateScopeOptions": {
          deckName,
          "checkChildren": true,
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
  private async invoke(action: Indication.DeckNames): Promise<string[]>
  private async invoke(action: Indication.ModelNames): Promise<string[]>
  private async invoke(action: Indication.Version): Promise<number>
  private async invoke(action: Indication.FindCards, params: { query: string }): Promise<number[]>
  private async invoke(action: Indication.ModelFieldNames, params: { modelName: string }): Promise<string[]>
  private async invoke(action: Indication.AddNote, params: { note: AddNoteParams }): Promise<number>
  private async invoke(action: Indication.RelearnCards, params: { cards: number[] }): Promise<null>
  private async invoke(action: Indication, params: { [key: string]: any } = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      const { version } = this
      const { ankiConnectionURL: targetURL = "http://127.0.0.1:8765" } = this.ankiConfig
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('error', () => reject(ErrorList.RequestError));
      xhr.addEventListener('load', () => {
        try {
          const response = JSON.parse(xhr.responseText);
          if (Object.getOwnPropertyNames(response).length != 2) {
            throw 'AnkiConnection返回了意外属性数量的响应，可能原因是：AnkiConnection版本造成响应差异。';
          }
          if (!response.hasOwnProperty('error')) {
            throw 'AnkiConnection返回的响应缺少error属性，可能原因是：AnkiConnection版本造成响应差异。';
          }
          if (!response.hasOwnProperty('result')) {
            throw 'AnkiConnection返回的响应缺少result属性，可能原因是：AnkiConnection版本造成响应差异。';
          }
          if (response.error) {
            throw response.error;
          }
          resolve(response.result);
        } catch (e) {
          reject(e);
        }
      });

      xhr.open('POST', targetURL);
      xhr.send(JSON.stringify({ action, version, params }));
    });
  }

}


////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//工具函数

/**
 * 纯函数
 */
function getAudio(keyArray: Array<keyof PhraseFields>, data: PhraseFields, matchedFields: PhraseConfig): MediaField
function getAudio(keyArray: Array<keyof SentenceFields>, data: SentenceFields, matchedFields: SentenceConfig): MediaField
function getAudio(keyArray: Array<keyof WordFields>, data: WordFields, matchedFields: WordConfig): MediaField
function getAudio(keyArray: string[], data: { [key: string]: string }, matchedFields: { [key: string]: string }): MediaField {
  return keyArray.reduce((audio, key) => {
    const url = data[key]
    const field = matchedFields[key]
    if (!url || !field) return audio
    audio.push({
      url,
      filename: `${encodeURIComponent(url)}.mp3`,
      fields: [field]
    })
    return audio
  }, [] as MediaField)
}

/**
 * 纯函数
 */
function getField(keyArray: Array<keyof PhraseFields>, data: PhraseFields, matchedFields: PhraseConfig): AddNoteParams["fields"]
function getField(keyArray: Array<keyof SentenceFields>, data: SentenceFields, matchedFields: SentenceConfig): AddNoteParams["fields"]
function getField(keyArray: Array<keyof WordFields>, data: WordFields, matchedFields: WordConfig): AddNoteParams["fields"]
function getField(keyArray: string[], data: { [key: string]: string }, matchedFields: { [key: string]: string }): AddNoteParams["fields"] {
  return keyArray.reduce((fields, key) => {
    const field = matchedFields[key]
    const content = data[key]
    if (!field || !content) return fields
    fields[field] = content
    return fields
  }, {} as AddNoteParams["fields"])
}

//如果用户未进行任何短语相关的配置，则弹出配置窗口，让用户进行配置
const openOptions = function (activeTabPane: TabPaneKey) {
  setStorage({ activeTabPane }, () => { openOptionsPage() })
  return undefined
}