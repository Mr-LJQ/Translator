import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { DisplayContainer } from ".";
import { __main__, createHistory } from "../../utils";
import { Primary as ErrorPrimary } from "../ErrorSection/ErrorSection.stories";
import { Primary as PhrasePrimary } from "../PhraseSection/PhraseSection.stories";
import { Primary as SentencePrimary } from "../SentenceSection/SentenceSection.stories";
import {
  audioElementDecorator,
  containerDecorator,
  hiddenChineseDecorator,
  errorData,
  wordData,
  phraseData,
  sentenceData,
} from "@/test";
import { MessengerContext } from "../Context";

const onMessageMocked = jest.fn<any, any[]>();
const postMessageMocked = jest.fn<any, any[]>();

export default {
  title: "DisplayContainer",
  component: DisplayContainer,
  decorators: [containerDecorator, audioElementDecorator],
  argTypes: {
    updateAnki: { action: "updateAnki" },
  },
} as Meta<typeof DisplayContainer>;

type Story = StoryObj<typeof DisplayContainer>;

export const Empty: Story = {};

export const ErrorSection: Story = {};
ErrorSection.args = {
  data: errorData,
};
ErrorSection.decorators = [
  (Story) => {
    return (
      <MessengerContext.Provider
        value={{ postMessage: postMessageMocked, onMessage: onMessageMocked }}
      >
        <Story />
      </MessengerContext.Provider>
    );
  },
];

export const WordSection: Story = {};
WordSection.args = {
  data: wordData,
  ankiButtonInfoObject: createHistory(wordData).ankiButtonInfoObject,
};

WordSection.decorators = [hiddenChineseDecorator];

export const PhraseSection: Story = {};
{
  const { ankiButtonInfo } = PhrasePrimary.args!;
  PhraseSection.args = {
    data: phraseData,
    ankiButtonInfoObject: {
      [__main__]: [ankiButtonInfo!],
    },
  };
}

export const SentenceSection: Story = {};
{
  const { ankiButtonInfo } = SentencePrimary.args!;
  SentenceSection.args = {
    data: sentenceData,
    ankiButtonInfoObject: {
      [__main__]: [ankiButtonInfo!],
    },
  };
}

export const Loading: Story = {};
Loading.args = {
  //@ts-ignore 说明 Loading 与 data 无关
  data: {},
  isLoading: true,
};
