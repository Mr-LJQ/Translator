//监听用户操作的模块
import { KeyboardWatcher } from "../watcher/KeyboardWatcher"
import { PopupSearchBar } from "../watcher/PopupSearchBar"
import { SelectionWatcher } from "../watcher/SelectionWatcher"

//展示模块
import { Shower } from "../shower/Shower"

import { postBackend, onMessage,Cacher } from "../utils/index"

import { CachedOptions } from "../../types/index"

class FrontEnd {
  keyboardWatcher:KeyboardWatcher
  popupSearchBar:PopupSearchBar
  private selectionChange
  private shower:Shower
  constructor() {
    //必须绑定this
    this.showTranslated = this.showTranslated.bind(this)
    this.handler = this.handler.bind(this)

    this.keyboardWatcher = new KeyboardWatcher(this.showTranslated)
    this.popupSearchBar = new PopupSearchBar(this.showTranslated)
    this.selectionChange = new SelectionWatcher(this.showTranslated)

    //监听展示模块传递的指令，并进行处理
    this.shower = new Shower(this.handler)

    //监听后端传递的指令并进行处理
    onMessage(this.handler)
  }

  async handler(message: any, sendResponse: any):Promise<void> {
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
      case "showTranslated":
        this.showTranslated(data)
        break
      case "switchSearchBar":
        this.popupSearchBar.toggleSearchBar()
        break;
      
      default:
        throw new Error("存在未处理的指令:" + command)
    }
  }

  install() {
    let { keyboardWatcher, selectionChange, shower } = this
    selectionChange.install()
    keyboardWatcher.install()
    shower.install()
  }

  uninstall() {
    let { keyboardWatcher, selectionChange, shower } = this
    selectionChange.uninstall()
    keyboardWatcher.uninstall()
    shower.uninstall()
  }
  //缓存翻译
  cacher = new Cacher(5)
  /**
   * 向后端发送获取翻译的请求，之后将请求传递给展示模块展示
   * @param text 未经处理的数据，仍可能为空，为无需翻译的字符(例如：中文)
   */
  private async showTranslated(text: string) {
    let translated
    const result = validateText(text)
    if (!result) return
    translated = this.cacher.get(text)
    if (!translated) {
      translated = await postBackend("translateText", text)
      //字符串为错误信息，不对错误信息进行缓存
      if (typeof translated !== "string"){
        this.cacher.set(text,translated)
      } 
    }
    this.shower.showTranslation(translated)
  }

}
 /**
   * 纯函数，过滤掉无效查询
   *  - 字符串为空的情况
   *  - 查询主体并非英文
   * @param text 
   * @return 返回过滤后的字符，该字符应当是符合查询要求的
   */
function validateText(text: string) {
  text = text.trim()

  //过滤为空的字符串
  if (!text) return false

  //如果英文字母数量不足百分之五十，则认为其并非需要查询的内容
  const amount = text.match(/\b[a-z]+\b/ig)?.reduce((amount, item) => {
    return amount + item.length
  }, 0)
  if (!amount || (amount / text.length < 0.5)) return false

  //过滤用户对URL的复制的查询
  if (text.search(/http:|https:/gi) === 0) return false

  //存在3个以上换行符时，用户可能只是进行复制粘贴操作，过滤掉
  const nLength = text.match(/\n/g)?.length
  if (nLength && nLength > 3) return false  

  return true
}

const frontEnd = new FrontEnd()
//根据默认值决定是否开启内容脚本
const cacheOptions: Partial<CachedOptions> = {
  isOpen: true,//设置默认值
  hotKey: "shiftKey"//设置默认值
}
chrome.storage.local.get(cacheOptions, ({
  isOpen,
  hotKey
}: Partial<CachedOptions>) => {
  if (isOpen) frontEnd.install()
  frontEnd.keyboardWatcher.updateHotKey(hotKey)
})

//监听用户配置改变
chrome.storage.onChanged.addListener(({ isOpen, hotKey }: Partial<Record<keyof CachedOptions, any>>) => {
  const newIsOpen = isOpen?.newValue
  const newHotKey = hotKey?.newValue
  newHotKey ? frontEnd.keyboardWatcher.updateHotKey(newHotKey) : null

  if (newIsOpen === undefined) return
  newIsOpen ? frontEnd.install() : frontEnd.uninstall()
})

