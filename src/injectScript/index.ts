import { CursorListener, HotKeyListener, SelectionListener } from "../user-operation"

import { Command } from "../utils/command"
import { validateText } from "../utils/tools"
import { onStorageChange, getStorage, postBackend } from "../utils/extensions-api"

import type { Storage } from "../utils/extensions-api"

//添加获取鼠标位置的监听
const cursorListener = new CursorListener()
const { getClientPoint,getScreenPoint } = cursorListener
const selectionListener = new SelectionListener(translateText)
const hotKeyListener = new HotKeyListener(translateText, getClientPoint,)

cursorListener.install()

async function translateText(text: string) {
  //过滤掉非英文
  const result = validateText(text)
  if (!result) return

  const point = getScreenPoint()
  postBackend(Command.TranslateInjectText, { text, point })
}

function openSelectionAndHotKeyListener() {
  hotKeyListener.install()
  selectionListener.install()
}

function closeSelectionAndHotKeyListener() {
  hotKeyListener.uninstall()
  selectionListener.uninstall()
}

getStorage({
  isOpen: (value) => value ? openSelectionAndHotKeyListener() : closeSelectionAndHotKeyListener(),
  hotKey: (value) => hotKeyListener.updateHotKey(value as Storage["hotKey"]),
})

onStorageChange({
  isOpen: (_, value) => value ? openSelectionAndHotKeyListener() : closeSelectionAndHotKeyListener(),
  hotKey: (_, value) => hotKeyListener.updateHotKey(value as Storage["hotKey"]),
})


