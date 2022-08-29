import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AudioButton } from ".";
import { AudioContext } from "../Context";
export default {
  title: "AudioButton",
  component: AudioButton,
} as ComponentMeta<typeof AudioButton>;

const Template: ComponentStory<typeof AudioButton> = (args) => {
  const audioElement = document.createElement("audio");
  return (
    <AudioContext.Provider value={audioElement}>
      <AudioButton {...args} />
    </AudioContext.Provider>
  );
};

export const Primary = Template.bind({});
Primary.args = {
  audioURL: "url",
};
