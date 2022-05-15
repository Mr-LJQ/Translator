//监听用户操作的模块
import {
  CursorListener,
  HotKeyListener,
  SearchListener,
  SelectionListener
} from "../events/event-listener"

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

class FrontEnd {
  private iframe: Iframe
  searchListener: SearchListener
  hotKeyListener: HotKeyListener
  private cursorListener: CursorListener
  private selectionListener: SelectionListener
  constructor() {
    //必须绑定this
    this.showSelectionTranslation = this.showSelectionTranslation.bind(this)
    this.showSearchTranslation = this.showSearchTranslation.bind(this)

    //监听用户操作
    this.cursorListener = new CursorListener()
    const { getCursorPosition } = this.cursorListener
    this.hotKeyListener = new HotKeyListener(this.showSelectionTranslation, getCursorPosition,)
    this.selectionListener = new SelectionListener(this.showSelectionTranslation)
    this.searchListener = new SearchListener(this.showSearchTranslation)

    //监听iframe传递的指令并进行处理
    const iframe = this.iframe = new Iframe()
    iframe.onMessage(Command.AddNote, async (data, sendResponse) => {
      let response = await postBackend(Command.AddNote, data)
      sendResponse(response)
    })
    iframe.onMessage(Command.RelearnNote, async (data, sendResponse) => {
      let response = await postBackend(Command.RelearnNote, data)
      sendResponse(response)
    })
    iframe.onMessage(Command.TranslateText, (data) => {
      this.showShowerTranslation(data)
    })

    //监听后端传递的指令并进行处理
    onMessage(async ({ command, data }, callback) => {
      if (command === Command.ShowInjectTranslation) this.showInjectTranslation(data)
      if (command === Command.SwitchSearchBar) this.searchListener.toggleSearchBar()
      if (command === Command.ShowIframe) iframe.showUI(getCursorPosition())
    })

    //必要的加载
    iframe.install()
    this.cursorListener.install()
    this.searchListener.install()
  }

  install() {
    let { hotKeyListener, selectionListener } = this
    hotKeyListener.install()
    selectionListener.install()
  }

  uninstall() {
    let { hotKeyListener, selectionListener} = this
    hotKeyListener.uninstall()
    selectionListener.uninstall()
  }

  /**
   * 处理选中文本的翻译，其特别之处在于其只对英文起反应，且过滤掉输入框内的拖蓝查询
   */
  private async showSelectionTranslation(text: string) {
    let translatedData

    //如果正在展示翻译，则不能够通过selection进行翻译。
    //这主要是避免热键查询的情况
    if (this.iframe.isVisible()) return

    const focusNode = document.activeElement?.nodeName || ""
    const filterNodeName = ["INPUT", "TEXTAREA"]
    //过滤掉输入框中的文本选中
    if (filterNodeName.includes(focusNode)) return
    //过滤掉非英文
    const result = validateText(text)
    if (!result) return
    translatedData = await postBackend(Command.TranslateText, text)
    const point = this.cursorListener.getCursorPosition()
    this.iframe.showTranslation({ translatedData, point })
  }

  /**
   * 用于处理searchBar传递的数据，其特别之处在于其会对中文进行查询
   */
  private async showSearchTranslation(text: string) {
    let translatedData
    translatedData = await postBackend(Command.TranslateText, text)
    const point = this.cursorListener.getCursorPosition()
    this.iframe.showTranslation({ translatedData, point })
  }

  /**
   * 用于处理shower传递的翻译，其特别之处在于iframe不会移动(point没有变化),只支持英文
   * @param text 待翻译文本
   * @returns 
   */
  private async showShowerTranslation(text: string) {
    let translatedData
    const result = validateText(text)
    if (!result) return
    translatedData = await postBackend(Command.TranslateText, text)
    this.iframe.showTranslation({ translatedData })
  }
  /**
   * 用于处理注入脚本的翻译，其特别之处在于其point相对于浏览器窗口左上角而非视口左上角
   */
  private showInjectTranslation(data: ShowData) {
    let point = { ...data.point! }
    //point是鼠标到浏览器窗口左上角位置，所以为了获得到视口左上角位置需要进行额外处理
    point.x -= window.outerWidth - window.innerWidth
    point.y -= window.outerHeight - window.innerHeight
    this.iframe.showTranslation({ translatedData: data.translatedData, point })
  }
}

const frontEnd = new FrontEnd()

getStorage({
  isOpen: (value) => value ? frontEnd.install() : frontEnd.uninstall(),
  hotKey: (value) => frontEnd.hotKeyListener.updateHotKey(value as Storage["hotKey"]),
})

onStorageChange({
  isOpen: (_, value) => value ? frontEnd.install() : frontEnd.uninstall(),
  hotKey: (_, value) => frontEnd.hotKeyListener.updateHotKey(value as Storage["hotKey"]),
})

