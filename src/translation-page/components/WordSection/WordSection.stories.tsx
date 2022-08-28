import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { decorators } from "@/test/decorators/translationPage";
import { WordSection } from "./index";
import { __main__ } from "../../utils";
export default {
  title: "WordSection",
  component: WordSection,
  decorators,
} as ComponentMeta<typeof WordSection>;

const Template: ComponentStory<typeof WordSection> = (args) => (
  <WordSection {...args} />
);

export const Primary = Template.bind({});
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
    {
      part_of_speech: "N-SING",
      definition:
        "If you have <b>a word</b> with someone, you have a short conversation with them.",
      definition_audio:
        "https://dict.youdao.com/dictvoice?audio=If%20you%20have%20a%20word%20with%20someone%2C%20you%20have%20a%20short%20conversation%20with%20them.&le=eng",
      translation: "简短的交谈",
      example_sentences: [
        {
          example_sentence: "I think it's time you had a word with him.",
          example_sentence_translation: "我认为该是你和他谈一谈的时候了。",
          example_audio:
            "https://dict.youdao.com/dictvoice?audio=I%20think%20it's%20time%20you%20had%20a%20word%20with%20him.&le=eng",
        },
      ],
    },
    {
      part_of_speech: "N-COUNT",
      definition:
        "If you offer someone <b>a</b> <b>word of</b> something such as warning, advice, or praise, you warn, advise, or praise them.",
      definition_audio:
        "https://dict.youdao.com/dictvoice?audio=If%20you%20offer%20someone%20a%20word%20of%20something%20such%20as%20warning%2C%20advice%2C%20or%20praise%2C%20you%20warn%2C%20advise%2C%20or%20praise%20them.&le=eng",
      translation: "(警告、建议、赞扬等的) 话语",
      example_sentences: [
        {
          example_sentence:
            "A word of warning. Don't stick too precisely to what it says in the book.",
          example_sentence_translation:
            "一句警告的话。不要对书上所说的抠得太死。",
          example_audio:
            "https://dict.youdao.com/dictvoice?audio=A%20word%20of%20warning.%20Don't%20stick%20too%20precisely%20to%20what%20it%20says%20in%20the%20book.&le=eng",
        },
      ],
    },
    {
      part_of_speech: "N-SING",
      definition:
        "If you say that someone does <b>not</b> hear, understand, or say <b>a word</b>, you are emphasizing that they hear, understand, or say nothing at all.",
      definition_audio:
        "https://dict.youdao.com/dictvoice?audio=If%20you%20say%20that%20someone%20does%20not%20hear%2C%20understand%2C%20or%20say%20a%20word%2C%20you%20are%20emphasizing%20that%20they%20hear%2C%20understand%2C%20or%20say%20nothing%20at%20all.&le=eng",
      translation: "(说的) 话",
      example_sentences: [
        {
          example_sentence: "I can't understand a word she says.",
          example_sentence_translation: "她说的我一个字也听不懂。",
          example_audio:
            "https://dict.youdao.com/dictvoice?audio=I%20can't%20understand%20a%20word%20she%20says.&le=eng",
        },
      ],
    },
    {
      part_of_speech: "N-UNCOUNT",
      definition:
        "If there is <b>word</b> of something, people receive news or information about it.",
      definition_audio:
        "https://dict.youdao.com/dictvoice?audio=If%20there%20is%20word%20of%20something%2C%20people%20receive%20news%20or%20information%20about%20it.&le=eng",
      translation: "消息; 信息",
      example_sentences: [
        {
          example_sentence:
            "There is no word from the authorities on the reported attack.",
          example_sentence_translation:
            "没有任何来自当局的有关攻击报道的消息。",
          example_audio:
            "https://dict.youdao.com/dictvoice?audio=There%20is%20no%20word%20from%20the%20authorities%20on%20the%20reported%20attack.&le=eng",
        },
      ],
    },
    {
      part_of_speech: "N-SING",
      definition:
        "If you give your <b>word</b>, you make a sincere promise to someone.",
      definition_audio:
        "https://dict.youdao.com/dictvoice?audio=If%20you%20give%20your%20word%2C%20you%20make%20a%20sincere%20promise%20to%20someone.&le=eng",
      translation: "诺言",
      example_sentences: [
        {
          example_sentence:
            "...an adult who gave his word the boy would be supervised.",
          example_sentence_translation: "…许诺这个男孩将受到监督的一个成年人。",
          example_audio:
            "https://dict.youdao.com/dictvoice?audio=...an%20adult%20who%20gave%20his%20word%20the%20boy%20would%20be%20supervised.&le=eng",
        },
      ],
    },
    {
      part_of_speech: "N-SING",
      definition:
        "If someone gives <b>the word</b> to do something, they give an order to do it.",
      definition_audio:
        "https://dict.youdao.com/dictvoice?audio=If%20someone%20gives%20the%20word%20to%20do%20something%2C%20they%20give%20an%20order%20to%20do%20it.&le=eng",
      translation: "命令",
      example_sentences: [
        {
          example_sentence:
            "I want nothing said about this until I give the word.",
          example_sentence_translation:
            "没有我的命令, 谁对此都别发表任何议论。",
          example_audio:
            "https://dict.youdao.com/dictvoice?audio=I%20want%20nothing%20said%20about%20this%20until%20I%20give%20the%20word.&le=eng",
        },
      ],
    },
    {
      part_of_speech: "V-T",
      definition:
        "To <b>word</b> something in a particular way means to choose or use particular words to express it.",
      definition_audio:
        "https://dict.youdao.com/dictvoice?audio=To%20word%20something%20in%20a%20particular%20way%20means%20to%20choose%20or%20use%20particular%20words%20to%20express%20it.&le=eng",
      translation: "措辞",
      example_sentences: [
        {
          example_sentence:
            "If I had written the letter, I might have worded it differently.",
          example_sentence_translation: "如果是我写这封信，我可能会措辞不同。",
          example_audio:
            "https://dict.youdao.com/dictvoice?audio=If%20I%20had%20written%20the%20letter%2C%20I%20might%20have%20worded%20it%20differently.&le=eng",
        },
      ],
    },
    {
      part_of_speech: "COMB in ADJ",
      definition: "-worded",
      definition_audio:
        "https://dict.youdao.com/dictvoice?audio=-worded&le=eng",
      translation: "措辞…的",
      example_sentences: [
        {
          example_sentence: "...a strongly-worded statement.",
          example_sentence_translation: "…一份措辞强硬的声明。",
          example_audio:
            "https://dict.youdao.com/dictvoice?audio=...a%20strongly-worded%20statement.&le=eng",
        },
      ],
    },
    {
      part_of_speech: "PHRASE",
      definition:
        "If you say that people consider something to be a <b>dirty word</b>, you mean that they disapprove of it.",
      definition_audio:
        "https://dict.youdao.com/dictvoice?audio=If%20you%20say%20that%20people%20consider%20something%20to%20be%20a%20dirty%20word%2C%20you%20mean%20that%20they%20disapprove%20of%20it.&le=eng",
      translation: "引起反感的词",
      example_sentences: [
        {
          example_sentence: "So many people think feminism is a dirty word.",
          example_sentence_translation:
            "那么多的人认为女权主义是一个令人反感的词。",
          example_audio:
            "https://dict.youdao.com/dictvoice?audio=So%20many%20people%20think%20feminism%20is%20a%20dirty%20word.&le=eng",
        },
      ],
    },
    {
      part_of_speech: "PHRASE",
      definition:
        "If you do something <b>from the word go</b>, you do it from the very beginning of a period of time or situation.",
      definition_audio:
        "https://dict.youdao.com/dictvoice?audio=If%20you%20do%20something%20from%20the%20word%20go%2C%20you%20do%20it%20from%20the%20very%20beginning%20of%20a%20period%20of%20time%20or%20situation.&le=eng",
      translation: "从一开始",
      example_sentences: [
        {
          example_sentence:
            "It's essential you make the right decisions from the word go.",
          example_sentence_translation:
            "重要的是你从一开始就要做出正确的决定。",
          example_audio:
            "https://dict.youdao.com/dictvoice?audio=It's%20essential%20you%20make%20the%20right%20decisions%20from%20the%20word%20go.&le=eng",
        },
      ],
    },
    {
      part_of_speech: "PHRASE",
      definition:
        "You can use <b>in</b> their <b>words</b> or <b>in</b> their <b>own words</b> to indicate that you are reporting what someone said using the exact words that they used.",
      definition_audio:
        "https://dict.youdao.com/dictvoice?audio=You%20can%20use%20in%20their%20words%20or%20in%20their%20own%20words%20to%20indicate%20that%20you%20are%20reporting%20what%20someone%20said%20using%20the%20exact%20words%20that%20they%20used.&le=eng",
      translation: "用某人自己的话说",
      example_sentences: [
        {
          example_sentence:
            "Even the Assistant Secretary of State had to admit that previous policy did not, in his words, produce results.",
          example_sentence_translation:
            "就连这位国务卿助理也不得不承认以前的政策, 用他本人的话说, 没有产生效果。",
          example_audio:
            "https://dict.youdao.com/dictvoice?audio=Even%20the%20Assistant%20Secretary%20of%20State%20had%20to%20admit%20that%20previous%20policy%20did%20not%2C%20in%20his%20words%2C%20produce%20results.&le=eng",
        },
      ],
    },
    {
      part_of_speech: "PHRASE",
      definition:
        "If someone has <b>the last word</b> or <b>the final word</b> in a discussion, argument, or disagreement, they are the one who wins it or who makes the final decision.",
      definition_audio:
        "https://dict.youdao.com/dictvoice?audio=If%20someone%20has%20the%20last%20word%20or%20the%20final%20word%20in%20a%20discussion%2C%20argument%2C%20or%20disagreement%2C%20they%20are%20the%20one%20who%20wins%20it%20or%20who%20makes%20the%20final%20decision.&le=eng",
      translation: "最终意见; 最终决定",
      example_sentences: [
        {
          example_sentence:
            "She does like to have the last word in any discussion.",
          example_sentence_translation: "她的确喜欢在任何讨论中发表最终意见。",
          example_audio:
            "https://dict.youdao.com/dictvoice?audio=She%20does%20like%20to%20have%20the%20last%20word%20in%20any%20discussion.&le=eng",
        },
      ],
    },
    {
      part_of_speech: "PHRASE",
      definition:
        "If news or information passes by <b>word of mouth</b>, people tell it to each other rather than it being printed in written form.",
      definition_audio:
        "https://dict.youdao.com/dictvoice?audio=If%20news%20or%20information%20passes%20by%20word%20of%20mouth%2C%20people%20tell%20it%20to%20each%20other%20rather%20than%20it%20being%20printed%20in%20written%20form.&le=eng",
      translation: "口头",
      example_sentences: [
        {
          example_sentence: "The story has been passed down by word of mouth.",
          example_sentence_translation: "这个故事是口头流传下来的。",
          example_audio:
            "https://dict.youdao.com/dictvoice?audio=The%20story%20has%20been%20passed%20down%20by%20word%20of%20mouth.&le=eng",
        },
      ],
    },
    {
      part_of_speech: "PHRASE",
      definition:
        "You say <b>in other words</b> in order to introduce a different, and usually simpler, explanation or interpretation of something that has just been said.",
      definition_audio:
        "https://dict.youdao.com/dictvoice?audio=You%20say%20in%20other%20words%20in%20order%20to%20introduce%20a%20different%2C%20and%20usually%20simpler%2C%20explanation%20or%20interpretation%20of%20something%20that%20has%20just%20been%20said.&le=eng",
      translation: "换句话说",
      example_sentences: [
        {
          example_sentence:
            "...coronary heart disease, in other words, heart attacks and strokes.",
          example_sentence_translation: "…冠心病，换句话说，心脏病和中风。",
          example_audio:
            "https://dict.youdao.com/dictvoice?audio=...coronary%20heart%20disease%2C%20in%20other%20words%2C%20heart%20attacks%20and%20strokes.&le=eng",
        },
      ],
    },
    {
      part_of_speech: "PHRASE",
      definition:
        "If you say something <b>in</b> your <b>own words</b>, you express it in your own way, without copying or repeating someone else's description.",
      definition_audio:
        "https://dict.youdao.com/dictvoice?audio=If%20you%20say%20something%20in%20your%20own%20words%2C%20you%20express%20it%20in%20your%20own%20way%2C%20without%20copying%20or%20repeating%20someone%20else's%20description.&le=eng",
      translation: "用某人自己的话说",
      example_sentences: [
        {
          example_sentence:
            "Now tell us in your own words about the events of Saturday.",
          example_sentence_translation:
            "现在用你自己的话告诉我们关于星期六的事情。",
          example_audio:
            "https://dict.youdao.com/dictvoice?audio=Now%20tell%20us%20in%20your%20own%20words%20about%20the%20events%20of%20Saturday.&le=eng",
        },
      ],
    },
    {
      part_of_speech: "PHRASE",
      definition:
        'If you say to someone "<b>take</b> my <b>word for it</b>," you mean that they should believe you because you are telling the truth.',
      definition_audio:
        "https://dict.youdao.com/dictvoice?audio=If%20you%20say%20to%20someone%20%22take%20my%20word%20for%20it%2C%22%20you%20mean%20that%20they%20should%20believe%20you%20because%20you%20are%20telling%20the%20truth.&le=eng",
      translation: "相信我的话",
      example_sentences: [
        {
          example_sentence:
            "You'll buy nothing but trouble if you buy that house, take my word for it.",
          example_sentence_translation:
            "你如果买了那幢房子，买到的只有麻烦，相信我的话。",
          example_audio:
            "https://dict.youdao.com/dictvoice?audio=You'll%20buy%20nothing%20but%20trouble%20if%20you%20buy%20that%20house%2C%20take%20my%20word%20for%20it.&le=eng",
        },
      ],
    },
    {
      part_of_speech: "PHRASE",
      definition:
        "If you repeat something <b>word for word</b>, you repeat it exactly as it was originally said or written.",
      definition_audio:
        "https://dict.youdao.com/dictvoice?audio=If%20you%20repeat%20something%20word%20for%20word%2C%20you%20repeat%20it%20exactly%20as%20it%20was%20originally%20said%20or%20written.&le=eng",
      translation: "逐字地",
      example_sentences: [
        {
          example_sentence: "I don't try to memorize speeches word for word.",
          example_sentence_translation: "我不会尝试去逐字地背那些演说。",
          example_audio:
            "https://dict.youdao.com/dictvoice?audio=I%20don't%20try%20to%20memorize%20speeches%20word%20for%20word.&le=eng",
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
      "消息，信息",
      "诺言，承诺",
      "口角，吵架（words）",
      "（警告、建议、赞扬的）话，话语",
      "歌词（words）",
      "一个字（所说或所写的最小量）（a word）",
      "（不同于行动的）言，言语",
      "字（尤指16或32个字节的计算机数据基本单位）",
      "《圣经》，福音（the Word）",
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
      {
        status: 0,
        message: "添加到Anki",
      },
    ],
  },
  updateAnki: () => void 0,
  updateAnkiTranslations: () => void 0,
};
