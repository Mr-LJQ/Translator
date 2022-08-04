//监听用户操作的模块
import {
  CursorListener,
  HotKeyListener,
  SearchListener,
  SelectionListener
} from "../user-operation"

//展示模块
import { Iframe } from "../iframe/iframe"

//指令常量
import { Command } from "../utils/command"
//通用函数
import { validateText } from "../utils/tools"
//浏览器拓展API
import { onMessage, postBackend, getStorage, onStorageChange } from "../utils/extensions-api"

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//声明引入
import type { ShowData } from "../iframe/iframe"
import type { Storage } from "../utils/extensions-api"
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//前端脚本，用于处于前后端通信以及与Iframe的通信

//监听用户操作
const cursorListener = new CursorListener()
const { getCursorPosition } = cursorListener
const hotKeyListener = new HotKeyListener(translateAndShowText, getCursorPosition,)
const selectionListener = new SelectionListener(translateAndShowText)
const searchListener = new SearchListener(translateAndShowSearchText)

cursorListener.install()
searchListener.install()


//监听iframe传递的指令并进行处理
const iframe = new Iframe()

iframe.onMessage(Command.AddNote, async (data, sendResponse) => {
  let response = await postBackend(Command.AddNote, data)
  sendResponse(response)
})
iframe.onMessage(Command.RelearnNote, async (data, sendResponse) => {
  let response = await postBackend(Command.RelearnNote, data)
  sendResponse(response)
})
iframe.onMessage(Command.TranslateText, (data) => {
  translateAndShowIframeText(data)
})
iframe.install()

//监听后端传递的指令并进行处理
onMessage(async ({ command, data }, callback) => {
  if (command === Command.ShowInjectTranslation) showInjectTranslation(data)
  if (command === Command.SwitchSearchBar) searchListener.toggleSearchBar()
  if (command === Command.ShowIframe) iframe.showUI(getCursorPosition())
})

getStorage({
  isOpen: (value) => value ? openSelectionAndHotKeyListener() : closeSelectionAndHotKeyListener(),
  hotKey: (value) => hotKeyListener.updateHotKey(value as Storage["hotKey"]),
})

onStorageChange({
  isOpen: (_, value) => value ? openSelectionAndHotKeyListener() : closeSelectionAndHotKeyListener(),
  hotKey: (_, value) => hotKeyListener.updateHotKey(value as Storage["hotKey"]),
})

/**
 * 用于处理注入脚本的翻译，其特别之处在于其point相对于浏览器窗口左上角而非视口左上角，因此需要额外的调整
 */
function showInjectTranslation(data: ShowData) {
  let point = { ...data.point! }
  //point是鼠标到浏览器窗口左上角位置，所以为了获得到视口左上角位置需要进行额外处理
  point.x -= window.outerWidth - window.innerWidth
  point.y -= window.outerHeight - window.innerHeight
  iframe.showTranslation({ translatedData: data.translatedData, point })
}

/**
   * 处理选中文本的翻译，
   * 其特别之处在于其只对英文起反应，
   * 且过滤掉输入框内的拖蓝查询
   */
async function translateAndShowText(text: string) {
  let translatedData
  //如果正在展示翻译，则不能够通过selection进行翻译。
  //这主要是避免热键查询的情况
  if (iframe.isVisible()) return

  //过滤掉非英文
  const result = validateText(text)
  if (!result) return

  translatedData = await postBackend(Command.TranslateText, text)
  const point = getCursorPosition()
  iframe.showTranslation({ translatedData, point })
}

/**
 * 用于处理searchBar传递的数据，
 * 其特别之处在于其会对中文进行查询
 */
async function translateAndShowSearchText(text: string) {
  let translatedData
  translatedData = await postBackend(Command.TranslateText, text)
  const point = getCursorPosition()
  iframe.showTranslation({ translatedData, point })
}

/**
 * 用于处理shower传递的翻译，
 * 其特别之处在于iframe不会移动(point没有变化),只支持英文
 * @param text 待翻译文本
 * @returns 
 */
async function translateAndShowIframeText(text: string) {
  let translatedData
  //过滤掉非英文
  const result = validateText(text)
  if (!result) return
  translatedData = await postBackend(Command.TranslateText, text)
  iframe.showTranslation({ translatedData })
}

function openSelectionAndHotKeyListener() {
  hotKeyListener.install()
  selectionListener.install()
}

function closeSelectionAndHotKeyListener() {
  hotKeyListener.uninstall()
  selectionListener.uninstall()
}



