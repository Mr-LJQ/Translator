import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { within, waitFor } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { Messenger } from "@/utils";
import { Command } from "@/configuration";
import { wordData, containerDecorator, phraseData, sentenceData } from "@/test";
import { View } from ".";
export default {
  title: "View",
  component: View,
  argTypes: {
    callback: { action: "callback" },
  },
  decorators: [containerDecorator],
} as ComponentMeta<typeof View>;

const Template: ComponentStory<typeof View> = () => {
  return <View />;
};

export const Primary = Template.bind({});

Primary.play = async ({ canvasElement, args }) => {
  const { install, postMessage } = new Messenger({
    self: window,
    target: window,
  });
  install();
  const canvas = within(canvasElement);
  postMessage(
    Command.ShowTranslation,
    wordData,
    //@ts-ignore 在 argTypes 中声明，由action添加
    args.callback
  );
  await waitFor(() => {
    expect(canvas.getByRole("heading")).toHaveTextContent(wordData.word);
  });
  postMessage(
    Command.ShowTranslation,
    phraseData,
    //@ts-ignore 在 argTypes 中声明，由action添加
    args.callback
  );
  await waitFor(() => {
    expect(canvas.getByRole("heading")).toHaveTextContent(phraseData.phrase);
  });
  postMessage(
    Command.ShowTranslation,
    sentenceData,
    //@ts-ignore 在 argTypes 中声明，由action添加
    args.callback
  );
  await waitFor(() => {
    expect(canvas.getByRole("heading")).toHaveTextContent(
      sentenceData.sentence
    );
  });
};
