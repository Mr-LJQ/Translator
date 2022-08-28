/**
 * warning 的名称不应该改变，其会被 babel的 "babel-plugin-dev-expression" 插件替换，
 *  具体可看："https://www.npmjs.com/package/babel-plugin-dev-expression"
 */

export function warning(cond: boolean, message: string): asserts cond {
  if (!cond) {
    throw new Error(message);
  }
}
