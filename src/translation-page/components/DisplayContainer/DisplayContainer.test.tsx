import React from "react";
import userEvent from "@testing-library/user-event";
import { screen, render, within } from "@testing-library/react";
import { wordData, phraseData, sentenceData } from "@/test";
import { DisplayContainer } from ".";
import {
  createHistory,
  transformPhraseData,
  transformTranslations,
  transformWordData,
  __main__,
} from "../../utils";
import { TranslationResult } from "@/dictionary";
import { AudioContext, HiddenChinese, MessengerContext } from "../Context";

test("添加到Anki的短语数据匹配正确", async () => {
  const { user, mockFn } = setup(phraseData);
  await user.click(screen.getByRole("button", { name: "AnkiButton" }));
  expect(mockFn).toBeCalledWith(transformPhraseData(phraseData), __main__, 0);
});
test("添加到Anki的句子数据匹配正确", async () => {
  const { user, mockFn } = setup(sentenceData);
  await user.click(screen.getByRole("button", { name: "AnkiButton" }));
  expect(mockFn).toBeCalledWith(sentenceData, __main__, 0);
});
test("添加到Anki的单词数据匹配正确", async () => {
  const { user, mockFn } = setup(wordData);
  const translationList = wordData.translationList!;
  for (const [index, item] of translationList.entries()) {
    // eslint-disable-next-line testing-library/no-node-access
    const container = within(screen.getByText(item.translation).parentElement!);
    await user.click(container.getByRole("button", { name: "AnkiButton" }));
    expect(mockFn).toBeCalledWith(
      transformWordData(wordData, index),
      __main__,
      index
    );
  }
  const translations = wordData.translations!;
  const keys = Object.keys(translations);
  for (const key of keys) {
    const item = translations[key]!;
    for (const [idx, val] of item.entries()) {
      const container = within(screen.getByText(val.trim()));
      await user.click(container.getByRole("button", { name: "AnkiButton" }));
      expect(mockFn).toBeCalledWith(
        transformTranslations(wordData, key, idx),
        key,
        idx
      );
    }
  }
});

function setup(data: TranslationResult) {
  const user = userEvent.setup();
  const mockFn = jest.fn();
  const audioElement = document.createElement("audio");
  render(
    <HiddenChinese.Provider value={false}>
      <MessengerContext.Provider
        value={{ postMessage: () => void 0, onMessage: () => () => void 0 }}
      >
        <AudioContext.Provider value={audioElement}>
          <DisplayContainer
            isLoading={false}
            data={data}
            ankiButtonInfoObject={createHistory(data).ankiButtonInfoObject}
            updateAnki={mockFn}
          />
        </AudioContext.Provider>
      </MessengerContext.Provider>
    </HiddenChinese.Provider>
  );
  return {
    mockFn,
    user,
  };
}
