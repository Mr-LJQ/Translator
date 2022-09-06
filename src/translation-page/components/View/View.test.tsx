import React from "react";
import {
  render,
  screen,
  waitFor,
  act,
  waitForElementToBeRemoved,
} from "@testing-library/react";
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
import {
  AddNoteReturnType,
  createAnkiErrorResponse,
  createConfigErrorResponse,
  createDisconnectionResponse,
  createDuplicateResponse,
  createFirstAddSuccessResponse,
  createForgottenResponse,
  createOldVersionResponse,
  createSuccessAnkiResponse,
  createUnexpectedErrorResponse,
} from "@/anki";
import { View } from ".";
import { Status } from "../../types";
import { transformWordData } from "../../utils";

//jsdom没有实现该方法
const mockScrollTo = jest.spyOn(window, "scrollTo").mockImplementation();

/**
 * 由于 jsdom 在 selection 改变时不会触发 selectionchange监听，因此需要手动实现
 */
const originAddEventlistener = document.addEventListener.bind(document);
const originRemoveEventListener = document.removeEventListener.bind(document);

let prevSelection: string | undefined;
const map = new Map<(...args: any[]) => void, (...args: any[]) => void>();

jest
  .spyOn(document, "removeEventListener")
  .mockImplementation((type, listener, options) => {
    //@ts-ignore listener在设计上保证是函数
    if (map.has(listener)) {
      //@ts-ignore listener在设计上保证是函数
      originRemoveEventListener(type, map.get(listener), options);
      return;
    }
    originRemoveEventListener(type, listener, options);
  });
jest
  .spyOn(document, "addEventListener")
  .mockImplementation((type, listener, options) => {
    if (type === "mousedown") {
      const callback = (...args: [ev: MouseEvent]) => {
        prevSelection = getSelection()?.toString();
        //@ts-ignore listener在设计上保证是函数
        return listener.apply(document, args);
      };
      //@ts-ignore listener在设计上保证是函数
      map.set(listener, callback);
      originAddEventlistener(type, callback, options);
      return;
    }
    if (type === "mouseup") {
      const callback = (...args: [ev: MouseEvent]) => {
        const currentSelection = getSelection()?.toString();
        if (currentSelection !== prevSelection) {
          document.dispatchEvent(new Event("selectionchange", {}));
        }
        //@ts-ignore listener在设计上保证是函数
        return listener.apply(document, args);
      };
      //@ts-ignore listener在设计上保证是函数
      map.set(listener, callback);
      originAddEventlistener(type, callback, options);
      return;
    }
    originAddEventlistener(type, listener, options);
  });

function sleep(time = 0) {
  return act(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  });
}

let messenger: Messenger;
beforeEach(() => {
  messenger = new Messenger({ self: window, target: window });
  messenger.install();
});

afterEach(() => {
  messenger.uninstall();
  mockScrollTo.mockClear();
});

