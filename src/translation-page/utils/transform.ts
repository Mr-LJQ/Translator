import { WordNoteData, PhraseNoteData } from "../types";
import { WordData, PhraseData } from "@/dictionary";

/**
 * 纯函数，用于处理有定义的单词翻译
 */
export function transformWordData(
  wordData: WordData,
  index: number
): WordNoteData {
  const word = wordData.word;
  const phonetic = wordData.phonetic;
  const star_amount = wordData.star_amount;
  const translationList = wordData.translationList;
  const am = phonetic.am;
  const en = phonetic.en;
  const am_audio = phonetic.am_audio;
  const en_audio = phonetic.en_audio;
  //之所以必定有，是这个函数是用户在看到 translationList 存在后添加是调用的
  const {
    definition,
    translation,
    part_of_speech,
    definition_audio,
    example_sentences,
  } = translationList![index];

  let example_audio, example_sentence, example_sentence_translation;
  const firstExample = example_sentences?.[0];
  if (firstExample) {
    example_audio = firstExample.example_audio;
    example_sentence = firstExample.example_sentence;
    example_sentence_translation = firstExample.example_sentence_translation;
  }

  const noteWordData = {
    word,
    star_amount: "★".repeat(star_amount),
    am,
    en,
    am_audio,
    en_audio,
    part_of_speech,
    translation,
    definition,
    definition_audio,
    example_audio,
    example_sentence,
    example_sentence_translation,
  };
  return noteWordData;
}
/**
 * 纯函数，用于处理那些没有定义的单词翻译
 */

export function transformTranslations(
  wordData: WordData,
  key: string,
  idx: number
): WordNoteData {
  const star_amount = wordData.star_amount;
  const phonetic = wordData.phonetic;
  const word = wordData.word;
  const translations = wordData.translations;
  const am = phonetic.am;
  const en = phonetic.en;
  const am_audio = phonetic.am_audio;
  const en_audio = phonetic.en_audio;

  const noteWordData = {
    word,
    star_amount: "★".repeat(star_amount),
    part_of_speech: key,
    //必然存在的，因为只有存在才会调用该函数
    translation: translations![key]![idx]!,
    am,
    en,
    am_audio,
    en_audio,
  };
  return noteWordData;
}
/**
 * 纯函数，将PhraseData格式转换为NotePhraseData格式
 */

export function transformPhraseData(data: PhraseData):PhraseNoteData {
  const phrase = data.phrase;
  const phrase_audio = data.phrase_audio;
  const translations = data.translations;
  const example_sentences = data.example_sentences;
  const notePhraseData = {
    phrase,
    phrase_audio,
    translations: translations.join(" <br /> "),
  };
  if (example_sentences == null) return notePhraseData;
  return Object.assign(notePhraseData, {
    example_sentence_1: example_sentences[0]?.example_sentence,
    example_sentence_translation_1:
      example_sentences[0]?.example_sentence_translation,
    example_audio_1: example_sentences[0]?.example_audio,
    example_sentence_2: example_sentences[1]?.example_sentence,
    example_sentence_translation_2:
      example_sentences[1]?.example_sentence_translation,
    example_audio_2: example_sentences[1]?.example_audio,
    example_sentence_3: example_sentences[2]?.example_sentence,
    example_sentence_translation_3:
      example_sentences[2]?.example_sentence_translation,
    example_audio_3: example_sentences[2]?.example_sentence_translation,
  });
}

/**
 * 纯函数，用于将AnkiResponse的status装换为AnkiButtonStatus
 */

function getDerivedStatusFromResponseStatus(responseStatus) {
  //成功
  if (
    _backend_script_anki_utils__WEBPACK_IMPORTED_MODULE_2__.ResponseStatus
      .SuccessStart < responseStatus &&
    responseStatus <
      _backend_script_anki_utils__WEBPACK_IMPORTED_MODULE_2__.ResponseStatus
        .SuccessEnd
  ) {
    return _components_HistoryContainer__WEBPACK_IMPORTED_MODULE_1__.Status
      .Success;
  } //特殊状态

  if (
    responseStatus ===
    _backend_script_anki_utils__WEBPACK_IMPORTED_MODULE_2__.ResponseStatus
      .Duplicate
  )
    return _components_HistoryContainer__WEBPACK_IMPORTED_MODULE_1__.Status
      .Duplicate;
  if (
    responseStatus ===
    _backend_script_anki_utils__WEBPACK_IMPORTED_MODULE_2__.ResponseStatus
      .Forgotten
  )
    return _components_HistoryContainer__WEBPACK_IMPORTED_MODULE_1__.Status
      .Forget;
  if (
    responseStatus ===
    _backend_script_anki_utils__WEBPACK_IMPORTED_MODULE_2__.ResponseStatus
      .AddSuccess
  )
    return _components_HistoryContainer__WEBPACK_IMPORTED_MODULE_1__.Status
      .LearnNow;
  if (
    responseStatus ===
    _backend_script_anki_utils__WEBPACK_IMPORTED_MODULE_2__.ResponseStatus
      .Disconnect
  )
    return _components_HistoryContainer__WEBPACK_IMPORTED_MODULE_1__.Status
      .Disconnect; //错误

  if (
    _backend_script_anki_utils__WEBPACK_IMPORTED_MODULE_2__.ResponseStatus
      .ErrorStart < responseStatus &&
    responseStatus <
      _backend_script_anki_utils__WEBPACK_IMPORTED_MODULE_2__.ResponseStatus
        .ErrorEnd
  ) {
    return _components_HistoryContainer__WEBPACK_IMPORTED_MODULE_1__.Status
      .Error;
  }

  return _components_HistoryContainer__WEBPACK_IMPORTED_MODULE_1__.Status.Error;
}
