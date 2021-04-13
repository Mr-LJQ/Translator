import { Collins_en_cn } from "./dictionary"
import {BackToFront} from "../communication"

import {
  Handler,
  Message,
  sendResponse,
} from "../../types/index"


class BackEnd implements Handler {

  collins
  backToFront

  constructor () {
    //添加监听，并且获取
    this.backToFront = new BackToFront(this)
    //获取翻译词典
    this.collins = new Collins_en_cn()
  }
  async distributeTasks (message:Message,sendResponse:sendResponse) {
    let {command,data} = message
    switch (command) {
      case "queryWord":
        this.handledWord(data,sendResponse)
        break
      case "querySentence":
        this.handledSentence(data,sendResponse)
        break
      case "":
        break
      case "":
        break
    }
  }
  /**
   * 处理需要翻译的单词
   * @param word 
   * @param sendResponse 
   */
  async handledWord (word:string,sendResponse:sendResponse) {
    let translatedWord = await this.collins.translateWord(word)
    sendResponse(translatedWord)
  }
  /**
   * 处理需要翻译的句子
   * @param sentence 
   * @param sendResponse 
   */
  async handledSentence(sentence:string,sendResponse:sendResponse) {
    let translatedSentence = await this.collins.translateSentence(sentence)
    sendResponse(translatedSentence)
  }
}

new BackEnd()


