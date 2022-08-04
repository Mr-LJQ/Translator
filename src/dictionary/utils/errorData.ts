import { ErrorData } from "../types";

function createErrorData(options: Omit<ErrorData, "type">): ErrorData {
  const target = { type: "ERROR" } as const;
  return Object.assign(target, options);
}

export function createCacography(possibleSpelling: string[]) {
  return createErrorData({
    cache: true,
    possibleSpelling,
  });
}

export function createNoCacheError(message:string) {
  return createErrorData({
    cache: false,
    message,
  });
}