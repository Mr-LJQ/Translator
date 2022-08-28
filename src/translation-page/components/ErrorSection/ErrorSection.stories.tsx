import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { userEvent, screen } from "@storybook/testing-library";
import { ErrorSection } from "./index";
import { decorators } from "@/test/decorators/translationPage";

export default {
  title: "ErrorSection",
  component: ErrorSection,
  decorators,
} as ComponentMeta<typeof ErrorSection>;

const Template: ComponentStory<typeof ErrorSection> = (args) => (
  <ErrorSection {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  queryText: "word",
  message: "网络连接异常，请重新尝试。",
};
Primary.play = async () => {
  const againButton = screen.getByRole("button",{name:"再次查询"})
  await userEvent.click(againButton)
}

export const Cacography = Template.bind({});
Cacography.args = {
  possibleSpelling: ["word", "worded"],
};
