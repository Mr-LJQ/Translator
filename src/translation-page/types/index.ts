import type { TranslationResult } from "@/dictionary";
import type {
  WordFields,
  PhraseFields,
  SentenceFields,
} from "@/extensions-api";
type MakeRequired<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;

export type WordNoteData = MakeRequired<
  WordFields,
  "word" | "star_amount" | "translation" | "part_of_speech"
>;

export type PhraseNoteData = MakeRequired<
  PhraseFields,
  "phrase" | "phrase_audio" | "translations"
>;

export type SentenceNoteData = SentenceFields;

export type NoteData = WordNoteData | PhraseNoteData | SentenceNoteData;

export const enum Status {
  Add,
  Loading,
  Disconnect,
  Error,
  Success,
  Forgotten,
  LearnNow,
  Duplicate,
  ConfigError,
}

export interface AnkiButtonInfo {
  status: Status;
  message: string;
  cardIds?: number[];
}

export interface AnkiButtonInfoObject {
  [key: string | symbol]: AnkiButtonInfo[];
}

export interface DisplayContainerProps {
  data?: TranslationResult;
  loadingSet: Set<string>;
  ankiButtonInfoObject: AnkiButtonInfoObject;
  setAnkiButtonInfoObject: React.Dispatch<
    React.SetStateAction<AnkiButtonInfoObject>
  >;
}
