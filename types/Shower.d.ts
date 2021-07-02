import { AnkiResponse } from "./Anki";
import { PhraseData, SentenceData, WordData ,TranslationResult} from "./Translation";

export enum Status{
  loading = -1,
  add,
  success,
  error,
  disconnected,
  relearn,
}

export interface AddButtonState extends AnkiResponse {
  status: Status
  statusText: string
  cardIds?: number[]
}

export interface Point {
  x:number,
  y:number
}

export interface ShowData {
  translatedData: TranslationResult
  point: Point
}