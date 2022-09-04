import userEvent from "@testing-library/user-event";
import { attachSymbolToSearchContainer } from "../utils";
import { SelectionListener } from "../SelectionListener";

const mockRemoveEventListener = jest.fn();

/**
 * 由于 jsdom 在 selection 改变时不会触发 selectionchange监听，因此需要手动实现
 */
const originAddEventlistener = document.addEventListener.bind(document);
const originRemoveEventListener = document.removeEventListener.bind(document);

let prevSelection: string | undefined;
const map = new Map<(...args: any[]) => void, (...args: any[]) => void>();

jest
  .spyOn(document, "removeEventListener")
  .mockImplementation((type, listener, options) => {
    if (type === "selectionchange") {
      mockRemoveEventListener(type, listener, options);
    }

    //@ts-ignore listener在设计上保证是函数
    if (map.has(listener)) {
      //@ts-ignore listener在设计上保证是函数
      originRemoveEventListener(type, map.get(listener), options);
      return;
    }
    originRemoveEventListener(type, listener, options);
  });
jest
  .spyOn(document, "addEventListener")
  .mockImplementation((type, listener, options) => {
    if (type === "mousedown") {
      const callback = (...args: [ev: MouseEvent]) => {
        prevSelection = getSelection()?.toString();
        //@ts-ignore listener在设计上保证是函数
        return listener.apply(document, args);
      };
      //@ts-ignore listener在设计上保证是函数
      map.set(listener, callback);
      originAddEventlistener(type, callback, options);
      return;
    }
    if (type === "mouseup") {
      const callback = (...args: [ev: MouseEvent]) => {
        const currentSelection = getSelection()?.toString();
        if (currentSelection !== prevSelection) {
          document.dispatchEvent(new Event("selectionchange", {}));
        }
        //@ts-ignore listener在设计上保证是函数
        return listener.apply(document, args);
      };
      //@ts-ignore listener在设计上保证是函数
      map.set(listener, callback);
      originAddEventlistener(type, callback, options);
      return;
    }
    originAddEventlistener(type, listener, options);
  });

let selectionListener: SelectionListener;
const mockTranslationAndShowText = jest.fn();
beforeEach(() => {
  selectionListener = new SelectionListener(mockTranslationAndShowText);
  const { install } = selectionListener;
  install();
});

afterEach(() => {
  const { uninstall } = selectionListener;
  document.body.innerHTML = "";
  mockTranslationAndShowText.mockClear();
  mockRemoveEventListener.mockClear();
  uninstall();
});

test("正确双击选中翻译", async () => {
  const { dblclick } = await selectionChangeTest();
  await dblclick();
  expect(mockTranslationAndShowText).toBeCalledWith("This");
});

test("正确拖蓝选中翻译", async () => {
  const { selectText } = await selectionChangeTest();
  await selectText();
  expect(mockTranslationAndShowText).toBeCalledWith("is is");
});

test("如果没有选中任何可翻译内容，则不进行翻译", async () => {
  const { p, selectText, dblclick } = await selectionChangeTest();
  p.textContent = "                ";
  await selectText();
  await dblclick();
  expect(mockTranslationAndShowText).not.toBeCalled();
});

test("焦点位于翻译搜索框时，禁止选词翻译", async () => {
  const { p, selectText, dblclick } = await selectionChangeTest();
  attachSymbolToSearchContainer(p);
  p.tabIndex = 0;
  await selectText();
  await dblclick();
  expect(mockTranslationAndShowText).toBeCalledTimes(0);
});

test("焦点位于可输入元素时，禁止选词翻译,但可用增强热键取消该禁止", async () => {
  const { user, p, selectText, dblclick } = await selectionChangeTest();
  p.tabIndex = 0;
  p.contentEditable = "true";
  //@ts-ignore 因为在jsdom中 contentEditable = "true"并不会导致 isContentEditable === true,所以需要手动设置
  p.isContentEditable = true;
  await selectText();
  await dblclick();
  expect(mockTranslationAndShowText).toBeCalledTimes(0);

  user.keyboard("{Control>}");
  await selectText();
  user.keyboard("{/Control}");
  expect(mockTranslationAndShowText).toBeCalledWith("is is");

  user.keyboard("{Control>}");
  await dblclick();
  user.keyboard("{/Control}");
  expect(mockTranslationAndShowText).toBeCalledWith("This");
});

test("增强热键是可开关的", async () => {
  const { user, p, selectText } = await selectionChangeTest();
  const { switchStrengthenSelectionByPressedCtrl } = selectionListener;
  p.tabIndex = 0;
  p.contentEditable = "true";
  //@ts-ignore 因为在jsdom中 contentEditable = "true"并不会导致 isContentEditable === true,所以需要手动设置
  p.isContentEditable = true;

  switchStrengthenSelectionByPressedCtrl(false);

  user.keyboard("{Control>}");
  await selectText();
  user.keyboard("{/Control}");
  expect(mockTranslationAndShowText).not.toBeCalled();

  switchStrengthenSelectionByPressedCtrl(true);
  getSelection()?.removeAllRanges();
  user.keyboard("{Control>}");
  await selectText();
  user.keyboard("{/Control}");
  expect(mockTranslationAndShowText).toBeCalledWith("is is");
});

test("绑定的 selectionchange 事件如果没被调用则会被删除", async () => {
  const { dblclick } = await selectionChangeTest();
  await dblclick();
  expect(mockRemoveEventListener).toBeCalledWith(
    "selectionchange",
    expect.any(Function),
    undefined
  );
  expect(mockRemoveEventListener).toBeCalledTimes(1);
});

async function selectionChangeTest() {
  const user = userEvent.setup();
  const p = document.createElement("p");
  p.textContent = "This is Sentence.";
  document.body.append(p);
  async function selectText() {
    await user.pointer([
      { target: p, offset: 2, keys: "[MouseLeft>]" },
      { offset: 7 },
      { keys: "[/MouseLeft]" },
    ]);
  }

  async function dblclick() {
    await user.pointer({
      target: p,
      offset: 2,
      keys: "[MouseLeft][MouseLeft]",
    });
  }

  return {
    p,
    user,
    dblclick,
    selectText,
  };
}
