//统一管理用到的浏览器拓展API,以便于进行兼容处理时，影响范围集中于该文件

import { pick } from "./tools"
import { Command } from "./command"
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//声明引入
import type { ShowData } from "../iframe/iframe"
import type { NoteData } from "../iframe/view/View"
import type { TranslationResult } from "../dictionary/index"
import type { Point } from "../user-operation"
import type { WordFields, PhraseFields, SentenceFields, CardInfoFields, AnkiConnectionFields } from "../options/field"
import type { CardsStatus } from "../anki/index"
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//其它

export function getURL(name: string) {
  return chrome.runtime.getURL(name)
}

export function openOptionsPage() {
  chrome.runtime.openOptionsPage()
}

export function setBadgeText(details: chrome.browserAction.BadgeTextDetails, callback?: (() => void) | undefined) {
  chrome.browserAction.setBadgeText(details, callback)
}

export function addContextMenuItem(createProperties: chrome.contextMenus.CreateProperties, callback?: (() => void) | undefined) {
  chrome.contextMenus.create(createProperties, callback)
}

export function onContextMenuClick(callback: (info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab | undefined) => void) {
  chrome.contextMenus.onClicked.addListener(callback)
}

export function executeScript(details: chrome.tabs.InjectDetails, callback?: ((result: any[]) => void) | undefined) {
    chrome.tabs.executeScript(details,callback)
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//通信

export type SendResponse = Parameters<Parameters<typeof chrome.runtime.onMessage.addListener>["0"]>["2"]

//向后端发送消息的函数
export async function postBackend(command: Command.GetDeckNames): Promise<string[]>
export async function postBackend(command: Command.GetModelNames): Promise<string[]>
export async function postBackend(command: Command.GetVersion): Promise<number | null>
export async function postBackend(command: Command.GetModelFieldNames, data: string): Promise<string[]>
export async function postBackend(command: Command.AddNote, data: NoteData): Promise<CardsStatus>
export async function postBackend(command: Command.RelearnNote, data: number[]): Promise<CardsStatus>
export async function postBackend(command: Command.TranslateText, data: string): Promise<TranslationResult>
export async function postBackend(command: Command.TranslateInjectText, data: { text: string, point: Point }): Promise<void>
export async function postBackend(command: Command, data?: any): Promise<any> {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ command, data }, function (response) {
      resolve(response)
    })
  })
}

//向前端发送消息的函数
export async function postFrontend(command: Command.ShowIframe): Promise<void>
export async function postFrontend(command: Command.SwitchSearchBar): Promise<void>
export async function postFrontend(command: Command.ShowInjectTranslation, data: ShowData): Promise<void>
export async function postFrontend(command: Command, data?: any): Promise<void> {
  return new Promise(resolve => {
    chrome.tabs.query({ active: true }, function (tabs) {
      tabs.forEach(tab => {
        if (!tab.id) return
        chrome.tabs.sendMessage(tab.id, { command, data }, function (response) {
          resolve(response)
        })
      })
    })
  })
}

interface Handler {
  (message: { command: Command.ShowInjectTranslation, data: ShowData }, callback: () => void): void,
  (message: { command: Command.TranslateInjectText, data: { text: string, point: Point } }, callback: () => void): void,
  (message: { command: Command.SwitchSearchBar, data: undefined }, callback: () => void): void,
  (message: { command: Command.ShowIframe, data: undefined }, callback: () => void): void,
  (message: { command: Command.GetVersion, data: undefined }, callback: (data?: number | null) => void): void,
  (message: { command: Command.GetDeckNames, data: undefined }, callback: (data?: string[]) => void): void,
  (message: { command: Command.GetModelNames, data: undefined }, callback: (data?: string[]) => void): void,
  (message: { command: Command.GetModelFieldNames, data: string }, callback: (data?: string[]) => void): void,
  (message: { command: Command.AddNote, data: NoteData }, callback: (data?: CardsStatus) => void): void,
  (message: { command: Command.RelearnNote, data: number[] }, callback: (data?: CardsStatus) => void): void,
  (message: { command: Command.TranslateText, data: string }, callback: (data?: TranslationResult) => void): void,
}
//监听拓展不同模块间消息传递的函数
export function onMessage(handler: Handler): void {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    handler(message, sendResponse)
    return true//为了使sendResponse可以异步调用，这是必须的
  })
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//指令

interface Handlers {
  enabled?: Function,
  search_bar?: Function,
  show_shower?: Function,
}

let onCommand = function (handlers: Handlers) {
  //监听用户快捷键，用于开关拓展
  chrome.commands.onCommand.addListener((command) => {
    const handler = handlers[command as keyof Handlers]
    handler?.()
  })
}

