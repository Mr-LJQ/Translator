
export interface SentenceData {
  type: "SENTENCE";
  sentence: string;
  sentence_audio: string;
  sentence_translation: string;
}

export interface PhraseData {
  type: "PHRASE";
  phrase: string;
  phrase_audio: string;
  translations: string[];
  example_sentences?: ExampleSentence[];
}

export interface WordData {
  type:"WORD"
  word: string  //单词本体
  star_amount: number //单词出现的频率
  phonetic: Phonetic //单词音标与音频
  translations?: string[] //简略翻译
  translationList?: Array<TranslationItem>//单词的翻译单元
}

export interface ErrorData {
  type:"ERROR"
  cache: boolean
  message?: string,
  possibleSpelling?: string[],
}
export type TranslationResult = WordData | SentenceData | PhraseData | ErrorData

export interface ExampleSentence {
  example_audio: string //例句音频URI
  example_sentence: string //英语例句
  example_sentence_translation: string //例句翻译
}

export interface TranslationItem {
  definition: string  //定义
  translation: string  //翻译
  part_of_speech: string //词性
  definition_audio: string //定义音频
  example_sentences?: Array<ExampleSentence> //例句数组
}

export interface Phonetic {
  am?: string  //美国发音
  en?: string  //英国发音
  am_audio?: string //美国发音音频URI
  en_audio?: string //英国发音音频URI
}


