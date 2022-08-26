import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AnkiButton } from "./AnkiButton";
import { MessengerContext } from "../hooks";
import { Status } from "../types";

export default {
  title: "AnkiButton",
  component: AnkiButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
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
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  status: Status.Add,
  message: "添加到Anki",
  onClick: () => void 0,
};
