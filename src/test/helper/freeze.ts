function isObject(target: unknown): target is Record<string, unknown> {
  return Object(target) === target;
}

export function freezeAll<T>(target: T): T {
  if (!isObject(target)) return target;
  Object.freeze(target);
  Object.keys(target).forEach((key) => {
    freezeAll(target[key]);
  });
  return target;
}
