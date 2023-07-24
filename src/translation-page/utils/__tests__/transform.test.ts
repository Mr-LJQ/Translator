import {
  transformWordData,
  transformPhraseData,
  transformTranslations,
  transformAnkiResponseStatus,
} from "../transform";
import { wordData, phraseData } from "@/test";
import { AnkiResponseStatus } from "@/anki";
import { Status } from "../../types";
test("转换定义类单词数据", () => {
  expect(transformWordData(wordData, 0)).toEqual({
    am: "美[wɜːrd]",
    am_audio: "https://dict.youdao.com/dictvoice?audio=word&type=2",
    definition:
      "A <b>word</b> is a single unit of language that can be represented in writing or speech. In English, a word has a space on either side of it when it is written.",
    definition_audio:
      "https://dict.youdao.com/dictvoice?audio=A%20word%20is%20a%20single%20unit%20of%20language%20that%20can%20be%20represented%20in%20writing%20or%20speech.%20In%20English%2C%20a%20word%20has%20a%20space%20on%20either%20side%20of%20it%20when%20it%20is%20written.&le=eng",
    en: "英[wɜːd]",
    en_audio: "https://dict.youdao.com/dictvoice?audio=word&type=1",
    example_audio:
      "https://dict.youdao.com/dictvoice?audio=The%20words%20stood%20out%20clearly%20on%20the%20page.&le=eng",
    example_sentence: "The words stood out clearly on the page.",
    example_sentence_translation: "这些单词清晰地呈现在页面上。",
    form: undefined,
    part_of_speech: "N-COUNT",
    star_amount: "★★★★★",
    translation: "单词",
    word: "word",
  });
});
test("转换非定义类单词数据", () => {
  expect(transformTranslations(wordData, "n.", 0)).toEqual({
    am: "美[wɜːrd]",
    am_audio: "https://dict.youdao.com/dictvoice?audio=word&type=2",
    en: "英[wɜːd]",
    en_audio: "https://dict.youdao.com/dictvoice?audio=word&type=1",
    form: undefined,
    part_of_speech: "n.",
    star_amount: "★★★★★",
    translation: " 字，词，单词",
    word: "word",
  });
});
test("转换短语数据", () => {
  expect(transformPhraseData(phraseData)).toEqual({
    example_audio_1:
      "https://dict.youdao.com/dictvoice?audio=I%20want%20grits%20with%20my%20eggs%20instead%20of%20hash%20browns.&le=eng",
    example_audio_2:
      "https://dict.youdao.com/dictvoice?audio=He%20builds%20furniture%20using%20wooden%20pegs%20instead%20of%20nails.&le=eng",

    example_audio_3:
      "https://dict.youdao.com/dictvoice?audio=He%20put%20a%20plus%20instead%20of%20a%20minus.&le=eng",
    example_sentence_1:
      "I want grits with my eggs <b>instead</b><b> </b><b>of</b> hash browns.",
    example_sentence_2:
      "He builds furniture using wooden pegs <b>instead</b><b> </b><b>of</b> nails.",
    example_sentence_3:
      "He put a plus <b>instead</b><b> </b><b>of</b> a minus.",
    example_sentence_translation_1: "我想要粗玉米粉加鸡蛋而不是土豆煎饼。",
    example_sentence_translation_2: "他用木钉而不是铁钉制作家具。",
    example_sentence_translation_3: "他填了个加号而不是减号。",
    phrase: "instead of",
    phrase_audio: "https://dict.youdao.com/dictvoice?audio=instead%20of",
    translations: "代替；而不是…",
  });
});
test("转换为Status", () => {
  expect(transformAnkiResponseStatus(AnkiResponseStatus.Error)).toBe(
    Status.Error
  );
  expect(transformAnkiResponseStatus(AnkiResponseStatus.Success)).toBe(
    Status.Success
  );
  expect(transformAnkiResponseStatus(AnkiResponseStatus.Forgotten)).toBe(
    Status.Forgotten
  );
  expect(transformAnkiResponseStatus(AnkiResponseStatus.Duplicate)).toBe(
    Status.Duplicate
  );
  expect(transformAnkiResponseStatus(AnkiResponseStatus.Disconnect)).toBe(
    Status.Disconnect
  );
  expect(transformAnkiResponseStatus(AnkiResponseStatus.ConfigError)).toBe(
    Status.ConfigError
  );
  expect(transformAnkiResponseStatus(AnkiResponseStatus.FirstAddSuccess)).toBe(
    Status.LearnNow
  );
});
