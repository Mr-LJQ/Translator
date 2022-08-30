import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { HiddenChinese } from "../Context";
import { WordSection } from ".";
import { createHistory } from "../../utils";
import { containerDecorator, audioElementDecorator, wordData } from "@/test";

export default {
  title: "WordSection",
  component: WordSection,
  decorators: [containerDecorator, audioElementDecorator],
  argTypes: {
    updateAnki: { action: "updateAnki" },
    updateAnkiTranslations: { action: "updateAnkiTranslations" },
  },
} as ComponentMeta<typeof WordSection>;

const createTemplate = function (hiddenChinese: boolean) {
  return function Template(args) {
    return (
      <HiddenChinese.Provider value={hiddenChinese}>
        <WordSection {...args} />
      </HiddenChinese.Provider>
    );
  } as ComponentStory<typeof WordSection>;
};

export const Primary = createTemplate(false);
Primary.args = {
  ...wordData,
  ankiButtonInfoObject: createHistory(wordData).ankiButtonInfoObject,
};

export const Hidden = createTemplate(true);
Hidden.args = Primary.args;
