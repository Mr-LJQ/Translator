/**
 * 用于右键菜单注入的代码
 */
import {
  CursorListener,
  SelectionListener,
  HotKeyListener,
} from "@/user-operation";

import {
  postBackend,
  getStorageByObject,
  onStorageChange,
} from "@/extensions-api";

import { validateText } from "@/utils";
import { Command } from "@/configuration";

//添加获取鼠标位置的监听
const cursorListener = new CursorListener();
const { getClientPoint, getScreenPoint } = cursorListener;
const selectionListener = new SelectionListener(translateText);

const hotKeyListener = new HotKeyListener(translateText, getClientPoint);
cursorListener.install();

async function translateText(text: string) {
  //过滤掉非英文
  const result = validateText(text);
  if (!result) return;

  const point = getScreenPoint();
  postBackend(Command.TranslateInjectText, { text, point });
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
  isOpen(value) {
    return value
      ? openSelectionAndHotKeyListener()
      : closeSelectionAndHotKeyListener();
  },
  hotKey(value) {
    return hotKeyListener.updateHotKey(value);
  },
  openStrengthenSelectionByPressedCtrl(value) {
    return selectionListener.openStrengthenSelectionByPressedCtrl(value);
  },
});

onStorageChange({
  isOpen(_, value) {
    return value
      ? openSelectionAndHotKeyListener()
      : closeSelectionAndHotKeyListener();
  },
  hotKey(_, value) {
    return hotKeyListener.updateHotKey(value);
  },
  openStrengthenSelectionByPressedCtrl(_, value) {
    return selectionListener.openStrengthenSelectionByPressedCtrl(value);
  },
});
