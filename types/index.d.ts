export type {
  WordData,
  PhraseData,
  SentenceData,
  TranslationResult,
  Phonetic,
  TranslationUnit,
  ExampleSentence,
} from "./Translation"

export type {
  NoteWordData,
  NotePhraseData,
  NoteSentenceData,
  WordConfig,
  PhraseConfig,
  SentenceConfig,
  BasisAnkiConfig,
  CachedOptions,
  DeckAndModels,
  TabPaneKey,
} from "./Options"

export type {
  NoteData,
  AnkiResponse,
  AnkiCallback,
  AddNoteParams,
} from "./Anki"

export type {
  Message,
  MessageHandler,
  SendResponse,
} from "./Handler"

export type {
  ShowData,
  AddButtonState
}from "./Shower"

export interface Point {
  x:number,
  y:number
}

export type AnyFunction = (...args:any[]) => void