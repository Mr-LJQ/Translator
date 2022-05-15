import { CursorListener,HotKeyListener,SelectionListener } from "../events/event-listener"
import { validateText } from "../utils/tools"

import { onStorageChange, getStorage, postBackend } from "../utils/extensions-api"


import type {Storage} from "../utils/extensions-api"

import {Command} from "../utils/command"


//添加获取鼠标位置的监听
const cursorListener = new CursorListener()
const { getCursorPosition } = cursorListener

async function showTranslated(text: string) {
  const result = validateText(text)
  if (!result) return
  const point = getCursorPosition()
  postBackend(Command.TranslateInjectText, { text, point })
}

const selectionListener = new SelectionListener(showTranslated)
const hotKeyListener = new HotKeyListener(showTranslated, getCursorPosition,)

function installAll() {
  hotKeyListener.install()
  selectionListener.install()
  cursorListener.install()
}

function uninstallAll() {
  hotKeyListener.uninstall()
  selectionListener.uninstall()
  cursorListener.uninstall()
}

getStorage({
  isOpen: (value) => value ? installAll() : uninstallAll(),
  hotKey: (value) => hotKeyListener.updateHotKey(value as Storage["hotKey"]),
})

onStorageChange({
  isOpen: (_, value) => value ? installAll() : uninstallAll(),
  hotKey: (_, value) => hotKeyListener.updateHotKey(value as Storage["hotKey"]),
})