test("正确的历史功能(useHistory)", async () => {
  const user = userEvent.setup();
  render(<View />);
  const { postMessage, onMessage } = messenger;
  //准备历史记录
  const dataArray = [
    phraseData,
    errorData,
    cacographyData,
    sentenceData,
    wordData,
  ];
  const mockHistoryIndex = jest.fn();
  onMessage(Command.HistoryIndex, (data) => {
    mockHistoryIndex(data);
  });
  /**
   * layoutEffect与set基本上都在同一个宏任务，而 effect则另立宏任务
   */
  for (const data of dataArray) {
    postMessage(Command.ShowTranslation, data, () => void 0);
    await sleep();
  }
  //测试 HistoryIndex监听
  await waitFor(() => {
    expect(mockHistoryIndex.mock.calls).toEqual([
      [{ index: 0, head: 0, tail: 0 }],
      [{ index: 1, head: 0, tail: 1 }],
      [{ index: 2, head: 0, tail: 2 }],
      [{ index: 3, head: 0, tail: 3 }],
    ]);
  });
  mockHistoryIndex.mockClear();

  //每次 data 发生改变都会重新设置 滚动条位置
  expect(mockScrollTo).toBeCalledTimes(6);
  expect(mockScrollTo.mock.calls).toEqual([
    [{ top: 0 }], //初始化一次
    [{ top: 0 }],
    [{ top: 0 }],
    [{ top: 0 }],
    [{ top: 0 }],
    [{ top: 0 }],
  ]);
  mockScrollTo.mockClear();

  //测试前进、回退功能以及对不缓存数据的处理
  const names = [
    sentenceData.sentence,
    "你要找的是否是：",
    phraseData.phrase,
    phraseData.phrase,
    "你要找的是否是：",
    sentenceData.sentence,
    wordData.word,
    wordData.word,
  ];
  for (const [i, name] of names.entries()) {
    if (i >= 4) {
      postMessage(Command.ForwardHistory);
    } else {
      postMessage(Command.BackHistory);
    }
    await waitFor(() => {
      expect(screen.getByRole("heading", { name })).toBeInTheDocument();
    });
  }
  await waitFor(() => {
    expect(mockHistoryIndex.mock.calls).toEqual([
      [{ index: 2, head: 0, tail: 3 }],
      [{ index: 1, head: 0, tail: 3 }],
      [{ index: 0, head: 0, tail: 3 }],
      [{ index: 1, head: 0, tail: 3 }],
      [{ index: 2, head: 0, tail: 3 }],
      [{ index: 3, head: 0, tail: 3 }],
    ]);
  });
  expect(mockScrollTo.mock.calls).toEqual([
    [{ top: 0 }],
    [{ top: 0 }],
    [{ top: 0 }],
    [{ top: 0 }],
    [{ top: 0 }],
    [{ top: 0 }],
  ]);

  //历史信息的正确记录与复原
  let addNoteCallback: (data: AddNoteReturnType) => void = null!;
  onMessage(Command.AddNote, (data, callback) => {
    addNoteCallback = callback;
  });
  {
    document.documentElement.scrollTop = 200;
    const ankiButton = screen.getAllByRole("button", {
      name: /AnkiButton/,
    })[3]!;
    await user.click(ankiButton);
    expect(ankiButton).toHaveAttribute("data-status", String(Status.Loading));
    // 存在 loading 状态时,回退操作会进行等待状态
    postMessage(Command.BackHistory);
    await sleep();
    expect(
      screen.getByRole("heading", { name: wordData.word })
    ).toBeInTheDocument();
    addNoteCallback(createAnkiErrorResponse(""));
  }
  await waitFor(() => {
    expect(
      screen.getByRole("heading", { name: sentenceData.sentence })
    ).toBeInTheDocument();
  });
  document.documentElement.scrollTop = 100;
  const ankiButton = screen.getByRole("button", { name: /AnkiButton/ });
  await user.click(ankiButton);
  expect(ankiButton).toHaveAttribute("data-status", String(Status.Loading));
  // 存在 loading 状态时,前进操作会进行等待状态
  postMessage(Command.ForwardHistory);
  await sleep();
  expect(
    screen.getByRole("heading", { name: sentenceData.sentence })
  ).toBeInTheDocument();
  addNoteCallback(createFirstAddSuccessResponse([123]));

  //前进操作时，能够更新历史记录
  mockScrollTo.mockClear();
  await waitFor(() => {
    expect(
      screen.getByRole("heading", { name: wordData.word })
    ).toBeInTheDocument();
  });
  expect(mockScrollTo).toBeCalledWith({ top: 200 });
  expect(
    screen.getAllByRole("button", { name: "AnkiButton" })[3]
  ).toHaveAttribute("data-status", String(Status.Error));

  //回退操作时，能够更新历史记录
  postMessage(Command.BackHistory);
  await waitFor(() => {
    expect(
      screen.getByRole("heading", { name: sentenceData.sentence })
    ).toBeInTheDocument();
  });
  expect(mockScrollTo).toBeCalledWith({ top: 100 });
  expect(screen.getByRole("button", { name: "AnkiButton" })).toHaveAttribute(
    "data-status",
    String(Status.LearnNow)
  );
});

