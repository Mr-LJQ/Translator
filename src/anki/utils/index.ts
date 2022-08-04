export { createDisconnectionResponse } from "./createAnkiResponse";

import { MediaField, NoteType, AnkiResponse } from "../types";

/**
 * 约定，
 * (200,299)是成功；
 * (300,399)是特殊状态；
 * (400,499)是错误；
 * 状态应该被 Start 与 End 包裹
 * 因为哪怕状态超越 End 也不会进行报错，所以需要手动查看最后一个状态是否越界
 * （预留了98个状态，足够使用，所以一般不需要考虑这个问题）
 */
//成功类状态码 (200,299)

(function (NoteType) {
  NoteType[(NoteType["Word"] = 0)] = "Word";
  NoteType[(NoteType["Phrase"] = 1)] = "Phrase";
  NoteType[(NoteType["Sentence"] = 2)] = "Sentence";
})(NoteType || (NoteType = {}));

let ResponseStatus; //特殊类状态码 (300,399)

(function (ResponseStatus) {
  ResponseStatus[(ResponseStatus["SuccessStart"] = 200)] = "SuccessStart";
  ResponseStatus[(ResponseStatus["Success"] = 201)] = "Success";
  ResponseStatus[(ResponseStatus["SuccessEnd"] = 299)] = "SuccessEnd";
})(ResponseStatus || (ResponseStatus = {}));

(function (ResponseStatus) {
  ResponseStatus[(ResponseStatus["SpecialStart"] = 300)] = "SpecialStart";
  ResponseStatus[(ResponseStatus["AddSuccess"] = 301)] = "AddSuccess";
  ResponseStatus[(ResponseStatus["Forgotten"] = 302)] = "Forgotten";
  ResponseStatus[(ResponseStatus["Duplicate"] = 303)] = "Duplicate";
  ResponseStatus[(ResponseStatus["Disconnect"] = 304)] = "Disconnect";
  ResponseStatus[(ResponseStatus["SpecialEnd"] = 399)] = "SpecialEnd";
})(ResponseStatus || (ResponseStatus = {}));

(function (ResponseStatus) {
  ResponseStatus[(ResponseStatus["ErrorStart"] = 400)] = "ErrorStart";
  ResponseStatus[(ResponseStatus["ReturnError"] = 401)] = "ReturnError";
  ResponseStatus[(ResponseStatus["UnexpectedError"] = 402)] = "UnexpectedError";
  ResponseStatus[(ResponseStatus["OldVersionError"] = 403)] = "OldVersionError";
  ResponseStatus[(ResponseStatus["UserConfigError"] = 404)] = "UserConfigError";
  ResponseStatus[(ResponseStatus["ErrorEnd"] = 499)] = "ErrorEnd";
})(ResponseStatus || (ResponseStatus = {}));

/**
 * 如果用户未进行任何短语相关的配置，则弹出配置窗口，让用户进行配置
 */

function openConfigPage(type, callback) {
  let _NoteType$Word$NoteTy;

  let activeTabPane = ((_NoteType$Word$NoteTy = {}),
  _defineProperty(
    _NoteType$Word$NoteTy,
    NoteType.Word,
    _extensions_apis__WEBPACK_IMPORTED_MODULE_0__.TabPaneKey.Word
  ),
  _defineProperty(
    _NoteType$Word$NoteTy,
    NoteType.Phrase,
    _extensions_apis__WEBPACK_IMPORTED_MODULE_0__.TabPaneKey.Phrase
  ),
  _defineProperty(
    _NoteType$Word$NoteTy,
    NoteType.Sentence,
    _extensions_apis__WEBPACK_IMPORTED_MODULE_0__.TabPaneKey.Sentence
  ),
  _NoteType$Word$NoteTy)[type];
  (0, _extensions_apis__WEBPACK_IMPORTED_MODULE_0__.setStorage)(
    {
      activeTabPane: activeTabPane,
    },
    function () {
      (0, _extensions_apis__WEBPACK_IMPORTED_MODULE_0__.openOptionsPage)(
        callback
      );
    }
  );
}
/**
 * 处理用户配置错误
 */

function handleUserConfigError(cond, type, callback) {
  if (!cond) {
    openConfigPage(type, callback);
  }
}

//纯函数
function createSuccessAnkiResponse(data) {
  return new AnkiResponse({
    data: data,
    message: "ok",
    status: ResponseStatus.Success,
  });
}

//纯函数
function getConfigName(type: NoteType) {
  const configNames = {
    [NoteType.Word]: "wordConfig",
    [NoteType.Phrase]: "phraseConfig",
    [NoteType.Sentence]: "sentenceConfig",
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
function getMediaFields(type: NoteType, data, matchedFields) {
  let mediaNames = getMediaNames(type);
  return Object.entries(matchedFields).reduce(function (audio, _ref) {
    let _ref2 = _slicedToArray(_ref, 2),
      key = _ref2[0],
      field = _ref2[1];

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
