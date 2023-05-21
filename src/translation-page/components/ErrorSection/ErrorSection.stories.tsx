import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within, waitFor } from "@storybook/testing-library";
import { ErrorSection } from ".";
import { MessengerContext } from "../Context";
import { expect, jest } from "@storybook/jest";
import { Command } from "@/configuration/command";
import { containerDecorator, cacographyData, errorData } from "@/test";

const onMessageMocked = jest.fn<any, any[]>();
const postMessageMocked = jest.fn<any, any[]>();
export default {
  title: "ErrorSection",
  component: ErrorSection,
  decorators: [
    containerDecorator,
    (Story) => {
      return (
        <MessengerContext.Provider
          value={{ postMessage: postMessageMocked, onMessage: onMessageMocked }}
        >
          <Story />
        </MessengerContext.Provider>
      );
    },
  ],
  argTypes: {
    message: {
      control: { type: "text" },
    },
  },
} as Meta<typeof ErrorSection>;

type Story = StoryObj<typeof ErrorSection>;

export const Primary: Story = {};
Primary.args = {
  ...errorData,
};
Primary.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const againButton = canvas.getByRole("button", { name: "再次查询" });
  await userEvent.click(againButton);
  expect(postMessageMocked).toBeCalledWith(Command.TranslateText, "word");
  await waitFor(() => {
    expect(canvas.getByRole("img", { name: "loading" })).toBeInTheDocument();
  });
};

export const Cacography: Story = {};
Cacography.args = {
  ...cacographyData,
};
