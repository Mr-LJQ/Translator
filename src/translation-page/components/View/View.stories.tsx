import React from "react";
import { expect, jest } from "@storybook/jest";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { within, waitFor } from "@storybook/testing-library";
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
  decorators: [containerDecorator],
} as ComponentMeta<typeof View>;

const { install, postMessage } = new Messenger({
  self: window,
  target: window,
});
install();

const Template: ComponentStory<typeof View> = (args) => {
  //@ts-ignore
  const { hiddenChinese, data } = args;
  postMessage(Command.HiddenChinese, hiddenChinese);
  postMessage(Command.ShowTranslation, data, () => void 0);
  return <View />;
};

export const WordSection = Template.bind({});
WordSection.args = {
  hiddenChinese: false,
};
