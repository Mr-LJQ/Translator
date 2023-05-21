import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import { Messenger } from "@/utils";
import { Command } from "@/configuration";
import {
  wordData,
  errorData,
  phraseData,
  sentenceData,
  cacographyData,
  containerDecorator,
} from "@/test";
import { View } from ".";

const renderData = {
  wordData,
  phraseData,
  sentenceData,
  errorData,
  cacographyData,
};
export default {
  title: "View",
  component: View,
  argTypes: {
    hiddenChinese: {
      control: "boolean",
    },
    data: {
      control: {
        type: "select",
      },
      options: Object.keys(renderData),
      mapping: renderData,
    },
  },
  decorators: [
    containerDecorator,
    (Story, { args }) => {
      //@ts-ignore
      const { hiddenChinese, data } = args;
      postMessage(Command.HiddenChinese, hiddenChinese);
      postMessage(Command.ShowTranslation, data, () => void 0);
      return <Story />;
    },
  ],
} as Meta<typeof View>;

type Story = StoryObj<typeof View>;

const { install, postMessage } = new Messenger({
  self: window,
  target: window,
});
install();

export const WordSection: Story = {
  args: {
    hiddenChinese: false,
  },
};
