import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AudioButton } from ".";
import { audioElementDecorator } from "@/test";
export default {
  title: "AudioButton",
  component: AudioButton,
  decorators: [audioElementDecorator],
  parameters: {
    pseudo: {
      hover: ["button:nth-of-type(2)"],
      focus: ["button:nth-of-type(3)"],
    },
  },
} as ComponentMeta<typeof AudioButton>;

const Template: ComponentStory<typeof AudioButton> = (args) => {
  return (
    <>
      <AudioButton {...args} />
      <br />
      <AudioButton {...args} />
      <br />
      <AudioButton {...args} />
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  audioURL: "https://dict.youdao.com/dictvoice?audio=word&type=2",
};
