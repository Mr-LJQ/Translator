import { ConfigType } from "../types";

export function getConfigName(
  configName: ConfigType
): keyof Pick<Storage, "wordConfig" | "phraseConfig" | "sentenceConfig"> {
  const obj = {
    [ConfigType.Word]: "wordConfig",
    [ConfigType.Phrase]: "phraseConfig",
    [ConfigType.Sentence]: "sentenceConfig",
  } as const;
  return obj[configName];
}

export function getDuplicateConfigName(
  configName: ConfigType
): keyof Pick<
  Storage,
  "checkWordDuplicate" | "checkSentenceDuplicate" | "checkPhraseDuplicate"
> {
  const obj = {
    [ConfigType.Word]: "checkWordDuplicate",
    [ConfigType.Phrase]: "checkPhraseDuplicate",
    [ConfigType.Sentence]: "checkSentenceDuplicate",
  } as const;
  return obj[configName];
}
