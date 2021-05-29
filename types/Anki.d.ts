import { PhraseData, SentenceData, WordData, NoteWordData } from "./index"

export interface AnkiResponse {
  //["➕", "✔", "✖","✄", "↻", ]
  status: 1 | 2 | 3 | 4 ,
  statusText: string,
  cardIds?: number[]
}

type MediaItem = Array<{
  url:string,
  filename: "countdown.mp4",
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
  audio?:MediaItem,
  video?: MediaItem,
  picture?: MediaItem
}

export type NoteData = WordData | PhraseData | SentenceData | NoteWordData

export type AnkiCallback = (data: AnkiResponse) => void