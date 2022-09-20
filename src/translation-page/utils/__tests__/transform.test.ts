import { transformAnkiResponseStatus } from "../transform";

test("检查：transformAnkiResponseStatus 函数", () => {
  //如果 AnkiResponseStatus 有删减，也无法通过测试，要将删减后的个数同步到这里
  const count = 6;
  for (let i = 0; i <= count; i++) {
    expect(transformAnkiResponseStatus(i)).toBeDefined();
  }
  //及时处理新增项转换
  expect(transformAnkiResponseStatus(count + 1)).toBeUndefined();
});
