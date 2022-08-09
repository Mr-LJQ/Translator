import { HotKey } from "@/types";

export interface CommonConfig {
  tags: string;
  deckName: string;
  modelName: string;
}

export interface WordFields {
  en: string;
  am: string;
  word: string;
  am_audio: string;
  en_audio: string;
  definition: string;
  translation: string;
  star_amount: string;
  example_audio: string;
  part_of_speech: string;
  definition_audio: string;
  example_sentence: string;
  example_sentence_translation: string;
}

export interface PhraseFields {
  phrase: string;
  phrase_audio: string;
  translations: string;
  example_audio_1: string;
  example_audio_2: string;
  example_audio_3: string;
  example_sentence_1: string;
  example_sentence_2: string;
  example_sentence_3: string;
  example_sentence_translation_1: string;
  example_sentence_translation_2: string;
  example_sentence_translation_3: string;
}

export interface SentenceFields {
  sentence: string;
  sentence_audio: string;
  sentence_translation: string;
}

export enum TabPanelName {
  Home,
  Word,
  Phrase,
  Sentence,
}

export type WordConfig = Partial<WordFields & CommonConfig>;
export type PhraseConfig = Partial<PhraseFields & CommonConfig>;
export type SentenceConfig = Partial<SentenceFields & CommonConfig>;

export type ModelFields =
  | Partial<WordFields>
  | Partial<PhraseFields>
  | Partial<SentenceFields>;

type CheckWordDuplicate = Partial<
  Record<keyof Omit<WordConfig, "tags">, boolean>
>;
type CheckPhraseDuplicate = Partial<
  Record<keyof Omit<PhraseConfig, "tags">, boolean>
>;
type CheckSentenceDuplicate = Partial<
  Record<keyof Omit<SentenceConfig, "tags">, boolean>
>;

export interface Storage {
  isOpen: boolean;
  openSelection: boolean;
  hiddenChinese: boolean;
  ankiConnectionURL: string;
  hotKey: HotKey | undefined;
  ankiConnectionMethod: string;
  checkedTabPanel: TabPanelName;
  wordConfig: WordConfig;
  phraseConfig: PhraseConfig;
  sentenceConfig: SentenceConfig;
  checkWordDuplicate: CheckWordDuplicate;
  checkPhraseDuplicate: CheckPhraseDuplicate;
  checkSentenceDuplicate: CheckSentenceDuplicate;
  openStrengthenSelectionByPressedCtrl: boolean;
}

export type PartialStorage = Partial<Storage>;
