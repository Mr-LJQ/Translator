import {
  WordFields,
  ModelFields,
  PhraseFields,
  SentenceFields,
} from "@/extensions-api";
import { NoteData } from "@/translation-page";
import { MediaField, NoteType } from "../types";

/**
 * 纯函数
 */
export function getConfigName(type: NoteType) {
  const configNames = {
    [NoteType.Word]: "wordConfig",
    [NoteType.Phrase]: "phraseConfig",
    [NoteType.Sentence]: "sentenceConfig",
  } as const;
  return configNames[type];
}
/**
 * 纯函数
 */
export function getDuplicateConfigName(type: NoteType) {
  const configNames = {
    [NoteType.Word]: "checkWordDuplicate",
    [NoteType.Phrase]: "checkPhraseDuplicate",
    [NoteType.Sentence]: "checkSentenceDuplicate",
  } as const;
  return configNames[type];
}

/**
 * 纯函数，获取特定类型的代表音频媒体的 key 的集合
 */
function getMediaNames(type: NoteType) {
  const wordMedias: Array<keyof WordFields> = [
    "am_audio",
    "en_audio",
    "example_audio",
    "definition_audio",
  ];
  const phraseMedias: Array<keyof PhraseFields> = [
    "phrase_audio",
    "example_audio_1",
    "example_audio_2",
    "example_audio_3",
  ];
  const sentenceMedias: Array<keyof SentenceFields> = ["sentence_audio"];
  const mediaNames = {
    [NoteType.Word]: wordMedias,
    [NoteType.Phrase]: phraseMedias,
    [NoteType.Sentence]: sentenceMedias,
  }[type];
  return mediaNames;
}

/**
 * 纯函数，获取媒体部分的域
 */
export function getMediaFields(
  type: NoteType,
  data: NoteData,
  modelFieldsMap: ModelFields
): MediaField {
  const mediaNames = getMediaNames(type);
  return Object.entries(modelFieldsMap).reduce((audio, [key, field]) => {
    //@ts-ignore 是能够正确匹配的
    if (!mediaNames.includes(key)) return audio;
    //@ts-ignore 是能够正确匹配的
    const url = data[key];
    if (!url || !field) return audio;
    audio.push({
      url,
      fields: [field],
      filename: `${encodeURIComponent(url)}.mp3`,
    });
    return audio;
  }, [] as MediaField);
}

/**
 * 纯函数，获取非媒体部分的域
 */
export function getNotMediaFields(
  type: NoteType,
  data: NoteData,
  modelFieldsMap: ModelFields
): {
  [key: string]: string;
} {
  const mediaNames = getMediaNames(type);
  return Object.entries(modelFieldsMap).reduce(
    (fields, [key, fieldKey]) => {
      //@ts-ignore 是可以正确匹配的
      if (mediaNames.includes(key)) return fields;
      //@ts-ignore 是可以正确匹配的
      const fieldValue = data[key];
      if (!fieldKey || !fieldValue) return fields;
      fields[fieldKey] = fieldValue;
      return fields;
    },
    {} as {
      [key: string]: string;
    }
  );
}
