//监听用户操作的模块
import { MousePointWatcher } from "../watcher/mousePointWatcher"
import { KeyboardWatcher } from "../watcher/KeyboardWatcher"
import { PopupSearchBar } from "../watcher/PopupSearchBar"
import { SelectionWatcher } from "../watcher/SelectionWatcher"

//展示模块
import { Shower } from "../shower/Shower"

import { validateText } from "../utils/index"
import { onMessage, postBackend, getStorage, onStorageChange } from "../extensions_API/index"

import { CachedOptions, Point, ShowData } from "../../types/index"

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
    this.showHostTranslated = this.showHostTranslated.bind(this)

    this.mousePointWatcher = new MousePointWatcher()
    const { getClientPoint } = this.mousePointWatcher
    this.keyboardWatcher = new KeyboardWatcher(this.showHostTranslated, getClientPoint,)
    this.popupSearchBar = new PopupSearchBar(this.showHostTranslated)
    this.selectionWatcher = new SelectionWatcher(this.showHostTranslated)

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
   * 处理主页面内容脚本的翻译展示处理请求
   * @param text 未经处理的数据，仍可能为空，为无需翻译的字符(例如：中文)
   */
  private async showHostTranslated(text: string) {
    let translatedData
    const result = validateText(text)
    if (!result) return
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
  private showInjectTranslated (data:ShowData) {
    let point = data.point
    point.x -= window.outerWidth - window.innerWidth
    point.y -= window.outerHeight - window.innerHeight
    this.previousPoint = { ...point } //保证其独立
    this.shower.showTranslation(data)
  }
}

const frontEnd = new FrontEnd()

getStorage({
  isOpen: (value: CachedOptions["isOpen"]) => value ? frontEnd.install() : frontEnd.uninstall(),
  hotKey: (value: CachedOptions["hotKey"]) => frontEnd.keyboardWatcher.updateHotKey(value),
})

onStorageChange({
  isOpen: (_, value: CachedOptions["isOpen"]) => value ? frontEnd.install() : frontEnd.uninstall(),
  hotKey: (_, value: CachedOptions["hotKey"]) => frontEnd.keyboardWatcher.updateHotKey(value),
})


