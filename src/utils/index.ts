export { Cache } from "./Cache";
export { Messenger } from "./Messenger";
export { validateText } from "./validateText";
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
 * invariant,warning 的名称不应该改变，其会被 babel的 "babel-plugin-dev-expression" 插件替换，
 *  具体可看："https://www.npmjs.com/package/babel-plugin-dev-expression"
 */

export function invariant(cond: any, message: string): asserts cond {
  if (!cond) throw new Error(message);
}

export function warning(cond: boolean, message: string) {
  if (!cond) {
    if (console && typeof console.error === "function") console.error(message);
    try {
      //允许在调试代码时勾选 在遇到异常时暂停 能够捕获该错误
      throw new Error(message);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}
