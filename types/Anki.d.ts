export interface AnkiResponse {
  status:1 | 2,
  statusText:string
}

export type AnkiCallback = (data:AnkiResponse) => void