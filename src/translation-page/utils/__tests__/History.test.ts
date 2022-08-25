import { History } from "../History";

test("正确的处理数据溢出", () => {
  const history = new History<number>(5);
  for (let i = 0; i < 10; i++) {
    history.append(i);
  }
  const arr = [8, 7, 6, 5, undefined];
  arr.forEach((num) => {
    expect(history.prev()).toBe(num);
  });
  const arr2 = [6, 7, 8, 9, undefined];
  arr2.forEach((num) => {
    expect(history.next()).toBe(num);
  });
});

test("正确的更新数据", () => {
  const history = new History<number>(5);
  history.append(0);
  history.append(1);
  history.update(10);
  history.prev();
  history.update(20);
  expect(history.next()).toBe(10);
  expect(history.prev()).toBe(20);
});

test("支持多个订阅,支持移除订阅", () => {
  const history = new History<number>(5);
  const fn1 = jest.fn();
  const fn2 = jest.fn();
  const unsubscribe = history.subscribe(fn1);
  history.subscribe(fn2);
  history.append(0);
  expect(fn1).toBeCalledTimes(1);
  expect(fn2).toBeCalledTimes(1);
  unsubscribe();
  history.append(1);
  expect(fn1).toBeCalledTimes(1);
  expect(fn2).toBeCalledTimes(2);
});

test("正确的触发订阅", () => {
  const history = new History<number>(5);
  const mockedFn = jest.fn();
  history.subscribe(mockedFn);
  for (let i = 0; i < 10; i++) {
    history.append(i);
  }
  expect(mockedFn).toBeCalledTimes(10);
  expect(mockedFn).nthCalledWith(1, 0, 0, 0);
  expect(mockedFn).nthCalledWith(10, 9, 5, 9);
  mockedFn.mockClear();
  const arr = [8, 7, 6, 5, undefined];
  arr.forEach((num) => {
    expect(history.prev()).toBe(num);
  });
  expect(mockedFn).toBeCalledTimes(4);
  expect(mockedFn).nthCalledWith(3, 6, 5, 9);
  mockedFn.mockClear();
  const arr2 = [6, 7, 8, 9, undefined];
  arr2.forEach((num) => {
    expect(history.next()).toBe(num);
  });
  expect(mockedFn).toBeCalledTimes(4);
  expect(mockedFn).nthCalledWith(2, 7, 5, 9);
  mockedFn.mockClear();
});
