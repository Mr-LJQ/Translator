export { invariant, warning } from "./alert";
export { validateText } from "./validateText";
export { Messenger } from "./Messenger";
export type { PostMessage, OnMessage } from "./Messenger";

/**
 * 纯函数，Object.entries()的单一版本，只提取单个键的[key,value]
 */
export function extractEntry<T extends object, K extends keyof T>(
  target: T,
  key: K
): [K, T[K]] {
  return [key, target[key]];
}
