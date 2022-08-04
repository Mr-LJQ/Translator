import { AnkiResponseStatus,AnkiResponse } from "../types";
function createAnkiResponse<T>(options: AnkiResponse<T>): AnkiResponse<T> {
  return Object.assign(
    {
      __isAnkiResponse__: true,
    },
    options
  );
}

function handleUserConfigError(cond, type, callback) {
  if (!cond) {
    openConfigPage(type, callback);
  }
}

//纯函数
export function createSuccessAnkiResponse<T>(data: T) {
  return createAnkiResponse({ data, status: AnkiResponseStatus.Success });
}

export function createDisconnectionResponse() {
  return createAnkiResponse<undefined>({ status: AnkiResponseStatus.Disconnect });
}
