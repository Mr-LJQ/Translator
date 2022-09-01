import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  userEvent,
  within,
  waitFor,
  waitForElementToBeRemoved,
} from "@storybook/testing-library";
import { ErrorSection } from ".";
import { MessengerContext } from "../Context";
import { expect, jest } from "@storybook/jest";
import { Command } from "@/configuration/command";
import { containerDecorator, cacographyData, errorData } from "@/test";

const onMessageMocked = jest.fn<any, any[]>();
const postMessageMocked = jest.fn<any, any[]>();
export default {
  title: "ErrorSection",
  component: ErrorSection,
  decorators: [containerDecorator],
} as ComponentMeta<typeof ErrorSection>;

const Template: ComponentStory<typeof ErrorSection> = (args) => (
  <ErrorSection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  ...errorData,
};
Primary.decorators = [
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
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const againButton = canvas.getByRole("button", { name: "再次查询" });
  await userEvent.click(againButton);
  expect(postMessageMocked).toBeCalledWith(Command.TranslateText, "word");
  await waitFor(() => {
    expect(canvas.getByRole("img", { name: "loading" })).toBeInTheDocument();
  });
  await waitForElementToBeRemoved(
    () => {
      return canvas.queryByRole("img", { name: "loading" });
    },
    { timeout: 3000 }
  );
  postMessageMocked.mockClear();
};

export const Cacography = Template.bind({});
Cacography.args = {
  ...cacographyData,
};
Cacography.decorators = Primary.decorators;
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
