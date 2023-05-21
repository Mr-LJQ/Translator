import React from "react";
import { StoryObj, Meta } from "@storybook/react";
import { Loading, LoadingMask as LoadingMaskComponent } from "./index";

export default {
  title: "Loading",
  component: Loading,
} as Meta<typeof Loading>;

type Story = StoryObj<typeof Loading>;

export const Size50: Story = {};
Size50.args = {
  size: 50,
};

export const ColorRed: Story = {};
ColorRed.args = {
  color: "red",
};

export const LoadingMask: StoryObj<typeof LoadingMaskComponent> = {
  render: (args) => {
    return <LoadingMaskComponent {...args} />;
  },
};
LoadingMask.args = {
  className: "absolute inset-0 z-50",
};
