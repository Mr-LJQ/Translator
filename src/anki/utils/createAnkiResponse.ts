import { COMMON_CONFIG_MAP } from "@/configuration";
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
      "该卡片出现重复项，请自行在Anki上处理重复项，单击复制重复卡片的ID，以在Anki Browser上快速定位。",
  });
}

export function createFirstAddSuccessResponse(cardIds: number[]) {
  return createAnkiResponse({
    data: cardIds,
    status: AnkiResponseStatus.FirstAddSuccess,
    message:"已成功添加到Anki，是否需要立刻开始学习？(用于在待学习列表很长的时候，使其无需等待，立刻开始学习)",
  });
}

export function createConfigErrorResponse() {
  return createAnkiResponse({
    status: AnkiResponseStatus.ConfigError,
    message: `存在配置错误，是否打开配置页面设置配置？可能是一下问题之一导致该错误：\n\t- ${COMMON_CONFIG_MAP.deckName},未配置\n\t- ${COMMON_CONFIG_MAP.modelName},未配置\n\t- 没有配置任何一个 model field 项\n\t- 配置的某个 model field 项与 Anki 上的不匹配，请刷新后重新配置`,
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
