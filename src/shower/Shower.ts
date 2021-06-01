import {
  Handler,
  TranslationResult,
} from "../../types/index"

import { Agent, PostMessage } from "../utils/index"

export class Shower {

  private agent?: Agent
  private postMessage?: PostMessage
  private iframe: HTMLIFrameElement

  constructor(handler: Handler) {

    const iframe = this.iframe = document.createElement("iframe")
    //保证获取contentWindow
    iframe.addEventListener("load", () => {
      let contentWindow = <Window>this.iframe.contentWindow
      //建立通信
      this.agent = new Agent({
        self: window,
        target: contentWindow,
        handler,
      })
      this.agent?.onMessage()
      this.postMessage = this.agent.postMessage
    })

    //此处的shower.html需要参考所生成文件的具体名称
    iframe.src = chrome.runtime.getURL("shower.html")

    this.onClickToggle = this.onClickToggle.bind(this)
  }

  hiddenIframe () {
    this.iframe.style.cssText = `
      visibility:hidden;
      position:fixed;
    `
  }

  install() {
    /*
      为什么使用visibility控制iframe显示隐藏？
       因为：在visibility：hidden状态下，iframe内部UI的是可以更新的(且在该状态下iframe不会响应事件)
         而以下的方法，则会导致iframe内部的UI延迟到iframe可见时再进行重新渲染(导致闪烁)
         - this.iframe.hidden = true
         - this.iframe.style.display = "none"
       而其它的一些方法：
         - opacity:0 (iframe依然可以响应事件)
         - clip:rect() (不如visibility方便)
         - transform:scale(0) (不如visibility方便)
    */
    //初始化时不显示

    this.hiddenIframe()

    this.agent?.onMessage()
    document.addEventListener("click", this.onClickToggle)
    document.body.append(this.iframe)
  }

  uninstall() {
    this.agent?.offMessage()
    document.removeEventListener("click", this.onClickToggle)
    this.iframe.remove()
  }

  /**
   * 当用户点击shower外部时，隐藏shower
   * @param event 
   */
  private onClickToggle(event: MouseEvent) {
    if (event.target !== this.iframe && this.iframe.style.visibility !== "hidden") {
      this.hiddenIframe()
      this.postMessage?.("pauseAudio")
    }
  }

  /**
   * 一层简单的封装，其目的在于使外部调用更加便捷统一
   * @param data 
   */
  showTranslation(data: TranslationResult) {
    this.postMessage?.("showTranslation", data, () => {
      //UI更新后再展示iframe,避免闪烁
      const selection = getSelection()
      if (!selection) return
      const rangeCount = selection.rangeCount 
      if (!rangeCount) return
      const range = selection.getRangeAt(0)
      let element = this.getSearchBar(range)
      if (element) {  //搜索栏
        this.setSearchUI(element)
      } else if (range.startContainer.nodeType === 3) {//拖蓝选中
        this.setSelectedUI(range)
      } else { //先搜索栏后iframe拖蓝查询
        //只需维持位置不变
      }
    })
  }

  /**
   * 设置拖蓝选中时iframe样式
   */
  private setSelectedUI(range: Range) {
    let width = 400
    let height = 300
    let { bottom: top, left, height: rectHeight } = range.getBoundingClientRect()

    /**
     * 当用户连续查询单词，且单词左右相邻时，只要iframe处于单词正下方，则不调整left
     */

    //获取上一次展示时的iframe距离视口的偏移
    let offsetLeft = this.iframe.offsetLeft
    let offsetTop = this.iframe.offsetTop

    //因为top获取的值更精准,因此此处需要对top、left进行取整
    top = Math.round(top)
    left = Math.round(left)
    if (
      offsetTop === top &&
      offsetLeft < left &&
      left < offsetLeft + width
    ) {
      //保持left不动
      left = offsetLeft
    }

    //用于判断是否超出视口
    let clientWidth = document.documentElement.clientWidth
    let clientHeight = document.documentElement.clientHeight

    //对越界位置进行修正
    if (left + width > clientWidth) {
      left = clientWidth - width
      left = Math.max(0, left)
    }
    if (top + height > clientHeight) {
      top = top - height - rectHeight - 10
      top = Math.max(0, top)
    }

    this.iframe.style.cssText = `
    position:fixed;
    z-index:999999;
    left:${left}px;
    top:${top}px;
    width:${width}px;
    height:${height}px;
    resize:auto;
    border:1px solid #333;
    border-radius:5px;
    background:white;
    `
  }

  /**
  * 设置搜索时iframe样式
  */
  private setSearchUI(form: Element) {
    let width = 400
    let height = 300
    let { bottom: top, left, height: rectHeight, width: rectWidth } = form.getBoundingClientRect()

    //使iframe居中显示

    left = left - (width / 2) + (rectWidth / 2)

    //用于判断是否超出视口
    let clientWidth = document.documentElement.clientWidth
    let clientHeight = document.documentElement.clientHeight

    //对越界位置进行修正
    if (left + width > clientWidth) {
      left = clientWidth - width
    }
    if (top + height > clientHeight) {
      top = top - height - rectHeight
      top = Math.max(top, 0)
    }

    this.iframe.style.cssText = `
    position:fixed;
    z-index:999999;
    left:${left}px;
    top:${top}px;
    width:${width}px;
    height:${height}px;
    resize:auto;
    border:1px solid #333;
    border-radius:5px;
    background:white;
    `
  }

  /**
   * 判断翻译是否使用搜索栏查询,如果是则返回form，否则返回null
   * @param range 用于判断是否使用search搜索
   * @returns Boolean
   */
  private getSearchBar(range: Range) {
    let element = null
    if (range.commonAncestorContainer.nodeType === 1) element = <Element>range.commonAncestorContainer
    if (element && element.id === "extension_searchBar") return element
  }
}
