import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Messenger } from "@/utils/Messenger";
import { Command } from "@/configuration";
import {
  cacographyData,
  errorData,
  phraseData,
  sentenceData,
  wordData,
} from "@/test";
import { View } from ".";

jest.spyOn(window, "postMessage").mockImplementation((data) => {
  //因为在 jsdom 中 window.postMessage() 触发的 window.addEventlistener("message",({source})=>void 0)
  // source !== window,因而导致 测试无法进行，因此使用该 mock 替代。
  setTimeout(() => {
    window.dispatchEvent(
      new MessageEvent("message", {
        source: window,
        data,
      })
    );
  }, 200);
});

//jsdom没有实现该方法
const mockScrollTo = jest.spyOn(window, "scrollTo").mockImplementation();

const mockPause = jest.fn();
HTMLAudioElement.prototype.pause = mockPause;

let messenger: Messenger;
beforeEach(() => {
  messenger = new Messenger({ self: window, target: window });
  messenger.install();
  jest.useFakeTimers();
});

afterEach(() => {
  messenger.uninstall();
  jest.runAllTimers();
  jest.useRealTimers();
});

test("正确停止播放音频", async () => {
  const { postMessage } = messenger;
  postMessage(Command.PauseAudio);
  jest.runAllTimers();
  expect(mockPause).toBeCalledTimes(1);
});

test("传递的数据正确的渲染", async () => {
  const { postMessage } = messenger;
  render(<View />);
  const callback = jest.fn();
  postMessage(Command.ShowTranslation, wordData, callback);
  act(() => {
    jest.runAllTimers();
  });
  expect(screen.getByRole("heading")).toHaveTextContent(wordData.word);
  jest.runAllTimers()
  expect(callback).toBeCalledTimes(1)
  postMessage(Command.ShowTranslation, phraseData, callback);
  act(() => {
    jest.runAllTimers();
  });
  expect(screen.getByRole("heading")).toHaveTextContent(phraseData.phrase);
  jest.runAllTimers()
  expect(callback).toBeCalledTimes(2)
  postMessage(Command.ShowTranslation, sentenceData, callback);
  act(() => {
    jest.runAllTimers();
  });
  expect(screen.getByRole("heading")).toHaveTextContent(sentenceData.sentence);
  jest.runAllTimers()
  expect(callback).toBeCalledTimes(3)
  postMessage(Command.ShowTranslation, errorData, callback);
  act(() => {
    jest.runAllTimers();
  });
  expect(screen.getByText(errorData.message!)).toBeInTheDocument();
  jest.runAllTimers()
  expect(callback).toBeCalledTimes(4)
});

/*
test("Anki按钮一一对应",)
test("数据正确渲染",)
test("历史记录功能正确运作",)
test("停止播放指令监听有效",)
test("开关Selection功能的指令监听有效",)
test("Selection功能正常运行",)
test("Loading能够在正确的时机显示",)
test("显隐中文翻译功能正确实现",) */
