export type TranslationResult = WordData | SentenceData | PhraseData | ErrorData

export interface ErrorData {
  error:string
}

export interface WordData {
  word: string  //单词本体
  starAmount: number //单词出现的频率
  phonetic: Phonetic //单词音标与音频
  translations?: string[] //简略翻译
  translationUnits?: Array<TranslationUnit>//单词的翻译单元
}


export interface SentenceData {
  sentence: string
  sentence_audio: string
  sentenceTranslation: string
}

export interface PhraseData {
  phrase: string
  phrase_audio: string
  translations: string[]
  exampleSentences?: ExampleSentence[]
}

export interface ExampleSentence {
  example_sentence: string //英语例句
  example_sentence_translation: string //中文例句
  example_audio: string //例句音频URI
}

export interface TranslationUnit {
  word:string
  part_of_speech: string //词性
  translation: string  //翻译
  definition: string  //定义
  definition_audio: string //定义音频
  exampleSentences?: Array<ExampleSentence> //例句数组
}

export interface Phonetic {
  am?: string  //美国发音
  en?: string  //英国发音
  am_audio?: string //美国发音音频URI
  en_audio?: string //英国发音音频URI
}


