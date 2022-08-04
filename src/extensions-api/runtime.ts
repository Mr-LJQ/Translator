export function getURL(name: string) {
  return chrome.runtime.getURL(name)
}

export function openOptionsPage() {
  chrome.runtime.openOptionsPage()
}


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