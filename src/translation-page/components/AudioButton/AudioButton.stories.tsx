import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AudioButton } from ".";
import { audioElementDecorator } from "@/test";
export default {
  title: "AudioButton",
  component: AudioButton,
  decorators: [audioElementDecorator],
} as ComponentMeta<typeof AudioButton>;

const Template: ComponentStory<typeof AudioButton> = (args) => {
  return <AudioButton {...args} />;
};

export const Primary = Template.bind({});
Primary.args = {
  audioURL: "url",
};

export const Hover = Template.bind({});
Hover.args = {
  ...Primary.args,
};

Hover.parameters = {
  pseudo: { hover: true },
};

export const FocusVisible = Template.bind({});
FocusVisible.args = {
  ...Primary.args,
};

FocusVisible.parameters = {
  pseudo: { focusVisible: true, focus: true },
};

export const Focus = Template.bind({});
Focus.args = {
  ...Primary.args,
};

Focus.parameters = {
  pseudo: { focus: true },
};
