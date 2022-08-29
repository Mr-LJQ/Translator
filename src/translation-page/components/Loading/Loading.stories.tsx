import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Loading } from "./index";
export default {
  title: "Loading",
  component: Loading,
} as ComponentMeta<typeof Loading>;

const Template: ComponentStory<typeof Loading> = (args) => (
  <Loading {...args} />
);

export const Size20 = Template.bind({});

export const Size30 = Template.bind({});
Size30.args = {
  size: 30,
};

export const ColorRed = Template.bind({});
ColorRed.args = {
  color: "red",
};
