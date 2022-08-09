export enum NoteType {
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
  Success,
  Forgotten,
  Disconnect,
  Duplicate,
  FirstAddSuccess,
  ConfigError,
  OldVersion,
  Error,
}

export interface AnkiResponse<T> {
  data?: T;
  message?: string;
  status: AnkiResponseStatus;
}
