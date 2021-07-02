import translateWord from "./translateWord"
import translatePhrase from "./translatePhrase"
import translateSentence from "./translateSentence"

import { PhraseData, SentenceData, TranslationResult,ErrorData } from "../../types/index"


export default class Collins_en_cn {
  /**
     * 向外暴露的接口，是对翻译word与sentence函数的封装
     * @param text 需要进行翻译的文本
     */
  async translateText(text: string): Promise<TranslationResult> {
    let result:TranslationResult
    try {
      const dom = await getPageDOM(text)
      //如果存在空格，则认为其为多个单词组合的句子、词组
      if (/\s/g.test(text)) {
        result = await this.translateWords(dom)
      } else {
        result = await translateWord(text,dom)
      }
    } catch (error) {
      //捕获语法错误
      if (error.message) error = error.message
      //捕获自定义错误
      result = {error}
    }
    return result
  }
  async translateWords(dom:Document): Promise<SentenceData | PhraseData | ErrorData> {
    //情况一：待翻译的是短语
    const translatedPhrase = translatePhrase(dom)
    if (translatedPhrase) return translatedPhrase

    //情况二:待翻译的是句子
    const translatedSentence = translateSentence(dom)
    if (translatedSentence) return translatedSentence
    
    //情况三：无任何翻译
    return {error:"没有查找到任何翻译。"}
  }
  
}

/**
 * 获取有道翻译HTML文件的DOM
 * @param input 需要进行翻译的内容
 * @returns 翻译内容对应的DOM文档
 */
async function getPageDOM(input: string): Promise<Document> {
  return new Promise((resolve, reject) => {
    //词典基于有道网页版
    let BASE_URL = "https://dict.youdao.com/w/"
    let searchURL = BASE_URL + encodeURIComponent(input)
    let xhr = new XMLHttpRequest()
    xhr.open("GET", searchURL)
    xhr.responseType = "document"
    xhr.timeout = 6000
    xhr.addEventListener("load", function () {
      resolve(xhr.response)
    })
    xhr.addEventListener("error", function () {
      reject("翻译请求错误，请检查网络")
    })
    xhr.addEventListener("timeout", function () {
      reject("翻译请求超时,请检查网络")
    })
    xhr.send(null)
  })
}