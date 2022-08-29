import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SentenceSection } from ".";
import { audioDecorators } from "@/test";
export default {
  title: "SentenceSection",
  component: SentenceSection,
  decorators: audioDecorators,
  argTypes: {
    updateAnki: { action: "updateAnki" },
  },
} as ComponentMeta<typeof SentenceSection>;

const Template: ComponentStory<typeof SentenceSection> = (args) => (
  <SentenceSection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  sentence: "I want grits with my eggs instead of hash browns.",
  type: "SENTENCE",
  sentence_translation: "我想在鸡蛋里加玉米粉，而不是薯饼。",
  sentence_audio:
    "https://dict.youdao.com/dictvoice?audio=I%20want%20grits%20with%20my%20eggs%20instead%20of%20hash%20browns.&le=eng",
  ankiButtonInfo: {
    status: 0,
    message: "添加到Anki",
  },
};
