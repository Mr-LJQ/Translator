import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Messenger } from "@/utils/Messenger";
import { Command } from "@/configuration";
import { wordData } from "@/test";
import {
  AddNoteReturnType,
  createErrorResponse,
  createConfigErrorResponse,
  createDisconnectionResponse,
  createDuplicateResponse,
  createFirstAddSuccessResponse,
  createForgottenResponse,
  createSuccessAnkiResponse,
} from "@/anki";
import { View } from "../../components/View";
import { Status } from "../../types";
import { transformWordData } from "../../utils";
import { TabPanelName } from "@/extensions-api";
import { AnkiResponse } from "@/anki/types";

HTMLAudioElement.prototype.pause = () => void 0;
jest.spyOn(window, "scrollTo").mockImplementation();

let messenger: Messenger;
beforeEach(() => {
  messenger = new Messenger({ self: window, target: window });
  messenger.install();
});

afterEach(() => {
  messenger.uninstall();
});

async function prepare() {
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
  const ankiCallbackRef: { callback: (data: AddNoteReturnType) => void } = {
    callback: null!,
  };
  onMessage(Command.AddNote, (data, callback) => {
    mockAddNote(data);
    ankiCallbackRef.callback = callback;
  });

  const mockRelearnNote = jest.fn();
  onMessage(Command.RelearnNote, (data, callback) => {
    mockRelearnNote(data);
    ankiCallbackRef.callback = callback;
  });
  const ankiButton = screen.getAllByRole("button", { name: "AnkiButton" })[0]!;
  const returnData = transformWordData(wordData, 0);
  return {
    user,
    ankiButton,
    returnData,
    onMessage,
    postMessage,
    ankiCallbackRef,
    mockAddNote,
    mockRelearnNote,
  };
}

function getAnkiResponse() {
  const forgottenParam = [1];
  const successParam = [2];
  const duplicateParam = [3];
  const firstAddParam = [4];
  const configErrorParam = "config error";
  const disconnectionParam = "disconnection error";
  const errorParam = "error";

  const errorResponse = createErrorResponse(errorParam);
  const disconnectionResponse = createDisconnectionResponse(disconnectionParam);
  const forgottenResponse = createForgottenResponse(forgottenParam);
  const successResponse = createSuccessAnkiResponse(successParam);
  const duplicateResponse = createDuplicateResponse(duplicateParam);
  const configErrorResponse = createConfigErrorResponse(configErrorParam);
  const firstAddResponse = createFirstAddSuccessResponse(firstAddParam);

  return {
    errorResponse,
    successResponse,
    firstAddResponse,
    forgottenResponse,
    duplicateResponse,
    configErrorResponse,
    disconnectionResponse,

    errorParam,
    successParam,
    firstAddParam,
    forgottenParam,
    duplicateParam,
    configErrorParam,
    disconnectionParam,
  };
}