if (process.env.NODE_ENV === "development") {
  onCommand = function StrictOnCommand(handlers: Handlers) {
    const { commands } = chrome.runtime.getManifest()
    if (!commands) throw new Error("Commands are not configured in manifest.json file")
    const commandNames = Object.keys(handlers)
    commandNames.forEach((command) => {
      if (!(command in commands)) throw new Error("Unexpected command:" + command)
    })
    //监听用户快捷键，用于开关拓展
    chrome.commands.onCommand.addListener((command) => {
      const handler = handlers[command as keyof Handlers]
      handler?.()
    })
  }
}


export { onCommand }


////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//缓存

export enum TabPaneKey {
  Home = "HOME",
  Word = "WORD",
  Phrase = "PHRASE",
  Sentence = "SENTENCE"
}

export type WordConfig = Partial<CardInfoFields & WordFields>
export type PhraseConfig = Partial<CardInfoFields & PhraseFields>
export type SentenceConfig = Partial<CardInfoFields & SentenceFields>
export interface Storage extends Partial<AnkiConnectionFields> {
  wordConfig?: WordConfig,
  phraseConfig?: PhraseConfig,
  sentenceConfig?: SentenceConfig,
  isOpen?: boolean, //是否启用插件
  hotKey?: "shiftKey" | "ctrlKey" | "altKey"  //自动选词热键,必须与KeyboardEvent的属性一样
  activeTabPane?: TabPaneKey //打开options后，首先展示的选项卡
  openSelection?: boolean
  hiddenChinese?: boolean
}

type StorageHandlers<T extends any> = {
  [P in keyof T]: (value: T[P]) => void;
};
type StorageKeys = keyof Storage

//缓存默认值对象，用于在用户刚刚加载拓展，没有进行任何配置时作为初始配置。
export const initialStorage: Required<Storage> = {
  isOpen: true,
  hotKey: "shiftKey",
  activeTabPane: TabPaneKey.Home,
  ankiConnectionURL: "http://127.0.0.1:8765",
  ankiConnectionMethod: "AnkiConnection",
  wordConfig: {},
  phraseConfig: {},
  sentenceConfig: {},
  hiddenChinese: false,
  openSelection: true,
}

function handlersIsArray(handlers: StorageHandlers<Storage> | StorageKeys[]): handlers is StorageKeys[] {
  return Array.isArray(handlers)
}

/**
 * 当handlers是一个对象
 *  注意：仅在其键存在相应的缓存/初始值时，回调才会调用
 *  注意：不保证调用顺序
 * @param handlers object / array
 */
export function getStorage(handlers: StorageKeys[], callback: (item: Partial<Storage>) => void): void
export function getStorage(handlers: StorageHandlers<Storage>, callback?: (item: Partial<Storage>) => void): void
export function getStorage(handlers: StorageHandlers<Storage> | StorageKeys[], callback?: (item: Partial<Storage>) => void): void {
  let storageKeys = handlersIsArray(handlers) ? handlers : Object.keys(handlers)
  const storage = pick(initialStorage, storageKeys)
  chrome.storage.local.get(storage, (storage) => {
    if (!handlersIsArray(handlers)) {
      (Object.keys(storage)).forEach((key) => {
        const handler = handlers[key as keyof Storage]
        const cacheValue = storage[key]
        if (handler) {
          handler(cacheValue)
        }
      })
    }
    callback && callback(storage)
  })
}

/**
 * 根据名称数组获取其对应的缓存对象
 * @param names array,需要获取的缓存项的名称数组
 * @returns object,对应的缓存对象
 */
export function getStorageItems<K extends StorageKeys>(names: K[]): Promise<Partial<Storage>> {
  return new Promise((resolve) => {
    getStorage(names, resolve)
  })
}

type StorageToCallback<T extends any> = {
  [P in keyof T]: (oldVal: T[P], newVal: T[P]) => void;
};

export function onStorageChange(handlers: StorageToCallback<Storage>) {
  let listener: Parameters<typeof chrome.storage.onChanged.addListener>[0] = (changes) => {
    Object.keys(changes).forEach((key) => {
      const handler = handlers[key as StorageKeys]
      if (handler) {
        const { oldValue, newValue } = changes[key]
        handler(oldValue, newValue)
      }
    })
  }
  chrome.storage.onChanged.addListener(listener)
  return () => {
    chrome.storage.onChanged.removeListener(listener)
  }
}

export function setStorage(items: Partial<Storage>, callback?: () => void) {
  chrome.storage.local.set(items, callback)
}

