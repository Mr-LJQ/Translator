/**
 * 对 window.addEventListener("message",callback) 与 window.postMessage 进行二次封装，
 *  使window.postMessage具备回调函数功能
 */

import { FunctionAny } from "@/types";
import { Command } from "@/configuration";
import { warning } from "@/utils";
import { NoteData } from "@/translation-page";
import { TranslationResult } from "@/dictionary";
import { AddNoteReturnType, RelearnCardsReturnType } from "@/anki";

let uniqueId = 1;
const CALLBACK = "CALLBACK";

interface MessageData {
  command: Command;
  //可选
  data?: any;
  callbackName?: number;
}
export type PostMessage = Messenger["postMessage"];
export type OnMessage = Messenger["onMessage"];
export class Messenger {
  target?: Window;
  self: Window;
  callbacks: { [key: number]: FunctionAny };
  handlers: { [key: string]: FunctionAny[] };

  constructor(options: { self: Window; target?: Window }) {
    this.self = options.self;
    this.target = options.target;
    this.handlers = Object.create(null);
    this.callbacks = Object.create(null);
    this.onMessage = this.onMessage.bind(this);
    this.postMessage = this.postMessage.bind(this);
  }
  install = () => {
    const { self } = this;
    self.addEventListener("message", this.handleMessage);
  };
  uninstall = () => {
    const { self } = this;
    self.removeEventListener("message", this.handleMessage);
  };
  addTarget = (target: Window) => {
    this.target = target;
  };
  handleMessage = (event: MessageEvent<MessageData>) => {
    const { target, handlers, callbacks } = this;
    const source = event.source;
    const { data, command, callbackName } = event.data;
    if (target !== source) return;
    const callback = callbackName == null ? null : callbacks[callbackName]; // 注释一
    //执行回调专用指令(回调函数响应)
    //@ts-ignore 内部使用，不对外暴露
    if (command === CALLBACK && callback == null) return;
    //@ts-ignore 内部使用，不对外暴露
    if (command === CALLBACK && callback) {
      callback(data);
      //@ts-ignore 根据 注释一 ,callback 存在，则 callbackName 必定不为 undefined
      delete callbacks[callbackName];
      return;
    }

    if (handlers[command] != null) {
      handlers[command]!.forEach((fn) => {
        fn(data, (data: any) => {
          //传递给用户的回调函数，下面是内部发送逻辑
          if (callbackName != null) {
            //只有设置了回调函数的指令调用该方法时才有效。
            //@ts-ignore CALLBACK 为内部使用的，用于触发回调
            this.postMessage(CALLBACK, data, callbackName);
          }
        });
      });
    }
  };

  //translation-page listen agent
  onMessage(command: Command.BackHistory, listener: () => void): () => void;
  onMessage(command: Command.ForwardHistory, listener: () => void): () => void;
  onMessage(command: Command.PauseAudio, listener: () => void): () => void;
  onMessage(
    command: Command.OpenSelection,
    listener: (data: boolean) => void
  ): () => void;
  onMessage(
    command: Command.HiddenChinese,
    listener: (data: boolean) => void
  ): () => void;
  onMessage(
    command: Command.ShowTranslation,
    listener: (data: TranslationResult, callback: () => void) => void
  ): () => void;

  //agent listen translation-page
  onMessage(
    command: Command.TranslateText,
    listener: (data: string) => void
  ): () => void;
  onMessage(command: Command.OpenOptionsPage, listener: () => void): () => void;
  onMessage(
    command: Command.HistoryIndex,
    listener: (data: { index: number; head: number; tail: number }) => void
  ): () => void;
  onMessage(
    command: Command.RelearnNote,
    listener: (
      data: number[],
      callback: (data: RelearnCardsReturnType) => void
    ) => void
  ): () => void;
  onMessage(
    command: Command.AddNote,
    listener: (
      data: NoteData,
      callback: (data: AddNoteReturnType) => void
    ) => void
  ): () => void;
  onMessage(command: Command, listener: FunctionAny): () => void {
    const handlers = this.handlers;

    if (handlers[command] == null) {
      handlers[command] = [listener];
    } else {
      handlers[command]!.push(listener);
    }
    //单例
    let called = false;
    return function () {
      if (called) return;
      called = true;
      handlers[command] = handlers[command]!.filter((fn) => {
        return fn !== listener;
      });
    };
  }
  //agent to translation-page
  postMessage(command: Command.PauseAudio): void;
  postMessage(command: Command.BackHistory): void;
  postMessage(command: Command.ForwardHistory): void;
  postMessage(command: Command.OpenSelection, data: boolean): void;
  postMessage(command: Command.HiddenChinese, data: boolean): void;
  postMessage(
    command: Command.ShowTranslation,
    data: TranslationResult,
    callback: () => void
  ): void;
  // translation-page to agent
  postMessage(command: Command.TranslateText, data: string): void;
  postMessage(command: Command.OpenOptionsPage): void;
  postMessage(
    command: Command.HistoryIndex,
    data: { index: number; head: number; tail: number }
  ): void;
  postMessage(
    command: Command.RelearnNote,
    data: number[],
    callback: (data: RelearnCardsReturnType) => void
  ): void;
  postMessage(
    command: Command.AddNote,
    data: NoteData,
    callback: (data: AddNoteReturnType) => void
  ): void;
  postMessage(command: Command, data?: any, callback?: FunctionAny): void {
    const target = this.target;
    warning(!!target, "target 不存在，其在通信中是必须的");
    /* 因为浏览器的postMessage不提供原生的响应回调功能，因此需要自定义实现
     * 设置回调时:(postMessage)
     *   如果存在回调函数，则创建一个唯一的ID保存该回调函数
     *   该唯一ID保存在 data.callbackName 中，随请求携带
     * 执行回调时:(onMessage)
     *   定义收到command为"callback"的指令时，调用缓存的回调函数
     *   该指令的data[callbackName]应该有值，通过该值进行正确的回调匹配
     */
    //确保data是引用数据类型
    const message: MessageData = Object.create(null);
    message.data = data;
    message.command = command;
    //如果传递的是number，则说明该次调用是为了触发回调，因为标识是number，所以此处判断number
    //与用户无关，是触发回调的内部逻辑
    if (typeof callback === "number") {
      message.callbackName = callback;
    }

    if (typeof callback === "function") {
      const callbackName = uniqueId;
      this.callbacks[callbackName] = callback;
      message.callbackName = callbackName;
      uniqueId++; //保证唯一性
    }

    target.postMessage(message, "*");
  }
}
