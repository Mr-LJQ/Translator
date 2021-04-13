import {
  Handler,
  Message,
} from "../types/index"

export class FrontToBack {
  async postBackEnd(command: string, data: any) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ command, data }, function (response) {
        resolve(response)
      })
    })
  }
}

export class BackToFront {
  constructor(private handler:Handler) {
    chrome.runtime.onMessage.addListener((message: Message, sender, sendResponse) => {
      this.handler.distributeTasks(message,sendResponse)
      return true
    })
  }
  async postFrontEnd(command: string, data: any) {
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
}