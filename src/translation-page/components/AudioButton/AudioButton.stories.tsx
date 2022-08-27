import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AudioButton } from "./index";
import {decorators} from '../../test/decorators'
export default {
  title: "",
  component: AudioButton,
  decorators
} as ComponentMeta<typeof AudioButton>;

const Template: ComponentStory<typeof AudioButton> = (args) => (
  <AudioButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {

};
