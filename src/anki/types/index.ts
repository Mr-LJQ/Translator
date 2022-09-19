import { ankiResponseSymbol } from "../utils";
export const enum NoteType {
  Word = 0,
  Phrase = 1,
  Sentence = 2,
}

export interface AddNoteParams {
  deckName: string;
  modelName: string;
  fields: {
    [key: string]: string;
  };
  options: {
    allowDuplicate: boolean;
    duplicateScope: "deck";
    duplicateScopeOptions: {
      deckName: string;
      checkChildren: boolean;
      checkAllModels: boolean;
    };
  };
  tags?: string[];
  audio?: MediaField;
  video?: MediaField;
  picture?: MediaField;
}

export type MediaField = Array<{
  url: string;
  filename: string;
  skipHash?: string;
  fields: string[];
}>;

export enum AnkiResponseStatus {
  Error,
  Success,
  Forgotten,
  Duplicate,
  Disconnect,
  ConfigError,
  FirstAddSuccess,
}

export interface AnkiResponse<T> {
  data: T;
  ok: boolean;
  message: string;
  status: AnkiResponseStatus;
  [ankiResponseSymbol]: boolean;
}

export interface AnkiResponseError<T> extends AnkiResponse<T> {
  ok: false;
}
export interface AnkiResponseSuccess<T> extends AnkiResponse<T> {
  ok: true;
}

export type AnkiConfig = Pick<
  Storage,
  | "wordConfig"
  | "phraseConfig"
  | "sentenceConfig"
  | "ankiConnectionURL"
  | "checkWordDuplicate"
  | "checkPhraseDuplicate"
  | "checkSentenceDuplicate"
>;
