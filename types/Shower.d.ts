import { PhraseData, SentenceData, WordData } from "./index";

export interface AddButtonState {
  status:number
  statusText:string
  cardIds?:number[]
}