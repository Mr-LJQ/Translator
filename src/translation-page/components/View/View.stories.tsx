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
export default {
  title: "View",
  component: View,
  decorators: [containerDecorator],
} as ComponentMeta<typeof View>;

const Template: ComponentStory<typeof View> = () => {
  return <View />;
};

export const WordSection = Template.bind({});

WordSection.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const { install, uninstall, postMessage } = new Messenger({
    self: window,
    target: window,
  });
  const callback = jest.fn();
  install();
  postMessage(Command.ShowTranslation, wordData, callback);
  await waitFor(() => {
    expect(canvas.getByRole("heading")).toHaveTextContent(wordData.word);
  });
  await waitFor(() => {
    expect(callback).toBeCalled();
  });
  uninstall();
};

export const PhraseSection = Template.bind({});

PhraseSection.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const { install, uninstall, postMessage } = new Messenger({
    self: window,
    target: window,
  });
  install();
  const callback = jest.fn();
  postMessage(Command.ShowTranslation, phraseData, callback);
  await waitFor(() => {
    expect(canvas.getByRole("heading")).toHaveTextContent(phraseData.phrase);
  });
  await waitFor(() => {
    expect(callback).toBeCalled();
  });
  uninstall();
};

export const SentenceSection = Template.bind({});

SentenceSection.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const { install, uninstall, postMessage } = new Messenger({
    self: window,
    target: window,
  });
  install();
  const callback = jest.fn();
  postMessage(Command.ShowTranslation, sentenceData, callback);
  await waitFor(() => {
    expect(canvas.getByRole("heading")).toHaveTextContent(
      sentenceData.sentence
    );
  });
  await waitFor(() => {
    expect(callback).toBeCalled();
  });
  uninstall();
};

export const ErrorSection = Template.bind({});

ErrorSection.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const { install, uninstall, postMessage } = new Messenger({
    self: window,
    target: window,
  });
  install();
  const callback = jest.fn();
  postMessage(Command.ShowTranslation, errorData, callback);
  await waitFor(() => {
    expect(
      canvas.getByRole("button", { name: "再次查询" })
    ).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(callback).toBeCalled;
  });
  uninstall();
};

export const cacographySection = Template.bind({});

cacographySection.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const { install, uninstall, postMessage } = new Messenger({
    self: window,
    target: window,
  });
  install();
  const callback = jest.fn();
  postMessage(Command.ShowTranslation, cacographyData, callback);
  await waitFor(() => {
    expect(
      canvas.getByRole("heading", { name: "你要找的是否是：" })
    ).toBeInTheDocument();
  });
  await waitFor(() => {
    expect(callback).toBeCalled;
  });
  uninstall();
};

export const History = Template.bind({});

History.play = async ({ canvasElement }) => {
  const { install, uninstall, postMessage } = new Messenger({
    self: window,
    target: window,
  });
  install();
  const callback = jest.fn();
  const canvas = within(canvasElement);
  postMessage(Command.ShowTranslation, errorData, callback);
  await waitFor(() => {
    expect(
      canvas.getByRole("button", { name: "再次查询" })
    ).toBeInTheDocument();
  });
  postMessage(Command.ShowTranslation, phraseData, callback);
  await waitFor(() => {
    expect(canvas.getByRole("heading")).toHaveTextContent(phraseData.phrase);
  });
  uninstall();
};
