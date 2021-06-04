import { MessageHandler, AnkiResponse, TranslationResult, NoteData, Point, ShowData } from "../../types/index"
//监听拓展不同模块间消息传递的函数
export function onMessage(handler: MessageHandler) {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    handler(message, sendResponse)
    return true//为了使sendResponse可以异步调用，这是必须的
  })
}

//向前端发送消息的函数
export async function postFrontend(command: "switchSearchBar"): Promise<void>
export async function postFrontend(command: "showInjectTranslated", data: ShowData): Promise<void>
export async function postFrontend(command: string, data?: any): Promise<void> {
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
//向后端发送消息的函数
export async function postBackend(command: "getDeckNames"): Promise<string[]>
export async function postBackend(command: "getModelNames"): Promise<string[]>
export async function postBackend(command: "getVersion"): Promise<number | null>
export async function postBackend(command: "getModelFieldNames", data: string): Promise<string[]>
export async function postBackend(command: "addNote", data: NoteData): Promise<AnkiResponse>
export async function postBackend(command: "relearnNote", data: number[]): Promise<AnkiResponse>
export async function postBackend(command: "translateText", data: string): Promise<TranslationResult>
export async function postBackend(command: "showInjectTranslated", data: { text: string, point: Point }): Promise<void>
export async function postBackend(command: string, data?: any): Promise<any> {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ command, data }, function (response) {
      resolve(response)
    })
  })
}