import {
  WordFields,
  PhraseFields,
  SentenceFields,
  CommonConfig,
} from "@/extensions-api";
const WORD_FIELDS: WordFields = {
  definition: "定义",
  word: "单词",
  translation: "翻译",
  part_of_speech: "词性",
  definition_audio: "定义音频",
  am: "美国音标",
  en: "英国音标",
  am_audio: "美国音频",
  en_audio: "英国音频",
  star_amount: "出现频率",
  example_audio: "例句音频",
  example_sentence: "例句原文",
  example_sentence_translation: "例句翻译",
};

const PHRASE_FIELDS: PhraseFields = {
  phrase: "短语词组",
  phrase_audio: "短语音频",
  translations: "短语翻译",
  example_audio_1: "例句1音频",
  example_audio_2: "例句2音频",
  example_audio_3: "例句3音频",
  example_sentence_1: "例句1原文",
  example_sentence_2: "例句2原文",
  example_sentence_3: "例句3原文",
  example_sentence_translation_1: "例句1翻译",
  example_sentence_translation_2: "例句2翻译",
  example_sentence_translation_3: "例句3翻译",
};

const SENTENCE_FIELDS: SentenceFields = {
  sentence: "句子原文",
  sentence_audio: "句子音频",
  sentence_translation: "句子翻译",
};

const CARD_INFO_FIELDS: CommonConfig = {
  deckName: "牌组名称",
  modelName: "模型名称",
  tags: "卡片标签",
};

const ANKI_CONNECTION_FIELDS = {
  ankiConnectionMethod: "连接方法",
  ankiConnectionURL: "连接URL",
};

if (process.env.NODE_ENV === "development") {
  Object.freeze(WORD_FIELDS);
  Object.freeze(PHRASE_FIELDS);
  Object.freeze(SENTENCE_FIELDS);
  Object.freeze(CARD_INFO_FIELDS);
  Object.freeze(ANKI_CONNECTION_FIELDS);
}

export {
  WORD_FIELDS,
  PHRASE_FIELDS,
  SENTENCE_FIELDS,
  CARD_INFO_FIELDS,
  ANKI_CONNECTION_FIELDS,
};
