import { AnkiResponseStatus, AnkiResponse } from "../types";
function createAnkiResponse<T>(options: AnkiResponse<T>): AnkiResponse<T> {
  return Object.assign(
    {
      __isAnkiResponse__: true,
    },
    options
  );
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