test("正确的Anki操作功能(useAnki)", async () => {
  const user = userEvent.setup();
  render(<View />);
  const { postMessage, onMessage } = messenger;
  postMessage(Command.ShowTranslation, wordData, () => void 0);
  await waitFor(() => {
    expect(
      screen.getByRole("heading", { name: wordData.word })
    ).toBeInTheDocument();
  });

  const mockAddNote = jest.fn();
  let ankiCallback: (data: AddNoteReturnType) => void = null!;
  onMessage(Command.AddNote, (data, callback) => {
    mockAddNote(data);
    ankiCallback = callback;
  });

  const mockRelearnNote = jest.fn();
  onMessage(Command.RelearnNote, (data, callback) => {
    mockRelearnNote(data);
    ankiCallback = callback;
  });

  //单击按钮后会使其变为 loading状态
  const ankiButton = screen.getAllByRole("button", { name: "AnkiButton" })[0]!;
  expect(ankiButton).toHaveAttribute("data-status", String(Status.Add));
  await user.click(ankiButton);
  expect(ankiButton).toHaveAttribute("data-status", String(Status.Loading));
  const returnData = transformWordData(wordData, 0);
  expect(mockAddNote).toBeCalledWith(returnData);
  ankiCallback(createDuplicateResponse([123, 456, 789]));
  await waitFor(() => {
    expect(ankiButton).toHaveAttribute("data-status", String(Status.Duplicate));
  });

  //status.Duplicate时，再次点击会将复制一份搜索字符串到剪切板
  await user.click(ankiButton);
  expect(ankiButton).toHaveAttribute("data-status", String(Status.Loading));
  expect(mockAddNote).toBeCalledWith(returnData);
  ankiCallback(createDuplicateResponse([123, 456, 789]));
  await waitFor(() => {
    expect(ankiButton).toHaveAttribute("data-status", String(Status.Duplicate));
  });
  const queryText = await navigator.clipboard.readText();
  expect(queryText).toBe("cid:123 OR cid:456 OR cid:789");

  await user.click(ankiButton);
  expect(mockAddNote).toBeCalledWith(returnData);
  expect(mockAddNote).toBeCalledTimes(3);
  ankiCallback(createConfigErrorResponse(""));
  await waitFor(() => {
    expect(ankiButton).toHaveAttribute(
      "data-status",
      String(Status.ConfigError)
    );
  });

  //测试配置错误状态下再次点击按钮打开配置页的功能
  const mockOpenOptionsPage = jest.fn();
  onMessage(Command.OpenOptionsPage, mockOpenOptionsPage);
  await user.click(ankiButton);
  expect(mockAddNote).toBeCalledWith(returnData);
  expect(mockAddNote).toBeCalledTimes(4);
  ankiCallback(createConfigErrorResponse(""));
  await waitFor(() => {
    expect(ankiButton).toHaveAttribute(
      "data-status",
      String(Status.ConfigError)
    );
  });

  await user.click(ankiButton);
  expect(mockOpenOptionsPage).toBeCalledTimes(1);
  expect(mockAddNote).toBeCalledWith(returnData);
  expect(mockAddNote).toBeCalledTimes(5);
  ankiCallback(createAnkiErrorResponse(""));
  await waitFor(() => {
    expect(ankiButton).toHaveAttribute("data-status", String(Status.Error));
  });

  await user.click(ankiButton);
  expect(mockOpenOptionsPage).toBeCalledTimes(1);
  expect(mockAddNote).toBeCalledWith(returnData);
  expect(mockAddNote).toBeCalledTimes(6);
  ankiCallback(createForgottenResponse([4399]));
  await waitFor(() => {
    expect(ankiButton).toHaveAttribute("data-status", String(Status.Forgotten));
  });

  await user.click(ankiButton);
  expect(mockRelearnNote).toBeCalledWith([4399]);
  expect(mockRelearnNote).toBeCalledTimes(1);
  ankiCallback(createFirstAddSuccessResponse([9527]));
  await waitFor(() => {
    expect(ankiButton).toHaveAttribute("data-status", String(Status.LearnNow));
  });

  await user.click(ankiButton);
  expect(mockRelearnNote).toBeCalledWith([9527]);
  expect(mockRelearnNote).toBeCalledTimes(2);
  ankiCallback(createAnkiErrorResponse(""));
  await waitFor(() => {
    expect(ankiButton).toHaveAttribute("data-status", String(Status.Error));
  });

  await user.click(ankiButton);
  expect(mockRelearnNote).toBeCalledWith([9527]);
  expect(mockRelearnNote).toBeCalledTimes(3);
  ankiCallback(createDisconnectionResponse(""));
  await waitFor(() => {
    expect(ankiButton).toHaveAttribute(
      "data-status",
      String(Status.Disconnect)
    );
  });

  await user.click(ankiButton);
  expect(mockRelearnNote).toBeCalledWith([9527]);
  expect(mockRelearnNote).toBeCalledTimes(4);
  ankiCallback(createOldVersionResponse());
  await waitFor(() => {
    expect(ankiButton).toHaveAttribute("data-status", String(Status.Error));
  });

  await user.click(ankiButton);
  expect(mockRelearnNote).toBeCalledWith([9527]);
  expect(mockRelearnNote).toBeCalledTimes(5);
  ankiCallback(createUnexpectedErrorResponse(""));
  await waitFor(() => {
    expect(ankiButton).toHaveAttribute("data-status", String(Status.Error));
  });

  await user.click(ankiButton);
  expect(mockRelearnNote).toBeCalledWith([9527]);
  expect(mockRelearnNote).toBeCalledTimes(6);
  ankiCallback(createSuccessAnkiResponse([123]));
  await waitFor(() => {
    expect(ankiButton).toHaveAttribute("data-status", String(Status.Success));
  });
});

