import userEvent from "@testing-library/user-event";
import { HotKeyListener } from "../HotKeyListener";
import { getRangeFromPoint } from "../utils/getRangeFromPoint";
import { attachSymbolToSearchContainer } from "../utils";

const mockGetRangeFromPoint = jest.mocked(getRangeFromPoint);
jest.mock("../utils/getRangeFromPoint");

const mockTranslationAndShowText = jest.fn();
const mockGetPoint = jest.fn();

let hotKeyListener: HotKeyListener;
beforeEach(() => {
  hotKeyListener = new HotKeyListener(mockTranslationAndShowText, mockGetPoint);
  //为了测试 install 的 this 绑定
  const { install } = hotKeyListener;
  install();
});

afterEach(() => {
  const { uninstall } = hotKeyListener;
  uninstall();
  document.body.innerHTML = "";
  mockGetPoint.mockReset();
  mockGetRangeFromPoint.mockReset();
  mockTranslationAndShowText.mockReset();
});

test("按下热键,单词变为拖蓝选中状态，然后翻译该单词", async () => {
  const user = userEvent.setup();
  const { updateHotKey } = hotKeyListener;
  const textNode = document.createTextNode("This is_Sentence.(add-on)");
  setGetRangeFromPoint(textNode);
  mockGetPoint.mockReturnValueOnce({ x: 2, y: 1 });
  mockGetPoint.mockReturnValueOnce({ x: 4, y: 1 });
  mockGetPoint.mockReturnValueOnce({ x: 6, y: 2 });
  mockGetPoint.mockReturnValueOnce({ x: 10, y: 3 });
  mockGetPoint.mockReturnValueOnce({ x: 21, y: 3 });

  /**
   * 拖延应该自动拓展，以选取到整个单词
   */
  await user.keyboard("{Shift}");
  expect(mockTranslationAndShowText).toBeCalledWith("This");

  /**
   * 如果还有其它辅助按键也处于按下的状态，则意味着用户希望进行的动作并非热键选中
   */

  /**
   * 鼠标位于非英文字符上时，选中的是空字符串，这应该导致上一个拖蓝消失(如果有的话)
   *  然后翻译函数不会被调用（因为没有任何选中的文本）
   */
  await user.keyboard("{Shift}");
  expect(getSelection()!.toString()).toBe("");
  expect(mockTranslationAndShowText).toBeCalledTimes(1);

  /**
   * 测试 updateHotKey 函数
   */
  updateHotKey("altKey");
  mockGetPoint.mockClear();
  await user.keyboard("{Shift}");
  expect(mockGetPoint).not.toBeCalled();
  await user.keyboard("{Alt}");
  expect(mockTranslationAndShowText).toBeCalledTimes(2);
  expect(mockTranslationAndShowText).toBeCalledWith("is");

  updateHotKey("ctrlKey");
  mockGetPoint.mockClear();
  await user.keyboard("{Alt}");
  expect(mockGetPoint).not.toBeCalled();
  await user.keyboard("{Control}");
  expect(mockTranslationAndShowText).toBeCalledTimes(3);
  expect(mockTranslationAndShowText).toBeCalledWith("Sentence");

  //自动拓展支持 -,某些情况下 add-on 属于一个完整的单词
  await user.keyboard("{Control}");
  expect(mockTranslationAndShowText).toBeCalledTimes(4);
  expect(mockTranslationAndShowText).toBeCalledWith("add-on");
});

test("焦点处于翻译搜索框时不进行热键翻译", async () => {
  const user = userEvent.setup();
  const div = document.createElement("div");
  div.tabIndex = 0;
  const textNode = document.createTextNode("This is_Sentence.(add-on)");
  div.append(textNode);
  document.body.append(div);
  const range = new Range();
  mockGetRangeFromPoint.mockImplementation((x) => {
    range.setStart(textNode, x);
    return range;
  });
  mockGetPoint.mockReturnValue({ x: 2, y: 1 });
  div.focus();
  await user.keyboard("{Shift}");
  expect(mockTranslationAndShowText).toBeCalledWith("This");
  attachSymbolToSearchContainer(div);
  div.focus();
  await user.keyboard("{Shift}");
  expect(mockTranslationAndShowText).toBeCalledTimes(1);
  mockGetPoint.mockClear();
  expect(mockGetPoint).not.toBeCalled();
});

