import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import { HiddenChinese } from "../Context";
import { WordSection } from ".";
import { createHistory } from "../../utils";
import { containerDecorator, audioElementDecorator, wordData } from "@/test";

export default {
  title: "WordSection",
  component: WordSection,
  decorators: [
    containerDecorator,
    audioElementDecorator,
    (Story, { parameters }) => {
      return (
        <HiddenChinese.Provider value={parameters.hiddenChinese}>
          <Story />
        </HiddenChinese.Provider>
      );
    },
  ],
  args: {
    ...wordData,
    ankiButtonInfoObject: createHistory(wordData).ankiButtonInfoObject,
  },
  argTypes: {
    updateAnki: { action: "updateAnki" },
    updateAnkiTranslations: { action: "updateAnkiTranslations" },
  },
} as Meta<typeof WordSection>;

type Story = StoryObj<typeof WordSection>;

export const Primary: Story = {
  parameters: {
    hiddenChinese: false,
  },
};

export const Hidden: Story = {
  parameters: {
    hiddenChinese: true,
  },
};
