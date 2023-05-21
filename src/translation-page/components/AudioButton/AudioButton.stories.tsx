import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
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
} as Meta<typeof AudioButton>;

type Story = StoryObj<typeof AudioButton>;

export const Primary: Story = {
  render(args) {
    return (
      <>
        <AudioButton {...args} />
        <AudioButton {...args} />
        <AudioButton {...args} />
      </>
    );
  },
  args: {
    audioURL: "https://dict.youdao.com/dictvoice?audio=word&type=2",
  },
};
