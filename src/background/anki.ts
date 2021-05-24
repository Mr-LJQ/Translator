import { CachedOptions, NoteWordData, AnkiResponse, PhraseData, SentenceData, WordData, TranslationUnit, NotePhraseData } from "../../types/index"

type Action = "version" | "addNote" | "addNotes" | "modelNames" | "deckNames" | "modelFieldNames"

type AnkiConfig = Partial<Pick<CachedOptions, "wordConfig" | "phraseConfig" | "sentenceConfig">>

export class AnkiConnection {

  targetURL
  version: number
  ankiConfig: AnkiConfig

  constructor() {
    this.version = 6  //版本不同，返回值不同，不能够随意修改
    this.ankiConfig = {}
    this.targetURL = "http://127.0.0.1:8765"
  }

  updateAnkiConfig(config: AnkiConfig) {
    this.ankiConfig = { ...this.ankiConfig, ...config }
  }

  async addWordNote(data: NoteWordData): Promise<AnkiResponse> {
    let result: AnkiResponse = { status: 1, statusText: "卡片添加成功" }
    try {
      const note = this.formatNoteWordData(data)
      await this.invoke("addNote", { note })
    } catch (e) {
      result.status = 2
      result.statusText = e
      e.message && (result.statusText = e.message)
    }
    return result
  }

  async addAllWordsNotes(data: WordData): Promise<AnkiResponse> {
    let result: AnkiResponse = { status: 1, statusText: "卡片添加成功" }
    try {
      const dataList = getNoteWordDataArray(data)
      const notes = dataList.map((data) => {
        return this.formatNoteWordData(data)
      })
      const results: string[] = await this.invoke("addNotes", { notes })
      if (results.every((item) => !item)) { throw "所有卡片都是重复添加" }
    } catch (e) {
      result.status = 2
      result.statusText = e
      e.message && (result.statusText = e.message)
    }
    return result
  }

  async addPhraseNote(data: PhraseData): Promise<AnkiResponse> {
    let result: AnkiResponse = { status: 1, statusText: "卡片添加成功!" }
    try {
      const notePhraseData = getNotePhraseData(data)
      const note = this.formatNotePhraseData(notePhraseData)
      await this.invoke("addNote", { note })
    } catch (e) {
      result.status = 2
      result.statusText = e
      e.message && (result.statusText = e.message)
    }
    return result
  }

  async addSentenceNote(data: SentenceData): Promise<AnkiResponse> {
    let result: AnkiResponse = { status: 1, statusText: "卡片添加成功!" }
    try {
      const note = this.formatSentenceNote(data)
      await this.invoke("addNote", { note })
    } catch (e) {
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
    } catch(e) {
      console.warn(e)
      return []
    }
  }

  async getDeckNames(): Promise<string[]> {
    try {
      let result = await this.invoke("deckNames")
      return result
    } catch (e){
      console.warn(e)
      return []
    }

  }

