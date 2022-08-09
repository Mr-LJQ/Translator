import { AnkiResponseStatus, AnkiResponse } from "../types";
function createAnkiResponse<T>(options: AnkiResponse<T>): AnkiResponse<T> {
  return Object.assign(
    {
      __isAnkiResponse__: true,
    },
    options
  );
}

export function isAnkiResponse(target:any){
  if (target === null || typeof target !== "object") return false
  return target.__isAnkiResponse__ === true
}

//纯函数
export function createSuccessAnkiResponse<T>(data: T) {
  return createAnkiResponse({ data, status: AnkiResponseStatus.Success });
}

export function createDisconnectionResponse() {
  return createAnkiResponse<undefined>({
    status: AnkiResponseStatus.Disconnect,
  });
}

export function createRelearnSuccessResponse() {
  return createAnkiResponse({
    status: AnkiResponseStatus.Success,
  });
}

export function createForgottenResponse(cardIds: number[]) {
  return createAnkiResponse({
    data: cardIds,
    status: AnkiResponseStatus.Forgotten,
  });
}

export function createDuplicateResponse(cardIds: number[]) {
  return createAnkiResponse({
    data: cardIds,
    status: AnkiResponseStatus.Duplicate,
  });
}

export function createFirstAddSuccessResponse(cardIds: number) {
  return createAnkiResponse({
    data: cardIds,
    status: AnkiResponseStatus.FirstAddSuccess,
  });
}

export function createConfigErrorResponse() {
  return createAnkiResponse({
    status: AnkiResponseStatus.ConfigError,
  });
}

export function createOldVersionResponse() {
  return createAnkiResponse({
    status: AnkiResponseStatus.OldVersion,
  });
}

export function createAnkiErrorResponse() {
  return createAnkiResponse({
    status: AnkiResponseStatus.Error,
  });
}
