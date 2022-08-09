/**
 * invariant 与 warning 的名称不应该改变，其会被 babel的 "babel-plugin-dev-expression" 插件替换，
 *  具体可看："https://www.npmjs.com/package/babel-plugin-dev-expression"
 */

export function invariant(cond: boolean, message: string) {
  if (!cond) throw new Error(message);
}

export function warning(cond: boolean, message: string) {
  if (!cond) {
    if (typeof console !== "undefined") console.warn(message);

    try {
      //这样的写法是为了便于调试，能够使其支持 “在遇到异常时暂停”（如果选中该调试功能的话）
      throw new Error(message);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}
