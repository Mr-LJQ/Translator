import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PhraseSection } from ".";
import { containerDecorator, audioElementDecorator, phraseData } from "@/test";
export default {
  title: "PhraseSection",
  component: PhraseSection,
  decorators: [containerDecorator, audioElementDecorator],
  argTypes: {
    updateAnki: { action: "updateAnki" },
  },
} as ComponentMeta<typeof PhraseSection>;

const Template: ComponentStory<typeof PhraseSection> = (args) => (
  <PhraseSection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  ...phraseData,
  ankiButtonInfo: {
    status: 0,
    message: "添加到Anki",
  },
};
