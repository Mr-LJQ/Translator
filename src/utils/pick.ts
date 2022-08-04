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
