import React from "react";
import { ErrorSection } from ".";
import { cacographyData, errorData } from "@/test";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Command } from "@/configuration";
import { MessengerContext } from "../Context";

test("正确的重试请求，正确的错误拼写再请求", async () => {
  const user = userEvent.setup();
  const mockPostMessage = jest.fn();
  const view = render(
    <MessengerContext.Provider
      value={{ postMessage: mockPostMessage, onMessage: () => () => void 0 }}
    >
      <ErrorSection {...cacographyData} />
    </MessengerContext.Provider>
  );
  const word = cacographyData.possibleSpelling![0]!;
  const word1 = cacographyData.possibleSpelling![1]!;
  await user.click(screen.getByText(word, { selector: "li" }));
  expect(mockPostMessage).toBeCalledWith(Command.TranslateText, word);
  await user.click(screen.getByText(word1, { selector: "li" }));
  expect(mockPostMessage).toBeCalledWith(Command.TranslateText, word1);

  view.rerender(
    <MessengerContext.Provider
      value={{ postMessage: mockPostMessage, onMessage: () => () => void 0 }}
    >
      <ErrorSection {...errorData} />
    </MessengerContext.Provider>
  );
  await user.click(screen.getByRole("button"));
  expect(mockPostMessage).toBeCalledWith(
    Command.TranslateText,
    errorData.queryText
  );
  expect(mockPostMessage).toBeCalledTimes(3);
});
