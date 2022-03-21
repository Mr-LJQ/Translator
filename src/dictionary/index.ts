import translatePhrase from "./translatePhrase"
import translateSentence from "./translateSentence"
import { TranslationResult } from "../types/index"
import translateWord, { getCorrectSpelling } from "./translateWord"
import { removeHump } from "../utils/index"


////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

//声明引入
import type { ErrorData, WordData } from "./translateWord"
import type { PhraseData } from "./translatePhrase"
import type { SentenceData } from "./translateSentence"

//声明导出
export type TranslationResult = WordData | SentenceData | PhraseData | ErrorData
export type { WordData, SentenceData, PhraseData, ErrorData }

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//具体实现

export default class Collins_en_cn {
  promise: Promise<Document> | null
  xhr: XMLHttpRequest

  constructor() {
    this.promise = null
    this.xhr = new XMLHttpRequest()
  }
  /**
   * 词典基于有道翻译网页版，因此需要获取特定的网页DOM
   */
  private async getPageDOM(input:string) {
    let {xhr,promise} = this
    //词典基于有道网页版
    let BASE_URL = "https://dict.youdao.com/w/";
    let searchURL = BASE_URL + encodeURIComponent(input)
    xhr.open("GET", searchURL);
    if (promise) {
      xhr.send(null);
      return promise;
    }
    return (promise = new Promise((resolve, reject) => {
      xhr.responseType = "document";
      xhr.timeout = 6000;
      xhr.addEventListener("load", () => {
        if (xhr.status >= 400) reject(`错误:${xhr.status} ${xhr.statusText}`);
        resolve(xhr.response);
        this.promise = null;
      });
      xhr.addEventListener("error", () => {
        reject(`未知错误`);
        this.promise = null;
      });
      xhr.addEventListener("timeout", () => {
        reject("请求超时,请再次尝试或查看网络状态");
        this.promise = null;
      });
      xhr.send(null);
    }));
  }
  /**
     * 向外暴露的接口，是对翻译word与sentence函数的封装
     * @param text 需要进行翻译的文本
     */
  async translateText(text: string): Promise<TranslationResult> {
    let result: TranslationResult
    try {
      //去除驼峰
      text = removeHump(text)
      const dom = await this.getPageDOM(text)

      //如果存在空格，则认为其为多个单词组合的句子、词组
      if (/\s/g.test(text)) {
        result = await this.translateWords(dom)
      } else {
        result = await translateWord(dom)
      }
    } catch (err) {
      let error = err as Error
      let errorMessage
      //捕获语法错误
      if ("message" in error) errorMessage = error.message
      //该为自定义的错误格式
      result = { errorMessage, isCache: false }
    }
    return result
  }
  async translateWords(dom: Document): Promise<SentenceData | PhraseData | ErrorData> {
    //情况一：待翻译的是短语
    const translatedPhrase = translatePhrase(dom)
    if (translatedPhrase) return translatedPhrase

    //情况二:待翻译的是句子
    const translatedSentence = translateSentence(dom)
    if (translatedSentence) return translatedSentence

    let inference = getCorrectSpelling(dom)
    if (inference) {
      return { isCache: true, possibleSpelling: inference, errorMessage: "拼写存在错误" }
    }
    //情况三：无任何翻译
    return { errorMessage: "没有查找到任何翻译", isCache: false }
  }
}


