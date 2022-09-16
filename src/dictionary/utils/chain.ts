import { ReturnPromiseType } from "@/types";

export const NEXT_HANDLER = Symbol("next handler symbol");

/**
 * 需要遵守一个约定，处理函数如果不能够处理该任务，则应该返回/扔出一个 NEXT_HANDLER (symbol).
 *  责任链模式，遍历顺序由左到右（0，1，2，...，n）
 *    但某个函数对任务进行了处理，则其它函数不会被调用
 * 如果某个处理函数扔出一个错误，如果该错误是 NEXT_HANDLER,则调用下一个处理函数，
 *  如果不是，则退出责任链模式，让错误自然冒泡到上层。
 * @param handlers 负责进行处理的函数数组
 * @param args 传递给处理函数的参数
 * @returns 返回其中某个成功处理的结果
 */
export async function chain<
  T extends (...args: any[]) => Promise<typeof NEXT_HANDLER | any>,
  F
>(
  handlers: Array<T>,
  options: {
    args?: Parameters<T>;
    fallback?: () => F;
  }
): Promise<F | Exclude<ReturnPromiseType<T>, typeof NEXT_HANDLER>> {
  const { fallback, args = [] } = options;
  for (const handler of handlers) {
    let result;
    try {
      result = await handler(...args);
    } catch (e) {
      result = e;
    }
    if (result === NEXT_HANDLER) continue;
    return result;
  }
  if (fallback == null) throw new Error("没有任何处理函数可以处理该任务");
  return fallback();
}

chain[NEXT_HANDLER] = NEXT_HANDLER;
