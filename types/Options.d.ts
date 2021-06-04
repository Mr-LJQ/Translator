import {SentenceData} from "./index"

//拓展可以提供给Anki的数据，单词部分
export interface NoteWordData {
  word: string,
  starAmount?: string,
  definition?: string,
  translation: string,
  part_of_speech?: string,
  definition_audio?:string,
  am?: string,
  en?: string,
  am_audio?: string,
  en_audio?: string,
  example_audio?: string
  example_sentence?: string
  example_sentence_translation?: string
}
//拓展可以提供给Anki的数据，短语部分
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
//拓展可以提供给Anki的数据，句子部分
export interface NoteSentenceData extends SentenceData {
}

//拓展缓存的数据
export interface CachedOptions {
  wordConfig?:WordConfig, 
  phraseConfig?:PhraseConfig, 
  sentenceConfig?:SentenceConfig, 
  connectionMethod?:string, //获取上次选择的连接到Anki的方法
  isOpen?:boolean, //是否启用插件
  hotKey?:HotKey //自动选词热键
  activeTabPane?:TabPaneKey //打开options后，首先展示的选项卡
  ankiConnectionURL:string
}

export interface BasisAnkiConfig {
  deckName?:string, //获取上次选择的牌组
  modelName?:string,  //获取上次选择的模块
  tags?:string
}

export interface WordConfig extends BasisAnkiConfig{
  matchedFields?:Partial<NoteWordData>
}
export interface SentenceConfig extends BasisAnkiConfig{
  matchedFields?:Partial<NoteSentenceData>
}

export interface PhraseConfig extends BasisAnkiConfig{
  matchedFields?:Partial<NotePhraseData>
}

type HotKey = "shiftKey" | "ctrlKey" | "altKey" | undefined

export interface DeckAndModels {
  deckNames:string[]
  modelNames:string[]
}

export type  TabPaneKey = "basis" | "word" | "phrase" | "sentence"