describe("检查：useAnki()", () => {
  test("测试：返回 ConfigError 时，再次点击打开配置页", async () => {
    const { user, ankiButton, onMessage, ankiCallbackRef } = await prepare();

    const mockOpenOptionsPage = jest.fn();
    onMessage(Command.OpenOptionsPage, mockOpenOptionsPage);

    //第一次点击
    await user.click(ankiButton);
    ankiCallbackRef.callback(createConfigErrorResponse(""));
    await waitFor(() => {
      expect(ankiButton).toHaveAttribute(
        "data-status",
        String(Status.ConfigError)
      );
    });

    //第二次点击
    await user.click(ankiButton);
    ankiCallbackRef.callback(createConfigErrorResponse(""));
    await waitFor(() => {
      expect(ankiButton).toHaveAttribute(
        "data-status",
        String(Status.ConfigError)
      );
    });
    //接收到打开配置页的指令
    expect(mockOpenOptionsPage).toBeCalledWith(
      TabPanelName.Word,
      expect.any(Function)
    );
  });

  test("测试：返回 Duplicate 时，再次点击将一组用于查询的字符串添加到剪切板", async () => {
    const { user, ankiButton, ankiCallbackRef } = await prepare();
    //第一次点击
    await user.click(ankiButton);
    ankiCallbackRef.callback(createDuplicateResponse([123, 456, 789]));
    await waitFor(() => {
      expect(ankiButton).toHaveAttribute(
        "data-status",
        String(Status.Duplicate)
      );
    });
    //第二次点击
    await user.click(ankiButton);
    ankiCallbackRef.callback(createDuplicateResponse([123, 456, 789]));
    await waitFor(() => {
      expect(ankiButton).toHaveAttribute(
        "data-status",
        String(Status.Duplicate)
      );
    });
    //查询字符串添加到剪切板
    const queryText = await navigator.clipboard.readText();
    expect(queryText).toBe("cid:123 OR cid:456 OR cid:789");
  });

  test("测试：各种状态的提交逻辑正确", async () => {
    const { user, ankiButton, ankiCallbackRef } = await prepare();

    const {
      errorParam,
      configErrorParam,
      disconnectionParam,
      errorResponse,
      successResponse,
      firstAddResponse,
      forgottenResponse,
      duplicateResponse,
      configErrorResponse,
      disconnectionResponse,
    } = getAnkiResponse();

    const tests: [AnkiResponse<any>, Status, string][] = [
      [errorResponse, Status.Error, errorParam],
      [
        firstAddResponse,
        Status.LearnNow,
        "已成功添加到Anki，是否需要立刻开始学习？",
      ],
      [
        duplicateResponse,
        Status.Duplicate,
        "该卡片出现重复项，单击按钮复制重复卡片的ID，以在Anki Browser上快速定位(处理完毕后可再次点击该按钮进行重试)。",
      ],
      [
        configErrorResponse,
        Status.ConfigError,
        `${configErrorParam},单击按钮可打开配置页进行相关配置，如已重新配置，则可点击重试。`,
      ],
      [
        forgottenResponse,
        Status.Forgotten,
        "曾经添加过该卡片，是否做遗忘处理？(立刻将其添加到学习列表中)",
      ],
      [disconnectionResponse, Status.Disconnect, disconnectionParam],
      [successResponse, Status.Success, "ok"],
    ];

    for (const [ankiResponse, status, title] of tests) {
      await user.click(ankiButton);
      expect(ankiButton).toHaveAttribute("data-status", String(Status.Loading));
      expect(ankiButton).toHaveAttribute("title", "请等待...");
      ankiCallbackRef.callback(ankiResponse);
      await waitFor(() => {
        expect(ankiButton).toHaveAttribute("data-status", String(status));
      });
      expect(ankiButton).toHaveAttribute("title", title);
    }
  });

  test("测试：出现错误后，再次重试时能够正确复用上次有效提交所调用的处理函数", async () => {
    const {
      user,
      ankiButton,
      ankiCallbackRef,
      mockAddNote,
      mockRelearnNote,
      returnData,
    } = await prepare();

    const {
      errorResponse,
      forgottenParam,
      successResponse,
      forgottenResponse,
      disconnectionResponse,
    } = getAnkiResponse();
    const tests: [jest.Mock<any, any>, AnkiResponse<any>, any, Status][] = [
      [mockAddNote, errorResponse, returnData, Status.Error],
      [mockAddNote, disconnectionResponse, returnData, Status.Disconnect],
      [mockAddNote, forgottenResponse, returnData, Status.Forgotten],
      [mockRelearnNote,disconnectionResponse,forgottenParam,Status.Disconnect,], // prettier-ignore
      [mockRelearnNote, errorResponse, forgottenParam, Status.Error],
      [mockRelearnNote, successResponse, forgottenParam, Status.Success],
    ];

    for (const testData of tests) {
      const [mockFn, ankiResponse, param, status] = testData;
      await user.click(ankiButton);
      expect(mockFn).toBeCalledWith(param);
      ankiCallbackRef.callback(ankiResponse);
      await waitFor(() => {
        expect(ankiButton).toHaveAttribute("data-status", String(status));
      });
    }
    expect(mockAddNote).toBeCalledTimes(3);
    expect(mockRelearnNote).toBeCalledTimes(3);
  });

  test("测试：正确匹配对应的处理函数", async () => {
    const {
      user,
      ankiButton,
      returnData,
      ankiCallbackRef,
      mockAddNote,
      mockRelearnNote,
    } = await prepare();

    const {
      firstAddParam,
      forgottenParam,
      successResponse,
      firstAddResponse,
      forgottenResponse,
      duplicateResponse,
      configErrorResponse,
    } = getAnkiResponse();

    const tests: [jest.Mock<any, any>, AnkiResponse<any>, any, Status][] = [
      [mockAddNote, duplicateResponse, returnData, Status.Duplicate],
      [mockAddNote, configErrorResponse, returnData, Status.ConfigError],
      [mockAddNote, forgottenResponse, returnData, Status.Forgotten],
      [mockRelearnNote, firstAddResponse, forgottenParam, Status.LearnNow],
      [mockRelearnNote, successResponse, firstAddParam, Status.Success],
    ];

    for (const [mockFn, ankiResponse, param, status] of tests) {
      await user.click(ankiButton);
      expect(mockFn).toBeCalledWith(param);
      ankiCallbackRef.callback(ankiResponse);
      await waitFor(() => {
        expect(ankiButton).toHaveAttribute("data-status", String(status));
      });
    }
  });
});
