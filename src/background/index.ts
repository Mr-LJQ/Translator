import { AnkiConnection } from "./anki"
import Collins_en_cn from "../dictionary/index"

import { Cacher } from "../utils/index"

import { getStorage, onMessage, onStorageChange, postFrontend, onCommand, setStorage } from "../extensions_API/index"

import {
  Storage,
  SendResponse,
  TranslationResult
} from "../../types/index"


class BackEnd {

  cacher: Cacher
  anki: AnkiConnection
  collins: Collins_en_cn

  constructor() {

    //获取翻译词典
    this.collins = new Collins_en_cn()

    //获取anki
    this.anki = new AnkiConnection()

    //缓存翻译数据
    this.cacher = new Cacher(10)

    this.handler = this.handler.bind(this)

    //添加监听
    onMessage(this.handler)
  }
  /**
   * 用于处理接收到的指令的函数
   * @param param0 {command:指令，data:请求数据}
   * @param sendResponse 响应回调函数
   */
  private async handler({ command, data }: any, sendResponse: SendResponse) {
    let response
    switch (command) {
      case "translateText":
        response = await this.translateText(data)
        sendResponse(response)
        break
      case "showInjectTranslated":
        response = await this.translateText(data.text)
        postFrontend("showInjectTranslated", { translatedData: response, point: data.point })
        break
      case "addNote":
        response = await this.anki.addNote(data)
        sendResponse(response)
        break;
      case "relearnNote":
        response = await this.anki.relearnCards(data)
        sendResponse(response)
        break
      case "getDeckNames":
        response = await this.anki.getDeckNames()
        sendResponse(response)
        break
      case "getModelNames":
        response = await this.anki.getModelNames()
        sendResponse(response)
        break
      case "getVersion":
        response = await this.anki.getVersion()
        sendResponse(response)
        break
      case "getModelFieldNames":
        response = await this.anki.getModelFieldNames(data)
        sendResponse(response)
        break
      default:
        throw new Error("存在未处理的指令:" + command)
    }
  }


  /**
   * 处理翻译指令的函数
   * @param text 待翻译文本
   * @param sendResponse 响应翻译请求的回调函数
   */
  private async translateText(text: string): Promise<TranslationResult> {
    const { cacher } = this
    let translated = cacher.get(text)
    if (translated) return translated
    let translatedData = await this.collins.translateText(text)
    if (!("error" in translatedData)) this.cacher.set(text, translatedData)
    return translatedData
  }
}

const backEnd = new BackEnd()

//初始化AnkiConfig
getStorage(["wordConfig", "phraseConfig", "sentenceConfig", "ankiConnectionURL"], (config) => {
  backEnd.anki.updateAnkiConfig(config)
})
//初始化isOpen标识文本
getStorage({
  isOpen (value) {switchBadgeText(!!value)}
})

//监听用户配置更新
onStorageChange({
  wordConfig: (_, wordConfig: any) => backEnd.anki.updateAnkiConfig({ wordConfig }),
  phraseConfig: (_, phraseConfig: any) => backEnd.anki.updateAnkiConfig({ phraseConfig }),
  sentenceConfig: (_, sentenceConfig: any) => backEnd.anki.updateAnkiConfig({ sentenceConfig }),
  ankiConnectionURL: (_, ankiConnectionURL: any) => backEnd.anki.updateAnkiConfig({ ankiConnectionURL }),
  //改变BrowserAction的状态，关闭时添加“off”字样
  isOpen: (_, value) => switchBadgeText(!!value)
})

//监听用户快捷键，用于开关拓展
onCommand({
  enabled: () => {
    getStorage({
      isOpen: (isOpen) => setStorage({ isOpen: !isOpen })
    })
  },
  search_bar: () => postFrontend("switchSearchBar"),
})

//--右键注入Anki划词助手的逻辑--
chrome.contextMenus.create({
  contexts: ["frame"],
  title: "注入划词助手",
})

//用于避免重复注入
const injectedFrames: number[] = []

chrome.contextMenus.onClicked.addListener((info, tab) => {
  const { frameId } = info
  if (!frameId) throw new Error("info.frameId is undefined")
  if (injectedFrames.includes(frameId)) return
  injectedFrames.push(frameId)
  chrome.tabs.executeScript({
    frameId: info.frameId,
    file: "/injectScript.js"
  })
})
//--------------end---------------


//------------辅助函数-------------
function switchBadgeText(isOpen:boolean) {
  isOpen 
    ? chrome.browserAction.setBadgeText({ text: "" })
    : chrome.browserAction.setBadgeText({ text: "off" })
}