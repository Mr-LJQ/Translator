import { AddNoteParams, CachedOptions, NoteWordData, AnkiResponse, PhraseData, SentenceData, WordData, TranslationUnit, NotePhraseData, NoteData, TabPaneKey, SentenceConfig, NoteSentenceData, PhraseConfig, WordConfig } from "../../types/index"

type Action = "version" | "addNote" | "addNotes" | "modelNames" | "deckNames" | "modelFieldNames" | "findCards" | "relearnCards"

type AnkiConfig = Partial<Pick<CachedOptions, "wordConfig" | "phraseConfig" | "sentenceConfig" | "ankiConnectionURL">>


//魔术字符串
const REQUEST_ERROR = "failed to issue request"
const WORD_CONFIG_ERROR = "wordConfig has not been configured"
const PHRASE_CONFIG_ERROR = "PhraseConfig has not been configured"
const SENTENCE_CONFIG_ERROR = "sentenceConfig has not been configured"

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

  async addNote(data: NoteData): Promise<AnkiResponse> {
    try {
      if ("word" in data) await this.addWordNote(data)
      if ("phrase" in data) await this.addPhraseNote(data)
      if ("sentence" in data) await this.addSentenceNote(data)
    } catch (e) {
      //处理网络异常
      if (e === REQUEST_ERROR) return { status: 3, statusText: "网络连接异常，请检查Anki连接状况" }
      if (e === WORD_CONFIG_ERROR) {
        openOptions("word")
        return { status: 2, statusText: "请先进行必要配置后再添加卡片" }
      }
      if (e === PHRASE_CONFIG_ERROR) {
        openOptions("phrase")
        return { status: 2, statusText: "请先进行必要配置后再添加卡片" }
      }
      if (e === SENTENCE_CONFIG_ERROR) {
        openOptions("sentence")
        return { status: 2, statusText: "请先进行必要配置后再添加卡片" }
      }
      //承接对重复添加的处理(会以错误的形式扔出)
      if (Object(e) === e && e.status === 4) return e
      //其它错误不做特殊处理
      let statusText = e
      e.message && (statusText = e.message)
      return { status: 2, statusText }
    }
    return { status: 1, statusText: "卡片添加成功" }
  }

  private async addWordNote(data: NoteWordData) {
    let note: AddNoteParams | void
    try {
      note = this.formatNoteWordData(data)
      if (!note) throw WORD_CONFIG_ERROR
      await this.invoke("addNote", { note })
    } catch (e) {
      if (e !== "cannot create note because it is a duplicate") throw e
      const { wordConfig } = this.ankiConfig
      if (!wordConfig) throw WORD_CONFIG_ERROR
      const { deckName, matchedFields } = wordConfig
      if (!matchedFields || !deckName) throw WORD_CONFIG_ERROR
      //重复存在两种可能性：
      //  1.用户曾经添加过，但是其忘了，此时应该询问用户是否要重置学习进度
      //  2.因为Anki查重的逻辑只看第一个field，因此就算其它field不同，依然会显示重复，此时则应该再次添加，因为是新卡片。
      //由 word definition translation这三项确定一个卡片是否重复
      const fields: Array<keyof NoteWordData> = ["word", "definition", "translation"]
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
          await this.invoke("addNote", { note: note })
          break
        case 1:
          throw { status: 4, statusText: "卡片重复添加，是否重置其学习进度？", cardIds }
        default:
          throw `通过:${query} , 进行查询后，发现存在多张卡片，请根据该查询字符串，自行查看Anki。(可通过配置更多的用于查重的选项来消除该情况)`
      }
    }
  }

  private async addPhraseNote(data: PhraseData): Promise<undefined> {
    let notePhraseData: NotePhraseData
    let note: void | AddNoteParams
    try {
      notePhraseData = getNotePhraseData(data)
      note = this.formatNotePhraseData(notePhraseData)
      if (!note) throw PHRASE_CONFIG_ERROR
      await this.invoke("addNote", { note })
    } catch (e) {
      if (e !== "cannot create note because it is a duplicate") throw e
      const { phraseConfig } = this.ankiConfig
      if (!phraseConfig) throw PHRASE_CONFIG_ERROR
      const { deckName, matchedFields } = phraseConfig
      if (!deckName || !matchedFields) throw PHRASE_CONFIG_ERROR
      const fields: Array<keyof NotePhraseData> = ["phrase","translations","example_sentence_1","example_sentence_2","example_sentence_3","example_sentence_translation_1","example_sentence_translation_2","example_sentence_translation_3"]
      const query = fields.reduce((query, key) => {
        const field = matchedFields[key]
        const content = notePhraseData[key]
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
          await this.invoke("addNote", { note: note })
          break
        case 1:
          throw { status: 4, statusText: "卡片重复添加，是否重置其学习进度？", cardIds }
        default:
          throw `通过:${query} , 进行查询后，发现存在多张卡片，请用户根据该查询字符串，自行查看Anki。`
      }
    }
  }

  private async addSentenceNote(data: SentenceData): Promise<undefined> {
    let note: void | AddNoteParams
    try {
      note = this.formatSentenceNote(data)
      if (!note) throw SENTENCE_CONFIG_ERROR
      await this.invoke("addNote", { note })
    } catch (e) {
      if (e !== "cannot create note because it is a duplicate") throw e
      const { sentenceConfig } = this.ankiConfig
      if (!sentenceConfig)  throw SENTENCE_CONFIG_ERROR
      const { deckName, matchedFields } = sentenceConfig
      if (!deckName || !matchedFields) throw SENTENCE_CONFIG_ERROR
      const { sentence } = matchedFields
      if (!sentence) throw SENTENCE_CONFIG_ERROR
      const fields: Array<keyof NoteSentenceData> = ["sentenceTranslation","sentence"]
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
          await this.invoke("addNote", { note: note })
          break
        case 1:
          throw { status: 4, statusText: "卡片重复添加，是否重置其学习进度？", cardIds }
        default:
          throw `通过:${query} , 进行查询后，发现存在多张卡片，请用户根据该查询字符串，自行查看Anki。`
      }
    }
  }

  async findCards(query: string): Promise<number[]> {
    return this.invoke("findCards", {
      query,
    })
  }

  async relearnCards(cards:number[]): Promise<AnkiResponse> {
    let result: AnkiResponse = { status: 1, statusText: "学习进度重置成功" }
    try {
      //await是必须的
      await this.invoke("relearnCards", {cards})
    } catch (e) {
      if (e === REQUEST_ERROR) return { status: 3, statusText: "网络连接异常，请检查Anki连接状况" }
      result.status = 2
      result.statusText = e
      e.message && (result.statusText = e.message)
    }
    return result
  }

  async getModelNames(): Promise<string[]> {
    try {
      let result = await this.invoke("modelNames")
      return result
    } catch (e) {
      console.error(e)
      return []
    }
  }

  async getDeckNames(): Promise<string[]> {
    try {
      let result = await this.invoke("deckNames")
      return result
    } catch (e) {
      console.error(e)
      return []
    }

  }

  async getModelFieldNames(modelName: string): Promise<string[]> {
    try {
      let result = await this.invoke("modelFieldNames", { modelName })
      return result
    } catch (e) {
      console.error(e)
      return []
    }
  }

  async getVersion(): Promise<number | null> {
    try {
      let result = await this.invoke("version")
      this.version = result
      return result
    } catch {
      return null
    }
  }

  /**
   * 将数据转换为AnkiConnection所需要的数据结构
   * @param data NoteWordData
   * @returns 
   */
  private formatNoteWordData(data: NoteWordData, allowDuplicate: boolean = false): AddNoteParams | void {
    const { wordConfig } = this.ankiConfig
    if (!wordConfig) return
    const { deckName, modelName, matchedFields, tags } = wordConfig
    if (!deckName) return
    if (!modelName) return
    if (!matchedFields) return
    const noteDataKeyArray: Array<keyof NoteWordData> = [
      "word",
      "starAmount",
      "am",
      "en",
      "part_of_speech",
      "translation",
      "definition",
      "example_sentence",
      "example_sentence_translation",
    ]
    const audioKeyArray: Array<keyof NoteWordData> = [
      "am_audio",
      "en_audio",
      "example_audio",
      "definition_audio",
    ]

    const audio = audioKeyArray.reduce((audio, key) => {
      const url = data[key]
      const field = matchedFields[key]
      if (!url || !field) return audio
      audio.push({
        url,
        filename: `${encodeURIComponent(url)}.mp3`,
        fields: [field]
      })
      return audio
    }, [] as any)

    const fields = noteDataKeyArray.reduce((fields, key) => {
      const field = matchedFields[key]
      const content = data[key]
      if (!field || !content) return fields
      fields[field] = content
      return fields
    }, {} as any)
    if (!Object.keys(fields).length) return
    return {
      deckName,
      modelName,
      fields,
      audio,
      tags: tags && tags.trim().split(/\s+/g) || [],
      options: {
        allowDuplicate,
        "duplicateScope": "deck",
        "duplicateScopeOptions": {
          deckName,
          "checkChildren": false
        }
      },
    }
  }
  /**
   * 将数据转换为AnkiConnection所需要的数据结构
   * @param data PhraseData
   * @returns 
   */
  private formatNotePhraseData(data: NotePhraseData, allowDuplicate: boolean = false): AddNoteParams | void {
    const { phraseConfig } = this.ankiConfig
    if (!phraseConfig) return
    const { deckName, modelName, matchedFields, tags } = phraseConfig
    if (!deckName) return
    if (!modelName) return
    if (!matchedFields) return
    const noteDataKeyArray: Array<keyof NotePhraseData> = [
      "phrase",
      "translations",
      "example_sentence_1",
      "example_sentence_2",
      "example_sentence_3",
      "example_sentence_translation_1",
      "example_sentence_translation_2",
      "example_sentence_translation_3",
    ]
    const audioKeyArray: Array<keyof NotePhraseData> = [
      "phrase_audio",
      "example_audio_1",
      "example_audio_2",
      "example_audio_3",
    ]
    const audio = audioKeyArray.reduce((audio, key) => {
      const url = data[key]
      const field = matchedFields[key]
      if (!url || !field) return audio
      audio.push({
        url,
        filename: `${encodeURIComponent(url)}.mp3`,
        fields: [field]
      })
      return audio
    }, [] as any)

    const fields = noteDataKeyArray.reduce((fields, key) => {
      const field = matchedFields[key]
      const content = data[key]
      if (!field || !content) return fields
      fields[field] = content
      return fields
    }, {} as any)
    if (!Object.keys(fields).length) return
    return {
      deckName,
      modelName,
      fields,
      audio,
      tags: tags && tags.trim().split(/\s+/g) || [],
      options: {
        allowDuplicate,
        "duplicateScope": "deck",
        "duplicateScopeOptions": {
          deckName,
          "checkChildren": false
        }
      },
    }
  }
  /**
   * 将数据转换为AnkiConnection所需要的数据结构
   * @param data PhraseData
   * @returns 
   */
  private formatSentenceNote(data: SentenceData, allowDuplicate: boolean = false): AddNoteParams | void {
    const { sentenceConfig } = this.ankiConfig
    if (!sentenceConfig) return
    const { deckName, modelName, matchedFields, tags } = sentenceConfig
    if (!deckName) return
    if (!modelName) return
    if (!matchedFields) return
    const noteDataKeyArray: Array<keyof SentenceData> = [
      "sentence",
      "sentenceTranslation"
    ]
    const audioKeyArray: Array<keyof SentenceData> = [
      "sentence_audio"
    ]

    const audio = audioKeyArray.reduce((audio, key) => {
      const url = data[key]
      const field = matchedFields[key]
      if (!url || !field) return audio
      audio.push({
        url,
        filename: `${encodeURIComponent(url)}.mp3`,
        fields: [field]
      })
      return audio
    }, [] as any)

    const fields = noteDataKeyArray.reduce((fields, key) => {
      const field = matchedFields[key]
      const content = data[key]
      if (!field || !content) return fields
      fields[field] = content
      return fields
    }, {} as any)

    if (!Object.keys(fields).length) return
    return {
      deckName,
      modelName,
      fields,
      audio,
      tags: tags && tags.trim().split(/\s+/g) || [],
      options: {
        allowDuplicate,
        "duplicateScope": "deck",
        "duplicateScopeOptions": {
          deckName,
          "checkChildren": false
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
  private async invoke(action: "deckNames"): Promise<string[]>
  private async invoke(action: "modelNames"): Promise<string[]>
  private async invoke(action: "version"): Promise<number>
  private async invoke(action: "findCards", params: { query: string }): Promise<number[]>
  private async invoke(action: "modelFieldNames", params: { modelName: string }): Promise<string[]>
  private async invoke(action: "addNote", params: { note: AddNoteParams }): Promise<number>
  private async invoke(action: "relearnCards", params: { cards: number[] }): Promise<null>
  private async invoke(action: "addNotes", params: { notes: AddNoteParams[] }): Promise<(number | null)[]>
  private async invoke(action: Action, params: { [key: string]: any } = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      const { version } = this
      const {ankiConnectionURL:targetURL = "http://127.0.0.1:8765"} = this.ankiConfig
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('error', () => reject(REQUEST_ERROR));
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

/**
 * 纯函数，将PhraseData格式转换为NotePhraseData格式
 * @param data PhraseData
 * @returns NotePhraseData
 */
function getNotePhraseData(data: PhraseData): NotePhraseData {
  const { phrase, phrase_audio, translations, exampleSentences } = data
  const notePhraseData: NotePhraseData = {
    phrase,
    phrase_audio,
    translations: translations.join(" ; "),
    example_sentence_1: exampleSentences?.[0].example_sentence,
    example_sentence_translation_1: exampleSentences?.[0].example_sentence_translation,
    example_audio_1: exampleSentences?.[0].example_audio,
    example_sentence_2: exampleSentences?.[1].example_sentence,
    example_sentence_translation_2: exampleSentences?.[1].example_sentence_translation,
    example_audio_2: exampleSentences?.[1].example_audio,
    example_sentence_3: exampleSentences?.[2].example_sentence,
    example_sentence_translation_3: exampleSentences?.[2].example_sentence_translation,
    example_audio_3: exampleSentences?.[2].example_audio,
  }
  return notePhraseData
}

//如果用户未进行任何短语相关的配置，则弹出配置窗口，让用户进行配置
const openOptions = function (tabPane: TabPaneKey) {
  const cachedOptions: Partial<CachedOptions> = {
    defaultActiveIndex: tabPane
  }
  chrome.storage.local.set(cachedOptions, () => {
    chrome.runtime.openOptionsPage()
  })
  return undefined
}