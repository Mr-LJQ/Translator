import { transformAnkiResponseStatus } from "../transform";

/**
 * 在 AnkiResponseStatus 有新增项，但该函数并没有处理的时候报错
 */
test("正确转换 AnkiResponseStatus", () => {
  expect(() => {
    const count = 9;
    for (let i = 0; i < count; i++) {
      transformAnkiResponseStatus(i);
    }
  }).not.toThrowError();
  expect(() => {
    const count = 10;
    for (let i = 0; i < count; i++) {
      transformAnkiResponseStatus(i);
    }
  }).toThrowError();
});