test("焦点处于可编辑框时不进行热键翻译", async () => {
  const user = userEvent.setup();
  const div = document.createElement("div");
  div.tabIndex = 0;
  const textNode = document.createTextNode("This is_Sentence.(add-on)");
  div.append(textNode);
  document.body.append(div);
  const range = new Range();
  mockGetRangeFromPoint.mockImplementation((x) => {
    range.setStart(textNode, x);
    return range;
  });
  mockGetPoint.mockReturnValue({ x: 2, y: 1 });
  div.focus();
  await user.keyboard("{Shift}");
  expect(mockTranslationAndShowText).toBeCalledWith("This");
  //@ts-ignore 因为设置 contentEditable ="true" ，不能够使得 isContentEditable 变为 true，所以手动设置
  div.isContentEditable = true;
  div.focus();
  await user.keyboard("{Shift}");
  expect(mockTranslationAndShowText).toBeCalledTimes(1);
  mockGetPoint.mockClear();
  expect(mockGetPoint).not.toBeCalled();
  const input = document.createElement("input");
  const textarea = document.createElement("textarea");
  document.body.append(input, textarea);
  input.focus();
  await user.keyboard("{Shift}");
  expect(mockTranslationAndShowText).toBeCalledTimes(1);
  mockGetPoint.mockClear();
  expect(mockGetPoint).not.toBeCalled();
  textarea.focus();
  await user.keyboard("{Shift}");
  expect(mockTranslationAndShowText).toBeCalledTimes(1);
  mockGetPoint.mockClear();
  expect(mockGetPoint).not.toBeCalled();
});

test("非文本节点处理", async () => {
  const user = userEvent.setup();
  const div = document.createElement("div");
  div.textContent = "This is_Sentence.(add-on)";
  setGetRangeFromPoint(div);
  mockGetPoint.mockReturnValueOnce({ x: 0, y: 1 });
  await user.keyboard("{Shift}");
  expect(mockTranslationAndShowText).not.toBeCalled();
});

test("突破 user-select:none 样式的限制", async () => {
  const user = userEvent.setup();
  const { uninstall } = hotKeyListener;
  const div = document.createElement("div");
  const textNode = document.createTextNode("This is_Sentence.(add-on)");
  div.append(textNode);
  div.style.setProperty("user-select", "none", "important");
  document.body.append(div);
  const range = new Range();
  mockGetRangeFromPoint.mockImplementation((x) => {
    range.setStart(textNode, x);
    return range;
  });
  mockGetPoint.mockReturnValueOnce({ x: 2, y: 1 });
  await user.keyboard("{Shift}");
  expect(mockTranslationAndShowText).toBeCalledWith("This");
  expect(div).toHaveStyle("user-select:text");
  uninstall();
  expect(div).toHaveStyle("user-select: none");
});

test("只有在仅按下热键，而没按着其它辅助剂时，才进行热键翻译", async () => {
  const user = userEvent.setup();
  const textNode = document.createTextNode("This is_Sentence.(add-on)");
  setGetRangeFromPoint(textNode);
  mockGetPoint.mockReturnValue({ x: 2, y: 1 });

  await user.keyboard("{Shift}");
  expect(mockTranslationAndShowText).toBeCalledWith("This");

  mockGetPoint.mockClear();
  await user.keyboard("{Control>}{Shift}");
  expect(mockGetPoint).not.toBeCalled();

  await user.keyboard("{Alt>}{Shift}");
  expect(mockGetPoint).not.toBeCalled();

  await user.keyboard("{Control>}{Alt>}{Shift}");
  expect(mockGetPoint).not.toBeCalled();
});

function setGetRangeFromPoint(node: Node) {
  document.body.append(node);
  const range = new Range();
  mockGetRangeFromPoint.mockImplementation((x) => {
    range.setStart(node, x);
    return range;
  });
}
