import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Loading, LoadingMask as LoadingMaskComponent } from "./index";
export default {
  title: "Loading",
  component: Loading,
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args) => (
  <Loading {...args} />
);

export const Size50 = Template.bind({});
Size50.args = {
  size: 50,
};

export const ColorRed = Template.bind({});
ColorRed.args = {
  color: "red",
};

export const LoadingMask: ComponentStory<typeof LoadingMaskComponent> = (
  args
) => {
  return <LoadingMaskComponent {...args} />;
};
LoadingMask.args = {
  className: "absolute inset-0 z-50",
};
