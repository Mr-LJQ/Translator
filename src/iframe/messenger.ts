

let uniqueId = 1
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//声明引入
import type { TranslationResult } from "../backend-script/dictionary/index"
import { Command } from "../utils/command"
import type {CardsStatus,NoteData} from "./view/View"


export type PostMessage = Messenger["postMessage"]
export type OnMessage = Messenger["onMessage"]
export type Handler = (data: any, callback: (data?: any) => void) => void

interface Message {
  data?: any,
  command: Command,
  callbackName: number
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//对iframe与window间通信的模块进行二次封装，以使得通信支持回调函数

interface Options {
  self: Window
  target?: Window
}
export class Messenger {
  self
  target
  private callbacks: { [key: number]: Function }
  private handlers: Partial<Record<Command, Handler[]>>

  constructor(options: Options) {
    this.self = options.self
    this.target = options.target
    this.handlers = Object.create(null)
    this.callbacks = Object.create(null)
    this.install = this.install.bind(this)
    this.uninstall = this.uninstall.bind(this)
    this.onMessage = this.onMessage.bind(this)
    this.addTarget = this.addTarget.bind(this)
    this.postMessage = this.postMessage.bind(this)
    this.handleMessage = this.handleMessage.bind(this)
  }
  install(this: Messenger) {
    const { self } = this
    self.addEventListener("message", this.handleMessage)
  }
  uninstall(this: Messenger) {
    const { self } = this
    self.removeEventListener("message", this.handleMessage)
  }

  addTarget(target: Window) {
    this.target = target
  }

  private handleMessage(event: MessageEvent<Message>) {
    let { target } = this
    const { source } = event
    const { data, command, callbackName } = event.data
    //如果没有预定义的target，则意味着其是View
    //此时保存对source的引用(如无意外应该是前端脚本)
    if (!target && source) {
      target = this.target = <Window>source
    }

    const callback = this.callbacks[callbackName]
    //执行回调专用指令(回调函数响应)
    //内部使用，不对外暴露
    if (command === Command.Callback && callback) {
      callback(data)
      delete this.callbacks[callbackName]
      return
    }
    //处理用户添加的监听
    this.handlers[command]?.forEach((fn) => {
      fn(data, (data?: any) => {//传递给用户的回调函数，下面是内部发送逻辑
        if (callbackName) {//只有设置了回调函数的指令调用该方法时才有效。
          this.postMessage(Command.Callback, data, callbackName)
        }
      })
    })
  }
  
  onMessage(command: Command.BackHistory, listener: () => void): () => void
  onMessage(command: Command.ForwardHistory, listener: () => void): () => void
  onMessage(command: Command.PauseAudio, listener: () => void): () => void
  onMessage(command: Command.OpenSelection, listener: (data:boolean) => void): () => void
  onMessage(command: Command.HiddenChinese, listener: (data:boolean) => void): () => void
  onMessage(command: Command.ShowTranslation, listener: (data: TranslationResult, callback: () => void) => void): () => void
  onMessage(command: Command.TranslateText, listener: (data: string) => void): () => void
  onMessage(command: Command.HistoryIndex, listener: (data: {index:number,head:number,tail:number}) => void): () => void
  onMessage(command: Command.RelearnNote, listener: (data: number[], callback: (data: CardsStatus) => void) => void): () => void
  onMessage(command: Command.AddNote, listener: (data: NoteData, callback: (data: CardsStatus) => void) => void): () => void
  onMessage(command: Command, listener: Handler): () => void {
    let { handlers } = this
    if (handlers[command] == null) {
      handlers[command] = [listener]
    } else {
      handlers[command]?.push(listener)
    }
    return () => {
      handlers[command] = handlers[command]?.filter((fn) => {
        return fn !== listener
      })
    }
  }

  /**
   * @param command 要求另一个window执行某些操作的指令
   * @param data 执行指令所必须的数据数据
   * @param callback 用于处理响应的回调函数
   * @returns 
   */
  postMessage(command: Command.PauseAudio): void
  postMessage(command: Command.BackHistory): void
  postMessage(command: Command.ForwardHistory): void
  postMessage(command: Command.OpenSelection,data:boolean): void
  postMessage(command: Command.HiddenChinese,data:boolean): void
  postMessage(command: Command.ShowTranslation, data: TranslationResult, callback: () => void): void
  postMessage(command: Command.TranslateText, data: string): void
  postMessage(command: Command.HistoryIndex, data: {index:number,head:number,tail:number}): void
  postMessage(command: Command.RelearnNote, data: number[], callback: (data: CardsStatus) => void): void
  postMessage(command: Command.AddNote, data: NoteData, callback: (data: CardsStatus) => void): void
  postMessage(command: Command.Callback, data: any, callback: number): void
  postMessage(this: Messenger, command: Command, data?: any, callback?: Function | number): void {
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
    const message: Message = Object.create(null)
    message.data = data
    message.command = command

    //如果传递的是number，则说明该次调用是为了触发回调，因为标识是number，所以此处判断number
    //与用户无关，是触发回调的内部逻辑
    if (typeof callback === "number") {
      message.callbackName = callback
    }

    if (typeof callback === "function") {
      const callbackName = uniqueId
      this.callbacks[callbackName] = callback
      message.callbackName = callbackName
      uniqueId++ //保证唯一性
    }
    target.postMessage(message, "*")
  }
}

