import { AnkiConnection } from "./anki"
import  Collins_en_cn  from "../dictionary/index"

import { onMessage, postFrontend } from "../utils/index"

import {
  CachedOptions,
  SendResponse
} from "../../types/index"


class BackEnd {

  anki
  collins

  constructor() {

    //获取翻译词典
    this.collins = new Collins_en_cn()

    //获取anki
    this.anki = new AnkiConnection()

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
  private async translateText(text: string) {
    let translatedData = await this.collins.translateText(text)
    return translatedData
  }
}

const backEnd = new BackEnd()

//监听用户快捷键，用于开关拓展
chrome.commands.onCommand.addListener((command) => {
  if (command === "enabled") {
    const isOpen: keyof CachedOptions = "isOpen"
    chrome.storage.local.get(isOpen, function ({ isOpen }: Partial<CachedOptions>) {
      const cacheOptions: Partial<CachedOptions> = {
        isOpen: !isOpen
      }
      chrome.storage.local.set(cacheOptions)
    })
  }
  //内容脚本不存在commands，因此无法监听快捷键指令，因此需要传输指令到内容脚本
  if (command === "search_bar") {
    postFrontend("switchSearchBar")
  }
})


//初始化AnkiConfig
const cachedOptions: Array<keyof CachedOptions> = ["wordConfig", "phraseConfig", "sentenceConfig","ankiConnectionURL"]
chrome.storage.local.get(cachedOptions, ({
  wordConfig,
  phraseConfig,
  sentenceConfig,
  ankiConnectionURL
}: Partial<CachedOptions>) => {
  backEnd.anki.updateAnkiConfig({
    wordConfig,
    phraseConfig,
    sentenceConfig,
    ankiConnectionURL,
  })
})

//监听用户配置改变，并进行相应更新
const isOpen: keyof CachedOptions = "isOpen"
chrome.storage.onChanged.addListener((changes) => {
  //处理Anki配置变化
  cachedOptions.forEach((name) => {
    const option = changes[name]
    if (!option) return
    const { newValue } = option
    backEnd.anki.updateAnkiConfig({
      [name]: newValue
    })
  })
  //改变BrowserAction的状态，关闭时添加“off”字样
  const option = changes[isOpen]
  if (!option) return
  const { newValue } = option
  let text = ""
  newValue ? text : text = "off"
  chrome.browserAction.setBadgeText({ text })
})


