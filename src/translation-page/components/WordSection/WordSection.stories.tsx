import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { HiddenChinese } from "../Context";
import { WordSection } from ".";
import { __main__ } from "../../utils";
import { audioDecorators } from "@/test";
export default {
  title: "WordSection",
  component: WordSection,
  decorators: audioDecorators,
  argTypes: {
    updateAnki: { action: "updateAnki" },
    updateAnkiTranslations: { action: "updateAnkiTranslations" },
  },
} as ComponentMeta<typeof WordSection>;

const createTemplate = function (hiddenChinese: boolean) {
  return function Template(args) {
    return (
      <HiddenChinese.Provider value={hiddenChinese}>
        <WordSection {...args} />
      </HiddenChinese.Provider>
    );
  } as ComponentStory<typeof WordSection>;
};

export const Primary = createTemplate(false);
Primary.args = {
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
  ankiButtonInfoObject: {
    "n.": [
      {
        status: 0,
        message: "添加到Anki",
      },
      {
        status: 0,
        message: "添加到Anki",
      },
      {
        status: 0,
        message: "添加到Anki",
      },
      {
        status: 0,
        message: "添加到Anki",
      },
    ],
    "v.": [
      {
        status: 0,
        message: "添加到Anki",
      },
    ],
    "int.": [
      {
        status: 0,
        message: "添加到Anki",
      },
    ],
    "": [
      {
        status: 0,
        message: "添加到Anki",
      },
    ],
    [__main__]: [
      {
        status: 0,
        message: "添加到Anki",
      },
      {
        status: 0,
        message: "添加到Anki",
      },
      {
        status: 0,
        message: "添加到Anki",
      },
    ],
  },
};

export const Hidden = createTemplate(true);
Hidden.args = Primary.args;
