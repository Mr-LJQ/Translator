import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SentenceSection } from ".";
import {
  sentenceData,
  containerDecorator,
  audioElementDecorator,
} from "@/test";
export default {
  title: "SentenceSection",
  component: SentenceSection,
  decorators: [containerDecorator, audioElementDecorator],
  argTypes: {
    updateAnki: { action: "updateAnki" },
  },
} as ComponentMeta<typeof SentenceSection>;

const Template: ComponentStory<typeof SentenceSection> = (args) => (
  <SentenceSection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  ...sentenceData,
  ankiButtonInfo: {
    status: 0,
    message: "添加到Anki",
  },
};