test("正确的实现其它功能(useFeature)", async () => {
  //测试 渲染后触发的回调
  const user = userEvent.setup();
  render(<View />);
  const { postMessage, onMessage } = messenger;
  const mockShowTranslation = jest.fn();
  postMessage(Command.ShowTranslation, sentenceData, mockShowTranslation);
  await sleep();
  postMessage(Command.ShowTranslation, wordData, mockShowTranslation);
  await waitFor(() => {
    expect(mockShowTranslation).toBeCalledTimes(2);
  });

  let ankiCallbacks: Array<(data: AddNoteReturnType) => void> = [];
  onMessage(Command.AddNote, (data, callback) => {
    ankiCallbacks.push(callback);
  });

  const ankiButton = screen.getAllByRole("button", { name: "AnkiButton" })[0]!;
  const ankiButton1 = screen.getAllByRole("button", { name: "AnkiButton" })[1]!;
  const ankiButton2 = screen.getAllByRole("button", { name: "AnkiButton" })[2]!;
  await user.click(ankiButton);
  await user.click(ankiButton1);
  await user.click(ankiButton2);
  // loading 状态时，渲染需要等到 loading 状态结束后才进行
  postMessage(Command.ShowTranslation, phraseData, mockShowTranslation);
  await sleep();
  expect(
    screen.getByRole("heading", { name: wordData.word })
  ).toBeInTheDocument();
  ankiCallbacks[0]!(createOldVersionResponse());
  await sleep();
  expect(
    screen.getByRole("heading", { name: wordData.word })
  ).toBeInTheDocument();
  ankiCallbacks[1]!(createOldVersionResponse());
  await sleep();
  expect(
    screen.getByRole("heading", { name: wordData.word })
  ).toBeInTheDocument();
  ankiCallbacks[2]!(createOldVersionResponse());
  await waitFor(() => {
    expect(
      screen.getByRole("heading", { name: phraseData.phrase })
    ).toBeInTheDocument();
  });

  postMessage(Command.BackHistory);
  await sleep();
  ankiCallbacks = [];
  await user.click(screen.getAllByRole("button", { name: "AnkiButton" })[2]!);
  //loading 状态时，对动作的缓存只保留一个
  postMessage(Command.BackHistory);
  await sleep();
  postMessage(Command.ForwardHistory);
  ankiCallbacks[0]!(createSuccessAnkiResponse([123]));
  await waitFor(() => {
    expect(
      screen.getByRole("heading", { name: phraseData.phrase })
    ).toBeInTheDocument();
  });
});

test("正确的实现Selection功能", async () => {
  const user = userEvent.setup();
  render(<h1>word</h1>);
  const { postMessage, onMessage } = messenger;
  const mockFn = jest.fn();
  onMessage(Command.TranslateText, mockFn);
  await user.dblClick(screen.getByRole("heading"));
  expect(mockFn).not.toBeCalled();
  postMessage(Command.OpenSelection, true);
  await user.dblClick(screen.getByRole("heading"));
  expect(mockFn).toBeCalledWith("word", expect.any(Function));
  postMessage(Command.OpenSelection, false);
  await user.dblClick(screen.getByRole("heading"));
  expect(mockFn).toBeCalledTimes(1);
});

test("监听停止播放指令", async () => {
  const originPause = HTMLAudioElement.prototype.pause;
  const mockFn = jest.fn();
  HTMLAudioElement.prototype.pause = mockFn;
  const { postMessage } = messenger;
  postMessage(Command.PauseAudio);
  await waitFor(() => {
    expect(mockFn).toBeCalledTimes(1);
  });
  HTMLAudioElement.prototype.pause = originPause;
});

test("显隐中文翻译功能正确实现", async () => {
  render(<View />);
  const { postMessage } = messenger;
  postMessage(Command.ShowTranslation, wordData, () => void 0);
  const chinese = wordData.translationList![0]!.translation;
  await waitFor(() => {
    expect(screen.getByText(chinese)).toBeInTheDocument();
  });
  postMessage(Command.HiddenChinese, true);
  await waitForElementToBeRemoved(screen.queryByText(chinese));
});

test("切换翻译数据时，停止音频播放", async () => {
  render(<View />);
  const { postMessage } = messenger;
  const originPause = HTMLAudioElement.prototype.pause;
  const mockFn = jest.fn();
  HTMLAudioElement.prototype.pause = mockFn;
  postMessage(Command.ShowTranslation, sentenceData, () => void 0);
  await waitFor(() => {
    expect(mockFn).toBeCalled();
  });
  HTMLAudioElement.prototype.pause = originPause;
});
