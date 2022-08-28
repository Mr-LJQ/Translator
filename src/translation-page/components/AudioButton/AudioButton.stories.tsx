import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AudioButton } from "./index";
import { decorators } from "@/test/decorators/translationPage";
export default {
  title: "AudioButton",
  component: AudioButton,
  decorators,
} as ComponentMeta<typeof AudioButton>;

const Template: ComponentStory<typeof AudioButton> = (args) => (
  <AudioButton {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  audioURL:"https://dict.youdao.com/dictvoice?audio=word&type=2"
};
