import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { AnkiButton } from ".";
import { Status } from "../../types";

const meta: Meta<typeof AnkiButton> = {
  title: "AnkiButton",
  component: AnkiButton,
  parameters: {
    pseudo: {
      hover: ["button:nth-of-type(2)"],
      focus: ["button:nth-of-type(3)"],
    },
  },
};
export default meta;

type Story = StoryObj<typeof AnkiButton>;

const Template: Story = {
  render(args) {
    return (
      <>
        <AnkiButton {...args} />
        <AnkiButton {...args} />
        <AnkiButton {...args} />
      </>
    );
  },
};

export const Success: Story = {
  ...Template,
  args: {
    status: Status.Success,
    message: "Success",
  },
};

export const Add: Story = {
  ...Template,
  args: {
    status: Status.Add,
    message: "Add",
  },
};

export const Loading: Story = {
  ...Template,
  args: {
    status: Status.Loading,
    message: "Loading",
  },
};

export const Error: Story = {
  ...Template,
  args: {
    status: Status.Error,
    message: "Error",
  },
};

export const Disconnect: Story = {
  ...Template,
  args: {
    status: Status.Disconnect,
    message: "Disconnect",
  },
};

export const ConfigError: Story = {
  ...Template,
  args: {
    status: Status.ConfigError,
    message: "ConfigError",
  },
};

export const Duplicate: Story = {
  ...Template,
  args: {
    status: Status.Duplicate,
    message: "Duplicate",
    cardIds: [123, 456, 789],
  },
};

export const Forgotten: Story = {
  ...Template,
  args: {
    status: Status.Forgotten,
    message: "Forgotten",
    cardIds: [4399],
  },
};

export const LearnNow: Story = {
  ...Template,
  args: {
    status: Status.LearnNow,
    message: "LearnNow",
    cardIds: [9527],
  },
};
