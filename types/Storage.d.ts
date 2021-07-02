import { WordFieldData, PhraseFieldData, SentenceFieldData, AnkiConnectionMethod } from './Anki'
//拓展缓存的数据
export interface Storage {
  wordConfig?: WordConfig,
  phraseConfig?: PhraseConfig,
  sentenceConfig?: SentenceConfig,
  isOpen?: boolean, //是否启用插件
  hotKey?: "shiftKey" | "ctrlKey" | "altKey"  //自动选词热键
  activeTabPane?: TabPaneKey //打开options后，首先展示的选项卡
  ankiConnectionURL?: string  //获取上次选择的连接到Anki的URL
  ankiConnectionMethod?: string, //获取上次选择的连接到Anki的方法
}

export type TabPaneKey = "basis" | "word" | "phrase" | "sentence"

export type BasisConfig = Pick<Storage, "ankiConnectionURL" | "ankiConnectionMethod">

export type OtherConfig = {
  tags?: string
  deckName?: string,
  modelName?: string,
}

type AnkiConfig<T> = OtherConfig & Partial<T>
export type WordConfig = AnkiConfig<WordFieldData>
export type PhraseConfig = AnkiConfig<PhraseFieldData>
export type SentenceConfig = AnkiConfig<SentenceFieldData>
