import { MousePointWatcher } from "../watcher/MousePointWatcher"
import { KeyboardWatcher } from "../watcher/KeyboardWatcher"
import { SelectionWatcher } from "../watcher/SelectionWatcher"
import { validateText } from "../utils/index"

import { onStorageChange, getStorage, postBackend } from "../extensions_API/index"

//添加获取鼠标位置的监听
const mousePointWatcher = new MousePointWatcher()
const { getClientPoint, getScreenPoint } = mousePointWatcher

async function showTranslated(text: string) {
  const result = validateText(text)
  if (!result) return
  const point = getScreenPoint()
  postBackend("showInjectTranslated", { text, point })
}

const selectionWatcher = new SelectionWatcher(showTranslated)
const keyboardWatcher = new KeyboardWatcher(showTranslated, getClientPoint,)

function installAll() {
  keyboardWatcher.install()
  selectionWatcher.install()
  mousePointWatcher.install()
}

function uninstallAll() {
  keyboardWatcher.uninstall()
  selectionWatcher.uninstall()
  mousePointWatcher.uninstall()
}

getStorage({
  isOpen: (value) => value ? installAll() : uninstallAll(),
  hotKey: (value) => keyboardWatcher.updateHotKey(value),
})

onStorageChange({
  isOpen: (_, value) => value ? installAll() : uninstallAll(),
  hotKey: (_, value) => keyboardWatcher.updateHotKey(value),
})


