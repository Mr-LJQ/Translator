import { StoryObj, Meta } from "@storybook/react";
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
} as Meta<typeof SentenceSection>;

type Story = StoryObj<typeof SentenceSection>;

export const Primary: Story = {};
Primary.args = {
  ...sentenceData,
  ankiButtonInfo: {
    status: 0,
    message: "添加到Anki",
  },
};
