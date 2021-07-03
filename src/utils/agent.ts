//该模块封装了window与window之间进行通信的方法
//例如:window与iframe.contentWindow,iframe.contentWindow与window之间的通信

import { AnkiCallback, TranslationResult, MessageHandler, NoteData } from "../../types/index"

export type PostMessage = Agent["postMessage"]

interface Options {
  handler?: MessageHandler
  self?: Window
  target?: Window
}

export default class Agent {
  self
  target
  handler
  private uniqueId
  private callbacks:{[key:number]:Function}
  constructor(options: Options) {
    this.self = options.self
    this.uniqueId = 1
    this.callbacks = {}
    this.target = options.target
    this.handler = options.handler

    this.onMessage = this.onMessage.bind(this)
    this.offMessage = this.offMessage.bind(this)
    this.postMessage = this.postMessage.bind(this)
    this.handleMessage = this.handleMessage.bind(this)
  }
  onMessage(this:Agent) {
    const {self} = this
    self && self.addEventListener("message", this.handleMessage)
  }
  offMessage(this:Agent) {
    const {self} = this
    self && self.removeEventListener("message",this.handleMessage)
  }
  
  private handleMessage (event: MessageEvent) {
    let { target } = this
    const { source } = event

    //如果没有预定义的target，则为target赋值为发送消息的源
    if (!target && source) {
      target = this.target = <Window>source
    }

    const { data, command, callbackName } = event.data
    //如果预定义的target存在，但其并非预期的对象，则退出(避免内容脚本接收到意料之外的指令)
    if (target && source !== target) return


    const callback = this.callbacks[callbackName]
    //执行回调专用指令(回调函数响应)
    if (command === "callback" && callback) {
      callback.call(this, data)
      delete this.callbacks[callbackName]
      return
    }
    //用于接收并处理另一个window指令的函数,提供一个sendResponse函数作为发送响应的方法
    const { handler } = this
    handler && handler({ command, data }, (data?: any) => {
      if (callbackName) {//只有设置了回调函数的指令调用该方法时才有效。
        this.postMessage("callback", data, callbackName)
      }
    })
  }
 
  /**
   * @param command 要求另一个window执行某些操作的指令
   * @param data 执行指令所必须的数据数据
   * @param callback 用于处理响应的回调函数
   * @returns 
   */
  postMessage(command: "pauseAudio"): void
  postMessage(command: "showTranslated", data: string): void
  postMessage(command: "relearnNote", data: number[],callback:AnkiCallback): void
  postMessage(command: "showTranslation", data: TranslationResult, callback: Function): void
  postMessage(command: "addNote", data: NoteData, callback: AnkiCallback): void
  postMessage(command: "callback", data: any, callback?: Function | number): void
  postMessage(this:Agent,command: string, data?: any, callback?: Function | number): void {
    const { target } = this
    //还不具备发送消息的能力
    if (!target) return

    /* 因为浏览器的postMessage不提供原生的响应回调功能，因此需要自定义实现
     * 设置回调时:(postMessage)
     *   如果存在回调函数，则创建一个唯一的ID保存该回调函数
     *   该唯一ID保存在data.__callbackName中，随请求携带
     * 执行回调时:(onMessage)
     *   定义收到command为"callback"的指令时，调用缓存的回调函数
     *   该指令的data[callbackName]应该有值，通过该值进行正确的回调匹配
     */

    //确保data是引用数据类型
    const message = Object.create(null)
    message.data = data
    message.command = command

    //如果传递的是number，则说明该次调用是为了触发回调，因为标识是number，所以此处判断number
    if (typeof callback === "number") {
      message.callbackName = callback
    }

    if (typeof callback === "function") {
      const callbackName = this.uniqueId
      this.callbacks[callbackName] = callback
      message.callbackName = callbackName
      this.uniqueId++ //保证唯一性
    }
    target.postMessage(message, "*")
  }

  
}