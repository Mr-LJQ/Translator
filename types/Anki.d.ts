import { PhraseData, SentenceData } from './Translation'
import {Status} from "./Shower"

export interface AnkiResponse {
  //["➕", "✔", "✖","✄", "↻", ]
  status: Status,
  statusText: string,
  cardIds?: number[]
}

type MediaItem = Array<{
  url: string,
  filename: string,
  skipHash?: string,
  fields: string[]
}>

export interface AddNoteParams {
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
      checkChildren: boolean
    }
  },
  tags?: string[],
  audio?: MediaItem,
  video?: MediaItem,
  picture?: MediaItem
}

export type NoteData = PhraseData | SentenceFieldData | WordFieldData

export type AnkiCallback = (data: AnkiResponse) => void

//拓展可以提供给Anki的数据，单词部分
export interface WordFieldData {
  word: string,
  starAmount?: string,
  definition?: string,
  translation: string,
  part_of_speech?: string,
  definition_audio?: string,
  am?: string,
  en?: string,
  am_audio?: string,
  en_audio?: string,
  example_audio?: string
  example_sentence?: string
  example_sentence_translation?: string
}
//拓展可以提供给Anki的数据，短语部分
export interface PhraseFieldData {
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
export interface SentenceFieldData extends SentenceData {
}
