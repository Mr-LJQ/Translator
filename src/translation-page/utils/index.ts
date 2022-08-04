export {History} from "./History"
export {decodeBTag} from "./decodeBTag"

/**
 * 纯函数，用于处理有定义的单词翻译
 */
function transformWordData(wordData, index) {
  var star_amount = wordData.star_amount,
      translationList = wordData.translationList,
      phonetic = wordData.phonetic,
      word = wordData.word;
  var am = phonetic.am,
      en = phonetic.en,
      am_audio = phonetic.am_audio,
      en_audio = phonetic.en_audio;
  var _ref = translationList[index],
      definition = _ref.definition,
      translation = _ref.translation,
      part_of_speech = _ref.part_of_speech,
      definition_audio = _ref.definition_audio,
      example_sentences = _ref.example_sentences; //之所以必定有，是这个函数是用户在看到 translationList 存在后添加是调用的

  var example_audio, example_sentence, example_sentence_translation;

  if (example_sentences) {
    var _example_sentences$, _example_sentences$2, _example_sentences$3;

    example_audio = (_example_sentences$ = example_sentences[0]) === null || _example_sentences$ === void 0 ? void 0 : _example_sentences$.example_audio;
    example_sentence = (_example_sentences$2 = example_sentences[0]) === null || _example_sentences$2 === void 0 ? void 0 : _example_sentences$2.example_sentence;
    example_sentence_translation = (_example_sentences$3 = example_sentences[0]) === null || _example_sentences$3 === void 0 ? void 0 : _example_sentences$3.example_sentence_translation;
  }

  var noteWordData = {
    word: word,
    star_amount: "★".repeat(star_amount),
    am: am,
    en: en,
    am_audio: am_audio,
    en_audio: en_audio,
    part_of_speech: part_of_speech,
    translation: translation,
    definition: definition,
    definition_audio: definition_audio,
    example_audio: example_audio,
    example_sentence: example_sentence,
    example_sentence_translation: example_sentence_translation
  };
  return noteWordData;
}
/**
 * 纯函数，用于处理那些没有定义的单词翻译
 */

function transformTranslations(wordData, key, idx) {
  var star_amount = wordData.star_amount,
      phonetic = wordData.phonetic,
      word = wordData.word,
      translations = wordData.translations;
  var am = phonetic.am,
      en = phonetic.en,
      am_audio = phonetic.am_audio,
      en_audio = phonetic.en_audio;
  var noteWordData = {
    word: word,
    star_amount: "★".repeat(star_amount),
    part_of_speech: key,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    translation: translations[key][idx],
    //必然存在的，因为只有存在才会调用该函数
    am: am,
    en: en,
    am_audio: am_audio,
    en_audio: en_audio
  };
  return noteWordData;
}
/**
 * 纯函数，将PhraseData格式转换为NotePhraseData格式
 */

function transformPhraseData(data) {
  var _example_sentences$4, _example_sentences$5, _example_sentences$6, _example_sentences$7, _example_sentences$8, _example_sentences$9, _example_sentences$10, _example_sentences$11, _example_sentences$12;

  var phrase = data.phrase,
      phrase_audio = data.phrase_audio,
      translations = data.translations,
      example_sentences = data.example_sentences;
  var notePhraseData = {
    phrase: phrase,
    phrase_audio: phrase_audio,
    translations: translations.join(" <br /> ")
  };
  if (example_sentences == null) return notePhraseData;
  return Object.assign(notePhraseData, {
    example_sentence_1: (_example_sentences$4 = example_sentences[0]) === null || _example_sentences$4 === void 0 ? void 0 : _example_sentences$4.example_sentence,
    example_sentence_translation_1: (_example_sentences$5 = example_sentences[0]) === null || _example_sentences$5 === void 0 ? void 0 : _example_sentences$5.example_sentence_translation,
    example_audio_1: (_example_sentences$6 = example_sentences[0]) === null || _example_sentences$6 === void 0 ? void 0 : _example_sentences$6.example_audio,
    example_sentence_2: (_example_sentences$7 = example_sentences[1]) === null || _example_sentences$7 === void 0 ? void 0 : _example_sentences$7.example_sentence,
    example_sentence_translation_2: (_example_sentences$8 = example_sentences[1]) === null || _example_sentences$8 === void 0 ? void 0 : _example_sentences$8.example_sentence_translation,
    example_audio_2: (_example_sentences$9 = example_sentences[1]) === null || _example_sentences$9 === void 0 ? void 0 : _example_sentences$9.example_audio,
    example_sentence_3: (_example_sentences$10 = example_sentences[2]) === null || _example_sentences$10 === void 0 ? void 0 : _example_sentences$10.example_sentence,
    example_sentence_translation_3: (_example_sentences$11 = example_sentences[2]) === null || _example_sentences$11 === void 0 ? void 0 : _example_sentences$11.example_sentence_translation,
    example_audio_3: (_example_sentences$12 = example_sentences[2]) === null || _example_sentences$12 === void 0 ? void 0 : _example_sentences$12.example_audio
  });
}

/**
 * 纯函数，用于将AnkiResponse的status装换为AnkiButtonStatus
 */

function getDerivedStatusFromResponseStatus(responseStatus) {
  //成功
  if (_backend_script_anki_utils__WEBPACK_IMPORTED_MODULE_2__.ResponseStatus.SuccessStart < responseStatus && responseStatus < _backend_script_anki_utils__WEBPACK_IMPORTED_MODULE_2__.ResponseStatus.SuccessEnd) {
    return _components_HistoryContainer__WEBPACK_IMPORTED_MODULE_1__.Status.Success;
  } //特殊状态


  if (responseStatus === _backend_script_anki_utils__WEBPACK_IMPORTED_MODULE_2__.ResponseStatus.Duplicate) return _components_HistoryContainer__WEBPACK_IMPORTED_MODULE_1__.Status.Duplicate;
  if (responseStatus === _backend_script_anki_utils__WEBPACK_IMPORTED_MODULE_2__.ResponseStatus.Forgotten) return _components_HistoryContainer__WEBPACK_IMPORTED_MODULE_1__.Status.Forget;
  if (responseStatus === _backend_script_anki_utils__WEBPACK_IMPORTED_MODULE_2__.ResponseStatus.AddSuccess) return _components_HistoryContainer__WEBPACK_IMPORTED_MODULE_1__.Status.LearnNow;
  if (responseStatus === _backend_script_anki_utils__WEBPACK_IMPORTED_MODULE_2__.ResponseStatus.Disconnect) return _components_HistoryContainer__WEBPACK_IMPORTED_MODULE_1__.Status.Disconnect; //错误

  if (_backend_script_anki_utils__WEBPACK_IMPORTED_MODULE_2__.ResponseStatus.ErrorStart < responseStatus && responseStatus < _backend_script_anki_utils__WEBPACK_IMPORTED_MODULE_2__.ResponseStatus.ErrorEnd) {
    return _components_HistoryContainer__WEBPACK_IMPORTED_MODULE_1__.Status.Error;
  }

  return _components_HistoryContainer__WEBPACK_IMPORTED_MODULE_1__.Status.Error;
}
