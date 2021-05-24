//该模块封装了window与window之间进行通信的方法
//例如:window与iframe.contentWindow,iframe.contentWindow与window之间的通信

import { NoteWordData ,AnkiCallback,WordData,SentenceData,PhraseData, TranslationResult,Handler} from "../../types/index"

export type PostMessage = typeof postMessage

interface Options {
  handler?: Handler
  self?: Window
  target?: Window
}

interface That {
  uniqueId: number,
  callbacks: { [method: string]: Function },
  target?: Window,
  handler?: Handler
  postMessage:PostMessage
}



export function agent(options: Options):PostMessage {
  const self = options.self
  const that = {
    uniqueId: 1,
    callbacks: {},
    target: options.target,
    handler: options.handler,
  } as That
  const postMethod = postMessage.bind(that)
  that.postMessage = postMethod
  //绑定信息监听函数
  self && self.addEventListener("message", onMessage.bind(that))
  //返回具备信息发送能力的函数
  return postMethod
}

/**
 * 主要目的在于添加window与window之间通信的回调函数功能(原生不具备)
 * @param event MessageEvent
 * @returns 
 */
function onMessage(this: That, event: MessageEvent) {
  let { target } = this
  const { source } = event

  //如果没有预定义的target，则为target赋值为发送消息的源
  if (!target && source) {
    target = this.target = <Window>source
  }

  const { data,command, callbackName} = event.data

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
  handler && handler({ command, data }, (data?:any) => {
    if (callbackName) {//只有设置了回调函数的指令调用该方法时才有效。
      this.postMessage("callback", data ,callbackName)
    }
  })
}

/**
   * @param command 要求另一个window执行某些操作的指令
   * @param data 执行指令所必须的数据数据
   * @param callback 用于处理响应的回调函数
   * @returns 
   */
function postMessage(command: "pauseAudio"):void 
function postMessage(command: "showTranslated", data: string):void 
function postMessage(command: "showTranslation", data: TranslationResult, callback: Function):void 
function postMessage(command: "addWordNote", data: NoteWordData, callback: AnkiCallback):void 
function postMessage(command: "addPhraseNote", data: PhraseData, callback: AnkiCallback):void 
function postMessage(command: "addSentenceNote", data: SentenceData, callback: AnkiCallback):void 
function postMessage(command: "callback", data: any, callback?: Function | number):void 
function postMessage(command: "addAllWordsNotes", data: WordData, callback: AnkiCallback):void 
function postMessage(this: That, command: string, data?: any, callback?: Function | number):void {
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