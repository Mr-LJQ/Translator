import { Cache } from "../Cache";

interface Handler<K = number, V = number> {
  cache: Cache<K, V>;
  set: Cache<K, V>["set"];
  get: Cache<K, V>["get"];
  create: (capacity: number) => void;
}

type TestData<K = number, V = number> = [
  ["create", [number]],
  ...Array<["get", [K]] | ["set", [K, V]]>
];

const handler: Handler = {
  cache: null!,
  create(capacity: number) {
    this.cache = new Cache(capacity);
    return null;
  },
  get(...args) {
    return this.cache.get(...args);
  },
  set(...args) {
    this.cache.set(...args);
    return null;
  },
};

test("存储容量应该大于等于1", () => {
  expect(() => {
    new Cache(0);
  }).toThrowError(expect.anything());
  expect(() => {
    new Cache(1);
  }).not.toThrowError();
});

test("如果值存在，则返回该值，否则返回 -1", () => {
  const cache = new Cache(2);
  cache.set(1, 1);
  cache.set(2, 2);
  expect(cache.get(1)).toBe(1);
  expect(cache.get(2)).toBe(2);
  expect(cache.get(3)).toBe(-1);
});

test("如果值存在，则替换值", () => {
  const cache = new Cache(2);
  cache.set(1, 1);
  cache.set(2, 2);
  cache.set(1, 10);
  expect(cache.get(1)).toBe(10);
  expect(cache.get(2)).toBe(2);
});

test("如果对值进行了访问，则更新该值的新鲜度", () => {
  const cache = new Cache(2);
  cache.set(1, 1);
  cache.set(2, 2);
  cache.get(1);
  cache.set(3, 3);
  expect(cache.get(2)).toBe(-1);
  expect(cache.get(1)).toBe(1);
  expect(cache.get(3)).toBe(3);
});

test("如果对值进行了更新，则更新该值的新鲜度", () => {
  const cache = new Cache(2);
  cache.set(1, 1);
  cache.set(2, 2);
  cache.set(1, 1);
  cache.set(3, 3);
  expect(cache.get(2)).toBe(-1);
  expect(cache.get(1)).toBe(1);
  expect(cache.get(3)).toBe(3);
});

test("如果缓存的数据量达到上限，则移除最近最少访问的值后再添加", () => {
  const testOperations: TestData[] = [
    [
      ["create", [5]],
      ["set", [1, 1]],
      ["set", [2, 2]],
      ["set", [3, 3]],
      ["set", [4, 4]],
      ["set", [5, 5]],
      ["set", [6, 6]],
      ["set", [7, 7]],
      ["set", [8, 8]],
      ["get", [1]],
      ["get", [2]],
      ["get", [3]],
      ["get", [4]],
      ["get", [5]],
      ["get", [6]],
      ["get", [7]],
      ["get", [8]],
    ],
    [
      ["create", [2]],
      ["set", [1, 1]],
      ["set", [2, 2]],
      ["get", [1]],
      ["set", [3, 3]],
      ["get", [2]],
      ["set", [4, 4]],
      ["get", [1]],
      ["get", [3]],
      ["set", [4, 44]],
      ["set", [5, 55]],
      ["get", [3]],
      ["get", [5]],
      ["get", [4]],
      ["set", [6, 6]],
      ["get", [4]],
      ["get", [5]],
    ],
  ];
  const ansList = [
    [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      -1,
      -1,
      -1,
      4,
      5,
      6,
      7,
      8,
    ],
    [
      null,
      null,
      null,
      1,
      null,
      -1,
      null,
      -1,
      3,
      null,
      null,
      -1,
      55,
      44,
      null,
      44,
      -1,
    ],
  ];
  for (const [idx, item] of testOperations.entries()) {
    const ans = [];
    for (const [method, args] of item) {
      //@ts-ignore
      const result = handler[method](...args);
      ans.push(result);
    }
    expect(ans).toEqual(ansList[idx]);
  }
});
