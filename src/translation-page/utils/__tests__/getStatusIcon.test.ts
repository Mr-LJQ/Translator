import { getStatusIcon } from "../getStatusIcon";

test("每一个 Status 都存在对应的图标字符", () => {
  expect(() => {
    const count = 9;
    for (let i = 0; i < count; i++) {
      getStatusIcon(i);
    }
  }).not.toThrowError();
  expect(() => {
    const count = 10;
    for (let i = 0; i < count; i++) {
      getStatusIcon(i);
    }
  }).toThrowError();
});
