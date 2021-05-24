import {SentenceData} from "./Translation"

export interface NoteWordData {
  word: string,
  starAmount: string,
  am?: string,
  en?: string,
  am_audio?: string,
  en_audio?: string,
  definition: string,
  definition_audio:string,
  part_of_speech: string,
  translation: string,
  example_sentence?: string
  example_sentence_translation?: string
  example_audio?: string
}

export interface NotePhraseData {
  phrase: string
  phrase_audio: string
  translations: string
  example_sentence_1?: string 
  example_sentence_translation_1?: string 
  example_audio_1?: string 
  example_sentence_2?: string 
  example_sentence_translation_2?: string 
  example_audio_2?: string 
  example_sentence_3?: string 
  example_sentence_translation_3?: string 
  example_audio_3?: string 
}

export interface NoteSentenceData extends SentenceData {
}

export interface CachedOptions {
  wordConfig:WordConfig, 
  phraseConfig:PhraseConfig,
  sentenceConfig:SentenceConfig, 
  connectionMethod:string, //获取上次选择的连接到Anki的方法
  isOpen:boolean, //是否启用插件
  hotKey:HotKey //自动选词热键
  defaultActiveIndex:string //打开options后，首先展示的选项卡
}

export interface BasisAnkiConfig {
  deckName:string, //获取上次选择的牌组
  modelName:string,  //获取上次选择的模块
  tags:string
}

export interface WordConfig extends BasisAnkiConfig{
  matchedFields:NoteWordData
}
export interface SentenceConfig extends BasisAnkiConfig{
  matchedFields:NoteSentenceData
}

export interface PhraseConfig extends BasisAnkiConfig{
  matchedFields:NotePhraseData
}

export type HotKey = "shiftKey" | "ctrlKey" | "altKey" | undefined

export interface DeckAndModels {
  deckNames:string[]
  modelNames:string[]
}