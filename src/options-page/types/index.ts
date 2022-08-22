export const enum ConfigType {
  Word,
  Phrase,
  Sentence,
}

export interface FieldNamesObject {
  [key: string]: string[];
}

export type ConfigName = "wordConfig" | "phraseConfig" | "sentenceConfig";

export type DuplicateConfigName =
  | "checkWordDuplicate"
  | "checkSentenceDuplicate"
  | "checkPhraseDuplicate";
