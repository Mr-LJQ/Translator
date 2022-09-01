import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { expect, jest } from "@storybook/jest";
import { userEvent, within } from "@storybook/testing-library";
import { AnkiButton } from ".";
import { Status } from "../../types";

const mockFn = jest.fn();

export default {
  title: "AnkiButton",
  component: AnkiButton,
  args: {
    updateAnki: mockFn,
  },
  parameters: {
    pseudo: {
      hover: ["button:nth-of-type(2)"],
      focus: ["button:nth-of-type(3)"],
    },
  },
} as ComponentMeta<typeof AnkiButton>;

const Template: ComponentStory<typeof AnkiButton> = (args) => {
  return (
    <>
      <AnkiButton {...args} />
      <br />
      <AnkiButton {...args} />
      <br />
      <AnkiButton {...args} />
    </>
  );
};

export const Success = Template.bind({});
Success.args = {
  status: Status.Success,
  message: "Success",
};
Success.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  userEvent.click(canvas.getAllByRole("button")[2]!);
  expect(mockFn).toBeCalledTimes(0);
  mockFn.mockClear()
};

export const Add = Template.bind({});
Add.args = {
  status: Status.Add,
  message: "Add",
};
Add.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  userEvent.click(canvas.getAllByRole("button")[2]!);
  expect(mockFn).toBeCalledTimes(1);
  mockFn.mockClear()
};

export const Loading = Template.bind({});
Loading.args = {
  status: Status.Loading,
  message: "Loading",
};
Loading.play = Success.play;

export const Error = Template.bind({});
Error.args = {
  status: Status.Error,
  message: "Error",
};
Error.play = Add.play;

export const Disconnect = Template.bind({});
Disconnect.args = {
  status: Status.Disconnect,
  message: "Disconnect",
};
Disconnect.play = Add.play;

export const ConfigError = Template.bind({});
ConfigError.args = {
  status: Status.ConfigError,
  message: "ConfigError",
};
ConfigError.play = Add.play;

export const Duplicate = Template.bind({});
Duplicate.args = {
  status: Status.Duplicate,
  message: "Duplicate",
  cardIds: [123, 456, 789],
};
Duplicate.play = Add.play;

export const Forgotten = Template.bind({});
Forgotten.args = {
  status: Status.Forgotten,
  message: "Forgotten",
  cardIds: [4399],
};
Forgotten.play = Add.play;

export const LearnNow = Template.bind({});
LearnNow.args = {
  status: Status.LearnNow,
  message: "LearnNow",
  cardIds: [9527],
};
LearnNow.play = Add.play;