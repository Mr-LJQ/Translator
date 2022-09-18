import {
  SearchBox,
  CursorListener,
  HotKeyListener,
  SelectionListener,
} from "@/user-operation";
import { Agent } from "./Agent";
import { ShowData } from "@/types";
import { Command } from "@/configuration";
import {
  onMessage,
  postBackend,
  onStorageChange,
  getStorageByObject,
} from "@/extensions-api";
import { validateText } from "@/utils";

//监听用户操作
const cursorListener = new CursorListener();
const { getClientPoint } = cursorListener;
const searchBox = new SearchBox(translateAndShowSearchText);
const selectionListener = new SelectionListener(translateAndShowText);
const hotKeyListener = new HotKeyListener(translateAndShowText, getClientPoint);
cursorListener.install();
searchBox.install();

//监听iframe传递的指令并进行处理
const agent = new Agent();
agent.onMessage(Command.AddNote, async (data, sendResponse) => {
  const response = await postBackend(Command.AddNote, data);
  sendResponse(response);
});
agent.onMessage(Command.RelearnNote, async (data, sendResponse) => {
  const response = await postBackend(Command.RelearnNote, data);
  sendResponse(response);
});
agent.onMessage(Command.TranslateText, function (data) {
  translateAndShowIframeText(data);
});
agent.onMessage(Command.OpenOptionsPage, function (data) {
  postBackend(Command.OpenOptionsPage, data);
});
agent.install();

/**
 * 用于处理注入脚本的翻译，其特别之处在于其point相对于浏览器窗口左上角而非视口左上角，因此需要额外的调整
 */
function showInjectScriptTranslationText(data: Required<ShowData>) {
  let { x, y } = data.point;
  //此处的x,y是鼠标相对于屏幕左上角的坐标，需要将其装换为：鼠标相对于浏览器左上角的坐标
  x -= window.screenX;
  y -= window.screenY;
  const point = { x, y };
  //point是鼠标到浏览器窗口左上角位置，所以为了获得到视口左上角位置需要进行如下处理
  point.x -= window.outerWidth - window.innerWidth;
  if (point.x < 0) point.x = x;
  point.y -= window.outerHeight - window.innerHeight;
  if (point.y < 0) point.y = y;
  agent.showTranslation({
    translatedData: data.translatedData,
    point,
  });
}
/**
 * 处理选中文本的翻译，
 * 其特别之处在于其只对英文起反应，
 * 且过滤掉输入框内的拖蓝查询
 */
async function translateAndShowText(text: string) {
  //如果正在展示翻译，则不能够通过selection进行翻译。
  //这主要是避免热键查询的情况
  if (agent.isVisible()) return;

  //过滤掉非英文
  const result = validateText(text);
  if (!result) return;

  const translatedData = await postBackend(Command.TranslateText, text);
  const point = getClientPoint();
  agent.showTranslation({ translatedData, point });
}
/**
 * 用于处理searchBox传递的数据，
 * 其特别之处在于其会对中文进行查询
 */
async function translateAndShowSearchText(text: string) {
  const translatedData = await postBackend(Command.TranslateText, text);
  const point = getClientPoint();
  agent.showTranslation({ translatedData, point });
}
/**
 * 用于处理shower传递的翻译，
 * 其特别之处在于iframe不会移动(point没有变化)
 */
async function translateAndShowIframeText(text: string) {
  const translatedData = await postBackend(Command.TranslateText, text);
  agent.showTranslation({ translatedData });
}

function openSelectionAndHotKeyListener() {
  hotKeyListener.install();
  selectionListener.install();
}

function closeSelectionAndHotKeyListener() {
  hotKeyListener.uninstall();
  selectionListener.uninstall();
}

getStorageByObject({
  switchHotkeyAndSelectionListener(value) {
    return value
      ? openSelectionAndHotKeyListener()
      : closeSelectionAndHotKeyListener();
  },
  hotKey(value) {
    return hotKeyListener.updateHotKey(value);
  },
  switchStrengthenSelectionByPressedCtrl(value) {
    return selectionListener.switchStrengthenSelectionByPressedCtrl(value);
  },
});

onStorageChange({
  switchHotkeyAndSelectionListener(_, value) {
    return value
      ? openSelectionAndHotKeyListener()
      : closeSelectionAndHotKeyListener();
  },
  hotKey(_, value) {
    return hotKeyListener.updateHotKey(value);
  },
  switchStrengthenSelectionByPressedCtrl(_, value) {
    return selectionListener.switchStrengthenSelectionByPressedCtrl(value);
  },
});

//监听后端传递的指令并进行处理
onMessage(async ({ command, data }) => {
  if (command === Command.ShowIframe) agent.showUI(getClientPoint());
  if (command === Command.OpenSearchBox) searchBox.openSearchBox();
  if (command === Command.ShowInjectTranslation)
    showInjectScriptTranslationText(data);
});
