export {
  createDisconnectionResponse,
  createSuccessAnkiResponse,
  createForgottenResponse,
  createDuplicateResponse,
  createFirstAddSuccessResponse,
  createConfigErrorResponse,
  createOldVersionResponse,
  createAnkiErrorResponse,
  isAnkiResponse
} from "./createAnkiResponse";

import {
  ModelFields,
  PhraseFields,
  SentenceFields,
  WordFields,
} from "@/extensions-api";
import { NoteData } from "@/translation-page";
import {
  WordNoteData,
  PhraseNoteData,
  SentenceNoteData,
} from "@/translation-page";
import { MediaField, NoteType, AnkiResponse } from "../types";

//纯函数
export function getConfigName(type: NoteType) {
  const configNames = {
    [NoteType.Word]: "wordConfig",
    [NoteType.Phrase]: "phraseConfig",
    [NoteType.Sentence]: "sentenceConfig",
  } as const;
  return configNames[type];
}
//纯函数
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
  const wordMedia: Array<keyof WordFields> = [
    "am_audio",
    "en_audio",
    "example_audio",
    "definition_audio",
  ];
  const phraseMedia: Array<keyof PhraseFields> = [
    "phrase_audio",
    "example_audio_1",
    "example_audio_2",
    "example_audio_3",
  ];
  const sentenceMedia: Array<keyof SentenceFields> = ["sentence_audio"];
  const mediaNames = {
    [NoteType.Word]: wordMedia,
    [NoteType.Phrase]: phraseMedia,
    [NoteType.Sentence]: sentenceMedia,
  }[type];
  return mediaNames;
}

/**
 * 获取媒体部分的域
 */
export function getMediaFields(
  type: NoteType,
  data: NoteData,
  matchedFields: ModelFields
): MediaField {
  const mediaNames = getMediaNames(type);
  return Object.entries(matchedFields).reduce((audio, [key, field]) => {
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
 * 获取非媒体部分的域
 */
export function getNotMediaFields(
  type: NoteType,
  data: NoteData,
  matchedFields: ModelFields
): {
  [key: string]: string;
} {
  const mediaNames = getMediaNames(type);
  return Object.entries(matchedFields).reduce(
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
