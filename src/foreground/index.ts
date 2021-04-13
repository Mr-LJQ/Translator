import {KeyboardWatcher} from "./KeyboardWatcher"
import {PopupSearchBar} from "./PopupSearchBar"
import {SelectionWatcher} from "./SelectionWatcher"
import {FrontToBack} from "../communication"

import display from "../shower/index.html"

//对用户输入的数据进行处理
//将用户输入的数据处理后发生给后端进行查询
//获取查询响应，将其传递给展示模块
//处理展示模块传输的添加到Anki的请求
//将添加到Anki的请求发送给后端
class FrontEnd {
  private keyboardWatcher
  private popupSearchBar
  private selectionChange
  private frontToBack
  private iframe:HTMLIFrameElement
  constructor () {
    //必须绑定this
    this.queryText = this.queryText.bind(this)
    this.frontToBack = new FrontToBack()
    this.keyboardWatcher = new KeyboardWatcher()
    this.popupSearchBar = new PopupSearchBar(this.queryText)
    this.selectionChange = new SelectionWatcher(this.queryText)
    this.install()
    const iframe = this.iframe = document.createElement("iframe")
    const url = chrome.runtime.getURL(display)
    iframe.src = url
    document.body.append(iframe)
  }

  install () {
    let {keyboardWatcher,popupSearchBar,selectionChange} = this
    selectionChange.install()
    keyboardWatcher.install()
    popupSearchBar.install()
  }

  uninstall () {
    let {keyboardWatcher,popupSearchBar,selectionChange} = this
    selectionChange.uninstall()
    keyboardWatcher.uninstall()
    popupSearchBar.uninstall()
  }

  /**
   * 向后端发生获取翻译的请求，之后将请求传递给展示模块展示
   * @param text 
   */
  private async queryText (text:string) {
    let translated
    text = this.optimizeText(text)
    if (this.isSentence(text)) {
      translated = await this.frontToBack.postBackEnd("querySentence",text)
    }else {
      // 统一为小写字符(大小写不同，查询结果存在差异)
      text = text.toLowerCase()
      translated = await this.frontToBack.postBackEnd("queryWord",text)
    }
    console.log(translated)
    return translated
  }
  /**
   * - 处理驼峰命名，去掉驼峰
   * - 处理下划线连接符
   * - 处理HTML标签字符(转义)
   * @param text 
   * @returns 
   */
  private optimizeText (text:string):string {
    return text
  }
  /**
   * 判断待翻译的文本是否为句子
   * @param text 
   */
  private isSentence (text:string) {
    return /\s/.test(text)
  }
}

new FrontEnd()