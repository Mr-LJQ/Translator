import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { decorators } from "@/test/decorators/translationPage";
import { PhraseSection } from "./index";
import { __main__ } from "../../utils";
export default {
  title: "PhraseSection",
  component: PhraseSection,
  decorators,
} as ComponentMeta<typeof PhraseSection>;

const Template: ComponentStory<typeof PhraseSection> = (args) => (
  <PhraseSection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
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
  ankiButtonInfo: {
    status: 0,
    message: "添加到Anki",
  },
  updateAnki: () => void 0,
};