  async getModelFieldNames(modelName: string): Promise<string[]> {
    try {
      let result = await this.invoke("modelFieldNames", { modelName })
      return result
    } catch(e) {
      console.warn(e)
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
  private formatNoteWordData(data: NoteWordData) {
    const { wordConfig } = this.ankiConfig
    if (!wordConfig) return openOptions(1)
    const { deckName, modelName, matchedFields ,tags} = wordConfig
    if (!deckName) return openOptions(1)
    if (!modelName) return openOptions(1)
    if (!matchedFields) return openOptions(1)
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

    const audio = audioKeyArray.map((key) => {
      return {
        url: data[key],
        filename: `English_word_${data["word"]}_${key}.mp3`,
        fields: [
          `${matchedFields[key]}`
        ]
      }
    })

    const fields = noteDataKeyArray.reduce((fields, key) => {
      const field = matchedFields[key]
      const content = data[key]
      if (!field || !content) return fields
      fields[field] = content
      return fields
    }, {} as any)

    return {
      deckName,
      modelName,
      fields,
      audio,
      tags:tags.trim().split(/\s+/g),
      "options": {
        "allowDuplicate": false,
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
  private formatNotePhraseData(data: NotePhraseData) {
    const { phraseConfig } = this.ankiConfig
    if (!phraseConfig) return openOptions(2)
    const { deckName, modelName, matchedFields,tags} = phraseConfig
    if (!deckName) return openOptions(2)
    if (!modelName) return openOptions(2)
    if (!matchedFields) return openOptions(2)
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
    const audio = audioKeyArray.map((key) => {
      return {
        url: data[key],
        filename: `English_word_${data["phrase"]}_${key}.mp3`,
        fields: [
          `${matchedFields[key]}`
        ]
      }
    })

    const fields = noteDataKeyArray.reduce((fields, key) => {
      const field = matchedFields[key]
      const content = data[key]
      if (!field || !content) return fields
      fields[field] = content
      return fields
    }, {} as any)

    return {
      deckName,
      modelName,
      fields,
      audio,
      tags:tags.trim().split(/\s+/g),
      "options": {
        "allowDuplicate": false,
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
  private formatSentenceNote(data: SentenceData) {
    const { sentenceConfig } = this.ankiConfig
    if (!sentenceConfig) return openOptions(3)
    const { deckName, modelName, matchedFields,tags } = sentenceConfig
    if (!deckName) return openOptions(3)
    if (!modelName) return openOptions(3)
    if (!matchedFields) return openOptions(3)
    const noteDataKeyArray: Array<keyof SentenceData> = [
      "sentence",
      "sentenceTranslation"
    ]
    const audioKeyArray: Array<keyof SentenceData> = [
      "sentence_audio"
    ]

    const audio = audioKeyArray.map((key) => {
      return {
        url: data[key],
        filename: `English_word_${data["sentence"]}_${key}.mp3`,
        fields: [
          `${matchedFields[key]}`
        ]
      }
    })

    const fields = noteDataKeyArray.reduce((fields, key) => {
      const field = matchedFields[key]
      const content = data[key]
      if (!field || !content) return fields
      fields[field] = content
      return fields
    }, {} as any)

    return {
      deckName,
      modelName,
      fields,
      audio,
      tags:tags.trim().split(/\s+/g),
      "options": {
        "allowDuplicate": false,
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
  private async invoke(action: Action, params = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      const { version, targetURL } = this
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('error', () => reject('请求发送失败：可能是一下原因造成：1.网络尚未连接；2.AnkiConnection未连接；'));
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
 * 纯函数,将WordData格式转换为NoteWordData[]格式
 * @param data WordData
 * @returns NoteWordData[]
 */
function getNoteWordDataArray(data: WordData): NoteWordData[] {
  const { starAmount, phonetic, translationUnits } = data
  const { am, en, am_audio, en_audio } = phonetic;
  //当且仅当paraphrases存在时，才具有全选添加的按钮，因此paraphrases必然存在
  const noteWordDataArray: NoteWordData[] = (
    translationUnits as TranslationUnit[]
  ).map((paraphrase) => {
    const { word, part_of_speech, translation, definition, definition_audio, exampleSentences } =
      paraphrase;
    let example_audio, example_sentence, example_sentence_translation;
    if (exampleSentences) {
      example_audio = exampleSentences[0].example_audio;
      example_sentence = exampleSentences[0].example_sentence;
      example_sentence_translation =
        exampleSentences[0].example_sentence_translation;
    }
    return {
      word,
      starAmount: "★".repeat(starAmount),//因为Anki不接受number数据类型，因此需要转换为字符串
      am,
      en,
      am_audio,
      en_audio,
      part_of_speech,
      translation,
      definition,
      definition_audio,
      example_audio,
      example_sentence,
      example_sentence_translation,
    };
  });
  return noteWordDataArray
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
const openOptions = function (index:number) {
  const cachedOptions:Partial<CachedOptions> = {
    defaultActiveIndex:String(index)
  }
  chrome.storage.local.set(cachedOptions,() => {
    chrome.runtime.openOptionsPage()
  })
}