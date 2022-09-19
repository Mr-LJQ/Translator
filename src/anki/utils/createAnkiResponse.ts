import { AnkiResponseStatus, AnkiResponse } from "../types";

function createAnkiResponse<T>(options: AnkiResponse<T>): AnkiResponse<T> {
  return Object.assign(
    {
      __isAnkiResponse__: true,
    },
    options
  );
}

export function isAnkiResponse(target: any) {
  if (target === null || typeof target !== "object") return false;
  return target.__isAnkiResponse__ === true;
}

export function createSuccessAnkiResponse<T>(data: T) {
  return createAnkiResponse({
    data,
    message: "ok",
    status: AnkiResponseStatus.Success,
  });
}

export function createDisconnectionResponse(message: string) {
  return createAnkiResponse({
    status: AnkiResponseStatus.Disconnect,
    message,
  });
}
export function createForgottenResponse(cardIds: number[]) {
  return createAnkiResponse({
    data: cardIds,
    status: AnkiResponseStatus.Forgotten,
    message: "曾经添加过该卡片，是否做遗忘处理？(立刻将其添加到学习列表中)",
  });
}

export function createDuplicateResponse(cardIds: number[]) {
  return createAnkiResponse({
    data: cardIds,
    status: AnkiResponseStatus.Duplicate,
    message:
      "该卡片出现重复项，单击按钮复制重复卡片的ID，以在Anki Browser上快速定位(处理完毕后可再次点击该按钮进行重试操纵)。",
  });
}

export function createFirstAddSuccessResponse(cardIds: number[]) {
  return createAnkiResponse({
    data: cardIds,
    status: AnkiResponseStatus.FirstAddSuccess,
    message: "已成功添加到Anki，是否需要立刻开始学习？",
  });
}

export function createConfigErrorResponse(message: string) {
  return createAnkiResponse({
    status: AnkiResponseStatus.ConfigError,
    message: `${message},单击按钮可打开配置页进行相关配置，如已重新配置，则可点击重试。`,
  });
}

export function createOldVersionResponse() {
  return createAnkiResponse({
    status: AnkiResponseStatus.OldVersion,
    message: "AnkiConnection版本过低，请更新到最新版本。",
  });
}

export function createAnkiErrorResponse(message: string) {
  return createAnkiResponse({
    status: AnkiResponseStatus.Error,
    message,
  });
}

export function createUnexpectedErrorResponse(e: Error | string) {
  return createAnkiResponse({
    status: AnkiResponseStatus.UnexpectedError,
    message: typeof e === "string" ? e : e.message,
  });
}
