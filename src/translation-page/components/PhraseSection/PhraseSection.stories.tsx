import { StoryObj, Meta } from "@storybook/react";
import { PhraseSection } from ".";
import { containerDecorator, audioElementDecorator, phraseData } from "@/test";
export default {
  title: "PhraseSection",
  component: PhraseSection,
  decorators: [containerDecorator, audioElementDecorator],
  argTypes: {
    updateAnki: { action: "updateAnki" },
  },
} as Meta<typeof PhraseSection>;

type Story = StoryObj<typeof PhraseSection>;

export const Primary: Story = {};
Primary.args = {
  ...phraseData,
  ankiButtonInfo: {
    status: 0,
    message: "添加到Anki",
  },
};
