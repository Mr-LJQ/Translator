import { WordData, PhraseData, ErrorData, SentenceData } from "@/dictionary";
import { freezeAll } from "../helper/freeze";
const wordData: WordData = {
  word: "word",
  star_amount: 5,
  type: "WORD",
  phonetic: {
    am: "美[wɜːrd]",
    en: "英[wɜːd]",
    am_audio: "https://dict.youdao.com/dictvoice?audio=word&type=2",
    en_audio: "https://dict.youdao.com/dictvoice?audio=word&type=1",
  },
  translationList: [
    {
      part_of_speech: "N-COUNT",
      definition:
        "A <b>word</b> is a single unit of language that can be represented in writing or speech. In English, a word has a space on either side of it when it is written.",
      definition_audio:
        "https://dict.youdao.com/dictvoice?audio=A%20word%20is%20a%20single%20unit%20of%20language%20that%20can%20be%20represented%20in%20writing%20or%20speech.%20In%20English%2C%20a%20word%20has%20a%20space%20on%20either%20side%20of%20it%20when%20it%20is%20written.&le=eng",
      translation: "单词",
      example_sentences: [
        {
          example_sentence: "The words stood out clearly on the page.",
          example_sentence_translation: "这些单词清晰地呈现在页面上。",
          example_audio:
            "https://dict.youdao.com/dictvoice?audio=The%20words%20stood%20out%20clearly%20on%20the%20page.&le=eng",
        },
        {
          example_sentence:
            'The word "ginseng" comes from the Chinese word "Shen-seng."',
          example_sentence_translation: "这个词来自中文的“人参”。",
          example_audio:
            "https://dict.youdao.com/dictvoice?audio=The%20word%20%22ginseng%22%20comes%20from%20the%20Chinese%20word%20%22Shen-seng.%22&le=eng",
        },
      ],
    },
    {
      part_of_speech: "N-PLURAL",
      definition: "Someone's <b>words</b> are what they say or write.",
      definition_audio:
        "https://dict.youdao.com/dictvoice?audio=Someone's%20words%20are%20what%20they%20say%20or%20write.&le=eng",
      translation: "话",
      example_sentences: [
        {
          example_sentence: "I was devastated when her words came true.",
          example_sentence_translation: "她的话应验时，我感到震惊。",
          example_audio:
            "https://dict.youdao.com/dictvoice?audio=I%20was%20devastated%20when%20her%20words%20came%20true.&le=eng",
        },
      ],
    },
    {
      part_of_speech: "N-PLURAL",
      definition:
        "<b>The</b> <b>words</b> of a song consist of the text that is sung, in contrast to the music that is played.",
      definition_audio:
        "https://dict.youdao.com/dictvoice?audio=The%20words%20of%20a%20song%20consist%20of%20the%20text%20that%20is%20sung%2C%20in%20contrast%20to%20the%20music%20that%20is%20played.&le=eng",
      translation: "歌词",
      example_sentences: [
        {
          example_sentence: "Can you hear the words on the album?",
          example_sentence_translation: "你能听清那张专集里的歌词吗？",
          example_audio:
            "https://dict.youdao.com/dictvoice?audio=Can%20you%20hear%20the%20words%20on%20the%20album%3F&le=eng",
        },
      ],
    },
  ],
  translations: {
    "n.": [
      " 字，词，单词",
      "（某人说的）话，言语（words）",
      "简短的交谈，谈话",
      "命令，指示",
    ],
    "v.": [" 措辞，用词"],
    "int.": [" <美> （表示接受或同意别人刚说的话）就是，说得对"],
    "": ["【名】 （Word）（英）沃德（人名）"],
  },
};

const phraseData: PhraseData = {
  phrase: "instead of",
  translations: ["代替；而不是…"],
  phrase_audio: "https://dict.youdao.com/dictvoice?audio=instead%20of",
  type: "PHRASE",
  example_sentences: [
    {
      example_audio:
        "https://dict.youdao.com/dictvoice?audio=I%20want%20grits%20with%20my%20eggs%20instead%20of%20hash%20browns.&le=eng",
      example_sentence:
        "I want grits with my eggs <b>instead</b><b> </b><b>of</b> hash browns.",
      example_sentence_translation: "我想要粗玉米粉加鸡蛋而不是土豆煎饼。",
    },
    {
      example_audio:
        "https://dict.youdao.com/dictvoice?audio=He%20builds%20furniture%20using%20wooden%20pegs%20instead%20of%20nails.&le=eng",
      example_sentence:
        "He builds furniture using wooden pegs <b>instead</b><b> </b><b>of</b> nails.",
      example_sentence_translation: "他用木钉而不是铁钉制作家具。",
    },
    {
      example_audio:
        "https://dict.youdao.com/dictvoice?audio=He%20put%20a%20plus%20instead%20of%20a%20minus.&le=eng",
      example_sentence:
        "He put a plus <b>instead</b><b> </b><b>of</b> a minus.",
      example_sentence_translation: "他填了个加号而不是减号。",
    },
  ],
};

const errorData: ErrorData = {
  type: "ERROR",
  cache: false,
  queryText: "word",
  message: "网络连接异常，请重新尝试。",
};

const cacographyData: ErrorData = {
  type: "ERROR",
  cache: true,
  possibleSpelling: ["word", "worded"],
};

const sentenceData: SentenceData = {
  sentence: "I want grits with my eggs instead of hash browns.",
  type: "SENTENCE",
  sentence_translation: "我想在鸡蛋里加玉米粉，而不是薯饼。",
  sentence_audio:
    "https://dict.youdao.com/dictvoice?audio=I%20want%20grits%20with%20my%20eggs%20instead%20of%20hash%20browns.&le=eng",
};

freezeAll(wordData);
freezeAll(phraseData);
freezeAll(sentenceData);
freezeAll(errorData);
freezeAll(cacographyData);

export { wordData, phraseData, sentenceData, errorData, cacographyData };
