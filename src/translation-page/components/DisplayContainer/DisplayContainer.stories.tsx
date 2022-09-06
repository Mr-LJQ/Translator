import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
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

export default {
  title: "DisplayContainer",
  component: DisplayContainer,
  decorators: [containerDecorator, audioElementDecorator],
  argTypes: {
    updateAnki: { action: "updateAnki" },
  },
} as ComponentMeta<typeof DisplayContainer>;

const Template: ComponentStory<typeof DisplayContainer> = (args) => (
  <DisplayContainer {...args} />
);

export const Empty = Template.bind({});
Empty.args = {};

export const ErrorSection = Template.bind({});
ErrorSection.args = {
  data: errorData,
};
ErrorSection.decorators = ErrorPrimary.decorators;

export const WordSection = Template.bind({});
WordSection.args = {
  data: wordData,
  ankiButtonInfoObject: createHistory(wordData).ankiButtonInfoObject,
};

WordSection.decorators = [hiddenChineseDecorator];

export const PhraseSection = Template.bind({});
{
  const { ankiButtonInfo } = PhrasePrimary.args!;
  PhraseSection.args = {
    data: phraseData,
    ankiButtonInfoObject: {
      [__main__]: [ankiButtonInfo!],
    },
  };
}

export const SentenceSection = Template.bind({});
{
  const { ankiButtonInfo } = SentencePrimary.args!;
  SentenceSection.args = {
    data: sentenceData,
    ankiButtonInfoObject: {
      [__main__]: [ankiButtonInfo!],
    },
  };
}

export const Loading = Template.bind({});
Loading.args = {
  //@ts-ignore 说明 Loading 与 data 无关
  data: {},
  isLoading: true,
};
