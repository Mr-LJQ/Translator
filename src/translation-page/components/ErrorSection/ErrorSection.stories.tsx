import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { userEvent, within, waitFor } from "@storybook/testing-library";
import { expect, jest } from "@storybook/jest";
import { Command } from "@/configuration/command";
import { ErrorSection } from ".";
import { audioDecorators } from "@/test";
import { MessengerContext } from "../Context";

const onMessageMocked = jest.fn<any, any[]>();
const postMessageMocked = jest.fn<any, any[]>();
export default {
  title: "ErrorSection",
  component: ErrorSection,
  decorators: audioDecorators.concat([
    (Story) => {
      return (
        <MessengerContext.Provider
          value={{ postMessage: postMessageMocked, onMessage: onMessageMocked }}
        >
          <Story />
        </MessengerContext.Provider>
      );
    },
  ]),
} as ComponentMeta<typeof ErrorSection>;

const Template: ComponentStory<typeof ErrorSection> = (args) => (
  <ErrorSection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  queryText: "word",
  message: "网络连接异常，请重新尝试。",
};
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const againButton = canvas.getByRole("button", { name: "再次查询" });
  await userEvent.click(againButton);
  expect(postMessageMocked).toBeCalledWith(Command.TranslateText, "word");
  await waitFor(() => {
    expect(canvas.getByRole("img", { name: "loading" })).toBeInTheDocument();
  });
  postMessageMocked.mockClear();
};

export const Cacography = Template.bind({});
Cacography.args = {
  possibleSpelling: ["word", "worded"],
};

Cacography.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const getListItem = (name: string) => {
    return canvas.getByText(name, { selector: "li" });
  };
  const firstWord = getListItem("word");
  await userEvent.click(firstWord);
  expect(postMessageMocked).toBeCalledWith(Command.TranslateText, "word");
  const secondWord = getListItem("worded");
  await userEvent.click(secondWord);
  expect(postMessageMocked).toBeCalledWith(Command.TranslateText, "worded");
  expect(postMessageMocked).toBeCalledTimes(2);
  postMessageMocked.mockClear();
};
