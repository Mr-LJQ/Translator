import { PhraseData, Point, SentenceData, WordData ,TranslationResult} from "./index";

export interface AddButtonState {
  status: number
  statusText: string
  cardIds?: number[]
}

export interface ShowData {
  translatedData: TranslationResult
  point: Point
}