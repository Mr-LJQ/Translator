import {Options} from "./Options"

export interface ExampleSentence {
  example_sentence:string //英语例句
  example_sentence_translation:string //中文例句
  example_audio:string //例句音频URI
}

export interface TranslationUnit {
  part_of_speech:string //词性
  translation:string  //翻译
  definition:string  //定义
  idiom?:string
  exampleSentences:Array<ExampleSentence> //例句数组
}

export interface Phonetic {
  am:string //美国发音
  en:string //英国发音
  am_audio:string //美国发音音频URI
  en_audio:string //英国发音音频URI
}

export interface WordTranslation {
  word:string  //单词本体
  frequence:number //单词出现的频率
  phonetic:Phonetic //单词音标与音频
  translationUnits:Array<TranslationUnit> //单词的翻译单元
}

export interface SentenceTranslation {
  sentence:string
  sentenceTranslation:string
}

export declare class DictionaryScript{
  constructor (options:Options)
  async translateWord ():Promise<WordTranslation>
  async translateSentence ():Promise<SentenceTranslation>
  updateOptions (options:Options):void
}

export interface TranslationData {
  
}