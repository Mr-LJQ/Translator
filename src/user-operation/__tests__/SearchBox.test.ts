/* eslint-disable testing-library/no-node-access */
import userEvent from "@testing-library/user-event";
import { within } from "@testing-library/react";
import { isSearchContainer } from "../utils";
import { SearchBox } from "../SearchBox";

let searchBox: SearchBox;
const mockTranslationAndShowText = jest.fn();
beforeEach(() => {
  searchBox = new SearchBox(mockTranslationAndShowText);
  const { install } = searchBox;
  install();
});

afterEach(() => {
  const { uninstall } = searchBox;
  mockTranslationAndShowText.mockClear();
  uninstall();
});

test("输入文本后按下Enter键进行翻译", async () => {
  const { openSearchBox } = searchBox;
  const user = userEvent.setup();
  openSearchBox();
  await user.keyboard("   This is Sentence.   {Enter}");
  expect(mockTranslationAndShowText).toBeCalledWith("This is Sentence.");
});

test("调用 openSearchBox 后聚焦并全选", () => {
  const { openSearchBox } = searchBox;
  //因为jsdom 不支持 select()拖蓝后输入清空原有输入，因此通过该方法测试有无调用.select()
  const originSelect = HTMLInputElement.prototype.select;
  const mockSelect = jest.fn();
  HTMLInputElement.prototype.select = mockSelect;
  openSearchBox();
  expect(document.querySelector("div")!).toHaveFocus();
  expect(mockSelect).toBeCalled();
  HTMLInputElement.prototype.select = originSelect;
});

test("点击关闭按钮，隐藏搜索框并清空搜索框", async () => {
  const { openSearchBox } = searchBox;
  const user = userEvent.setup();
  const form = document
    .querySelector("div")!
    .shadowRoot!.querySelector("form")!;
  const formContainer = within(form);
  openSearchBox();
  await user.keyboard("word{Enter}");
  expect(mockTranslationAndShowText).toBeCalledWith("word");
  await user.click(formContainer.getByRole("button"));
  expect(form).toHaveStyle("display:none");
  expect(formContainer.getByRole("textbox", { hidden: true })).toHaveValue("");
});

test("调用 uninstall 会隐藏 form", async () => {
  const { uninstall, install, openSearchBox } = searchBox;
  const form = document
    .querySelector("div")!
    .shadowRoot!.querySelector("form")!;
  openSearchBox();
  uninstall();
  install();
  expect(form).toHaveStyle("display:none");
});

test("为容器添加了作为searchBox的标识", () => {
  const div = document.querySelector("div");
  expect(isSearchContainer(div)).toBeTruthy();
});
