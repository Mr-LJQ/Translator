export {
  createDisconnectionResponse,
  createSuccessAnkiResponse,
  createForgottenResponse,
  createDuplicateResponse,
  createFirstAddSuccessResponse,
  createConfigErrorResponse,
} from "./createAnkiResponse";

import { AnkiConfig } from "@/extensions-api";
import { NoteData } from "@/translation-page";
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

//纯函数
function getMediaNames(type: NoteType) {
  const sentenceMedia = ["sentence_audio"] as const;
  const phraseMedia = [
    "phrase_audio",
    "example_audio_1",
    "example_audio_2",
    "example_audio_3",
  ] as const;
  const wordMedia = [
    "am_audio",
    "en_audio",
    "example_audio",
    "definition_audio",
  ] as const;
  const mediaNames = {
    [NoteType.Word]: wordMedia,
    [NoteType.Phrase]: phraseMedia,
    [NoteType.Sentence]: sentenceMedia,
  }[type];
  return mediaNames;
}

//纯函数
function getMediaFields(type: NoteType, data: NoteData, config: AnkiConfig) {
  let mediaNames = getMediaNames(type);
  return Object.entries(config).reduce((audio, val) => {
    const {key,field} = val

    if (!mediaNames.includes(key)) return audio;
    /**
     * NoteData 是基于 ModelFieldNames 的，因此 ModelFieldNames 上存在的 key，在 NoteData上也存在
     * 因此使用 @ts-ignore 来消除检测
     */
    //@ts-ignore

    let url = data[key];
    if (!url || !field) return audio;
    audio.push({
      url: url,
      fields: [field],
      filename: "".concat(encodeURIComponent(url), ".mp3"),
    });
    return audio;
  }, []);
}
/**
 * 纯函数
 */
function getNotMediaFields(type, data, matchedFields) {
  let mediaNames = getMediaNames(type);
  return Object.entries(matchedFields).reduce(function (fields, _ref3) {
    let _ref4 = _slicedToArray(_ref3, 2),
      key = _ref4[0],
      fieldKey = _ref4[1];

    if (mediaNames.includes(key)) return fields;
    /**
     * NoteData 是基于 MoDelFieldNames 的，因此 MoDelFieldNames 上存在的 key，在 NoteData上也存在
     * 因此使用 @ts-ignore 来消除检测
     */
    //@ts-ignore

    let fieldValue = data[key];
    if (!fieldKey || !fieldValue) return fields;
    fields[fieldKey] = fieldValue;
    return fields;
  }, {});
}
