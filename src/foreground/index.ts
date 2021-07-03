//监听用户操作的模块
import { MousePointWatcher } from "../watcher/MousePointWatcher"
import { KeyboardWatcher } from "../watcher/KeyboardWatcher"
import { PopupSearchBar } from "../watcher/PopupSearchBar"
import { SelectionWatcher } from "../watcher/SelectionWatcher"

//展示模块
import { Shower } from "../shower/Shower"

import { validateText } from "../utils/index"
import { onMessage, postBackend, getStorage, onStorageChange } from "../extensions_API/index"

import { Point, ShowData, Storage } from "../../types/index"

class FrontEnd {
  private shower: Shower
  popupSearchBar: PopupSearchBar
  keyboardWatcher: KeyboardWatcher
  private selectionWatcher: SelectionWatcher
  private mousePointWatcher: MousePointWatcher
  private previousPoint: Point | null
  constructor() {
    //必须绑定this
    this.handler = this.handler.bind(this)
    this.showSelectionTranslated = this.showSelectionTranslated.bind(this)
    this.showSearchTranslated = this.showSearchTranslated.bind(this)

    this.mousePointWatcher = new MousePointWatcher()
    const { getClientPoint } = this.mousePointWatcher
    this.keyboardWatcher = new KeyboardWatcher(this.showSelectionTranslated, getClientPoint,)
    this.selectionWatcher = new SelectionWatcher(this.showSelectionTranslated)
    this.popupSearchBar = new PopupSearchBar(this.showSearchTranslated)

    //监听展示模块传递的指令，并进行处理
    this.shower = new Shower(this.handler)

    //监听后端传递的指令并进行处理
    onMessage(this.handler)

    //用于保证在shower中进行查询时，shower的位置不移动
    this.previousPoint = null
  }

  async handler(message: any, sendResponse: any): Promise<void> {
    const { command, data } = message
    let response
    switch (command) {
      case "addNote":
        response = await postBackend("addNote", data)
        sendResponse(response)
        break;
      case "relearnNote":
        response = await postBackend("relearnNote", data)
        sendResponse(response)
        break;
      case "switchSearchBar":
        this.popupSearchBar.toggleSearchBar()
        break;
      case "showTranslated":
        this.showShowerTranslated(data)
        break
      case "showInjectTranslated":
        this.showInjectTranslated(data)
        break
      default:
        throw new Error("存在未处理的指令:" + command)
    }
  }

  install() {
    let { keyboardWatcher, selectionWatcher, shower, mousePointWatcher } = this
    selectionWatcher.install()
    keyboardWatcher.install()
    shower.install()
    mousePointWatcher.install()
  }

  uninstall() {
    let { keyboardWatcher, selectionWatcher, shower, mousePointWatcher } = this
    selectionWatcher.uninstall()
    keyboardWatcher.uninstall()
    shower.uninstall()
    mousePointWatcher.uninstall()
  }


  /**
   * 处理选中文本的翻译，其特别之处在于其只对英文起反应，且过滤掉输入框内的拖蓝查询
   */
  private async showSelectionTranslated(text: string) {
    let translatedData
    const focusNode = document.activeElement?.nodeName || ""
    const filterNodeName = ["INPUT", "TEXTAREA"]
    //过滤掉输入框中的文本选中
    if (filterNodeName.includes(focusNode)) return
    const result = validateText(text)
    if (!result) return
    translatedData = await postBackend("translateText", text)
    const point = this.mousePointWatcher.getClientPoint()
    this.previousPoint = { ...point }
    this.shower.showTranslation({ translatedData, point })
  }

  /**
   * 用于处理searchBar传递的数据，其特别之处在于其会对中文进行查询
   */
  private async showSearchTranslated(text: string) {
    let translatedData
    translatedData = await postBackend("translateText", text)
    const point = this.mousePointWatcher.getClientPoint()
    this.previousPoint = { ...point }
    this.shower.showTranslation({ translatedData, point })
  }

  /**
   * 用于处理shower传递的翻译，其特别之处在于iframe不会移动(point没有变化)
   * @param text 待翻译文本
   * @returns 
   */
  private async showShowerTranslated(text: string) {
    let translatedData
    const result = validateText(text)
    if (!result) return
    translatedData = await postBackend("translateText", text)
    const point = this.previousPoint as Point //必定有值
    this.shower.showTranslation({ translatedData, point })
  }
  /**
   * 用于处理注入脚本的翻译，其特别之处在于其point相对于浏览器窗口左上角而非视口左上角
   */
  private showInjectTranslated(data: ShowData) {
    let point = data.point
    //point是鼠标到浏览器窗口左上角位置，所以为了获得到视口左上角位置需要进行额外处理
    point.x -= window.outerWidth - window.innerWidth
    point.y -= window.outerHeight - window.innerHeight
    this.previousPoint = { ...point } //保证其独立
    this.shower.showTranslation(data)
  }
}

const frontEnd = new FrontEnd()

getStorage({
  isOpen: (value) => value ? frontEnd.install() : frontEnd.uninstall(),
  hotKey: (value) => frontEnd.keyboardWatcher.updateHotKey(value as Storage["hotKey"]),
})

onStorageChange({
  isOpen: (_, value) => value ? frontEnd.install() : frontEnd.uninstall(),
  hotKey: (_, value) => frontEnd.keyboardWatcher.updateHotKey(value as Storage["hotKey"]),
})


