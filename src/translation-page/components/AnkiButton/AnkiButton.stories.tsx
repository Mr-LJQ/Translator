import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AnkiButton } from ".";
import { MessengerContext } from "../Context";
import { Status } from "../../types";

export default {
  title: "AnkiButton",
  component: AnkiButton,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof AnkiButton>;

const Template: ComponentStory<typeof AnkiButton> = (args) => (
  <MessengerContext.Provider
    value={
      {
        onMessage: () => void 0,
        postMessage: () => void 0,
      } as any
    }
  >
    <AnkiButton {...args} />
  </MessengerContext.Provider>
);

export const Primary = Template.bind({});
Primary.args = {
  status: Status.Add,
  message: "添加到Anki",
  onClick: () => void 0,
};
