/**
 * 纯函数，过滤掉无效查询
 *  - 字符串为空的情况
 *  - 查询主体并非英文
 * @param text
 * @return 返回过滤后的字符，该字符应当是符合查询要求的
 */
export function validateText(text: string) {
  text = text.trim();

  //过滤为空的字符串
  if (!text) return false;

  //如果英文字母数量不足百分之五十，则认为其并非需要查询的内容
  const amount = text.match(/\b[a-z]+\b/gi)?.reduce((amount, item) => {
    return amount + item.length;
  }, 0);
  if (!amount || amount / text.length < 0.5) return false;

  //过滤用户对URL的复制的查询
  if (text.search(/http:|https:/gi) === 0) return false;

  return true;
}

/**
 * 纯函数，根据键提取目标对象的值，并返回新对象
 * @param target 目标对象
 * @param keys 需要提取的值所对应的键数组
 * @returns 新对象，包含目标对象特定的键的值
 */
export function pick<T extends object, K extends keyof T>(
  target: T,
  keys: K[]
): Pick<T, K> {
  const result: Pick<T, K> = {} as Pick<T, K>;
  keys.forEach((key) => {
    result[key] = target[key];
  });
  return result;
}

/**
 * 纯函数，Object.entries()的单一版本，只提取单个键的[key,value]
 * @param target 目标对象
 * @param key 需要提取的键
 * @returns [key,value]
 */
export function pickEntry<T extends object, K extends keyof T>(
  target: T,
  key: K
): [K, T[K]] {
  return [key, target[key]];
}

/**
 * 用于断言
 */
export function invariant(cond: any, message: string): asserts cond {
  if (!cond) throw new Error(message);
}

export function warning(cond: any, message: string): void {
  if (!cond) {
    if (typeof console !== "undefined") console.warn(message);
    try {
      //这样的写法是为了便于调试，能够使其支持 “在遇到异常时暂停”（如果选中该调试功能的话）
      throw new Error(message);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}

for (let i = 10; i > 0; i++) {
  if (i > 30) break;
  123456;
}
