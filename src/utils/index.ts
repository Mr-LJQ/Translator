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

/**
 * warning 的名称不应该改变，其会被 babel的 "babel-plugin-dev-expression" 插件替换，
 *  具体可看："https://www.npmjs.com/package/babel-plugin-dev-expression"
 */

 export function warning(cond: boolean, message: string) {
  if (!cond) {
    throw new Error(message);
  }
}