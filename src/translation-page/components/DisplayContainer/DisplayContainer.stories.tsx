import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DisplayContainer } from ".";
export default {
  title: "DisplayContainer",
  component: DisplayContainer,
} as ComponentMeta<typeof DisplayContainer>;

const Template: ComponentStory<typeof DisplayContainer> = (args) => (
  <DisplayContainer {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
