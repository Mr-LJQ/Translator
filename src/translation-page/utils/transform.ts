import { Status } from "../types";
import { AnkiResponseStatus } from "@/anki";
import type { WordData, PhraseData } from "@/dictionary";
import type { WordNoteData, PhraseNoteData } from "../types";

/**
 * 纯函数，用于处理有定义的单词翻译
 */
export function transformWordData(
  wordData: WordData,
  index: number
): WordNoteData {
  const { word, phonetic, star_amount, translationList } = wordData;
  const { am, en, am_audio, en_audio } = phonetic;
  //之所以必定有，是这个函数是用户在看到 translationList 存在后添加是调用的
  const {
    definition,
    translation,
    part_of_speech,
    definition_audio,
    example_sentences,
  } = translationList![index]!;

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
  const { star_amount, phonetic, word, translations } = wordData;
  const { am, en, am_audio, en_audio } = phonetic;

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

export function transformPhraseData(data: PhraseData): PhraseNoteData {
  const { phrase, phrase_audio, translations, example_sentences } = data;
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

export function transformAnkiResponseStatus(status: AnkiResponseStatus) {
  switch (status) {
    case AnkiResponseStatus.Success: {
      return Status.Success;
    }
    case AnkiResponseStatus.Forgotten: {
      return Status.Forgotten;
    }
    case AnkiResponseStatus.Duplicate: {
      return Status.Duplicate;
    }
    case AnkiResponseStatus.Disconnect: {
      return Status.Disconnect;
    }
    case AnkiResponseStatus.ConfigError: {
      return Status.ConfigError;
    }
    case AnkiResponseStatus.FirstAddSuccess: {
      return Status.LearnNow;
    }
    case AnkiResponseStatus.Error:
    case AnkiResponseStatus.OldVersion:
    case AnkiResponseStatus.UnexpectedError:
      return Status.Error;
    default: {
      if (__DEV__) {
        throw new Error(`未添加对${AnkiResponseStatus[status]} 的转换`);
      }
    }
  }
}
