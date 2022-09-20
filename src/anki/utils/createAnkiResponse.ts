import {
  AnkiResponse,
  AnkiResponseError,
  AnkiResponseStatus,
  AnkiResponseSuccess,
} from "../types";
export const ankiResponseSymbol = Symbol();

function createAnkiResponseError<T>(
  options: Omit<AnkiResponse<T>, typeof ankiResponseSymbol | "ok">
): AnkiResponseError<T> {
  return Object.assign(
    {
      ok: false,
      [ankiResponseSymbol]: true,
    } as const,
    options
  );
}

function createAnkiResponseSuccess<T>(
  options: Omit<AnkiResponse<T>, typeof ankiResponseSymbol | "ok">
): AnkiResponseSuccess<T> {
  return Object.assign(
    {
      ok: true,
      [ankiResponseSymbol]: true,
    } as const,
    options
  );
}

export function isAnkiResponse(target: unknown): target is AnkiResponse<any> {
  if (target === null || typeof target !== "object") return false;
  if (ankiResponseSymbol in target) return true;
  return false;
}

export function isAnkiResponseError(
  target: unknown
): target is AnkiResponseError<any> {
  return isAnkiResponse(target) && target.ok === false;
}

export function createSuccessAnkiResponse<T>(data: T) {
  return createAnkiResponseSuccess({
    data,
    message: "ok",
    status: AnkiResponseStatus.Success,
  });
}

export function createForgottenResponse(cardIds: number[]) {
  return createAnkiResponseSuccess({
    data: cardIds,
    status: AnkiResponseStatus.Forgotten,
    message: "曾经添加过该卡片，是否做遗忘处理？(立刻将其添加到学习列表中)",
  });
}

export function createDuplicateResponse(cardIds: number[]) {
  return createAnkiResponseSuccess({
    data: cardIds,
    status: AnkiResponseStatus.Duplicate,
    message:
      "该卡片出现重复项，单击按钮复制重复卡片的ID，以在Anki Browser上快速定位(处理完毕后可再次点击该按钮进行重试)。",
  });
}

export function createFirstAddSuccessResponse(cardIds: number[]) {
  return createAnkiResponseSuccess({
    data: cardIds,
    status: AnkiResponseStatus.FirstAddSuccess,
    message: "已成功添加到Anki，是否需要立刻开始学习？",
  });
}

export function createConfigErrorResponse(message: string) {
  return createAnkiResponseError({
    data: undefined,
    status: AnkiResponseStatus.ConfigError,
    message: `${message},单击按钮可打开配置页进行相关配置，如已重新配置，则可点击重试。`,
  });
}

export function createErrorResponse(e: string | Error) {
  return createAnkiResponseError({
    data: undefined,
    status: AnkiResponseStatus.Error,
    message: typeof e === "string" ? e : e.message,
  });
}

export function createDisconnectionResponse(message: string) {
  return createAnkiResponseError({
    message,
    data: undefined,
    status: AnkiResponseStatus.Disconnect,
  });
}
