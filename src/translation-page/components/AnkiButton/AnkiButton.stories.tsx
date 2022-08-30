import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AnkiButton } from ".";
import { Status } from "../../types";

export default {
  title: "AnkiButton",
  component: AnkiButton,
  argTypes: {
    updateAnki: { action: "updateAnki" },
  },
} as ComponentMeta<typeof AnkiButton>;

const Template: ComponentStory<typeof AnkiButton> = (args) => (
  <AnkiButton {...args} />
);

export const Success = Template.bind({});
Success.args = {
  status: Status.Success,
  message: "Success",
};

export const Add = Template.bind({});
Add.args = {
  status: Status.Add,
  message: "Add",
};

export const Loading = Template.bind({});
Loading.args = {
  status: Status.Loading,
  message: "Loading",
};

export const Error = Template.bind({});
Error.args = {
  status: Status.Error,
  message: "Error",
};

export const Disconnect = Template.bind({});
Disconnect.args = {
  status: Status.Disconnect,
  message: "Disconnect",
};

export const ConfigError = Template.bind({});
ConfigError.args = {
  status: Status.ConfigError,
  message: "ConfigError",
};

export const Duplicate = Template.bind({});
Duplicate.args = {
  status: Status.Duplicate,
  message: "Duplicate",
  cardIds: [123, 456, 789],
};

export const Forgotten = Template.bind({});
Forgotten.args = {
  status: Status.Forgotten,
  message: "Forgotten",
  cardIds: [4399],
};

export const LearnNow = Template.bind({});
LearnNow.args = {
  status: Status.LearnNow,
  message: "LearnNow",
  cardIds: [9527],
};

