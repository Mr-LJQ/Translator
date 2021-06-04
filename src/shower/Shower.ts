import {
  Point,
  ShowData,
  MessageHandler,
} from "../../types/index"

import { Agent, PostMessage } from "../utils/index"

export class Shower {
  private agent?: Agent
  private mask: HTMLDivElement
  private postMessage?: PostMessage
  private iframe: HTMLIFrameElement
  private iframeSize: { width: number, height: number }

  constructor(handler: MessageHandler) {

    this.iframeSize = { width: 400, height: 300 }

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
      this.agent.onMessage()
      this.postMessage = this.agent.postMessage
    })
    //此处的shower.html需要参考所生成文件的具体名称
    iframe.src = chrome.runtime.getURL("shower.html")

    //通过蒙版点击监听来隐藏iframe，如果绑定在document上，有可能以为处于其它iframe而无效
    const mask = this.mask = document.createElement("div")
    mask.style.cssText = `
      position:fixed;
      z-index:99999;
      left:0;
      right:0;
      top:0;
      bottom:0;
      background:rgba(0,0,0,.3);
    `

    this.onClickToggle = this.onClickToggle.bind(this)
  }

  hiddenIframe() {
    const { width, height } = this.iframeSize
    this.mask.hidden = true
    this.iframe.style.cssText = `
      visibility:hidden;
      z-index: 999999;
      resize: auto;
      position:fixed;
      width:${width}px;
      height:${height}px;
      background: white;
      border-radius: 5px;
      border: 1px solid rgb(51, 51, 51);
    `
  }

  install() {
    this.hiddenIframe()
    this.agent?.onMessage()
    this.mask.addEventListener("click", this.onClickToggle)
    document.body.append(this.mask)
    document.body.append(this.iframe)
  }

  uninstall() {
    this.hiddenIframe()
    this.agent?.offMessage()
    this.mask.removeEventListener("click", this.onClickToggle)
    this.mask.remove()
    this.iframe.remove()
  }

  /**
   * 当用户点击mask时，隐藏shower
   * @param event 
   */
  private onClickToggle(event: MouseEvent) {
    event.stopPropagation()
    this.hiddenIframe()
    this.postMessage?.("pauseAudio")
  }

  /**
   * 一层简单的封装，其目的在于使外部调用更加便捷统一
   * @param data 
   */
  showTranslation(data: ShowData) {
    const { translatedData, point } = data
    this.postMessage?.("showTranslation", translatedData, () => {
      //UI更新后再展示iframe,避免闪烁
      this.showUI(point)
      this.mask.hidden = false
    })
  }

  /**
   * 展示UI
   */
  private showUI(point: Point) {
    let {width,height} = this.iframeSize 
    let { y: top, x: left } = point
    //用于判断是否超出视口
    let clientWidth = document.documentElement.clientWidth
    let clientHeight = document.documentElement.clientHeight

    //对越界位置进行修正
    left = Math.min(Math.max(0, left),clientWidth - width)
    top = Math.min(Math.max(0, top),clientHeight - height)

    //样式是覆盖式设定，为了避免额外的样式复杂度，所有样式都是独立的(通过覆盖更新)
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
}
