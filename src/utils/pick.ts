export function pick<T extends object, K extends keyof T>(
  target: T,
  keys: K[]
): Pick<T, K> {
  const result: Pick<T, K> = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      result[key] = target[key];
    }
  });
  return result;
}

/**
 * 纯函数，Object.entries()的单一版本，只提取单个键的[key,value]
 */
export function extractEntry<T extends object, K extends keyof T>(
  target: T,
  key: K
): [K, T[K]] {
  return [key, target[key]];
}
