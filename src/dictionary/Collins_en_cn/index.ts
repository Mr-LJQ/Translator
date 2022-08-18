import lowerCase from "lodash.lowercase";
import {
  Cache,
  isErrorData,
  createCacography,
  createNoCacheError,
} from "../utils";

import { translateWord } from "./translateWord";
import { translatePhrase } from "./translatePhrase";
import translateSentence from "./translateSentence";

import type {
  WordData,
  PhraseData,
  SentenceData,
  TranslationResult,
} from "../types";

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//具体实现

export class Collins_en_cn {
  xhr: XMLHttpRequest | null;
  cache: Cache<string, TranslationResult>;

  constructor(cacheAmount = 20) {
    this.xhr = null;
    this.cache = new Cache(cacheAmount);
  }

  /**
   * 对translateText的包装，为其添加缓存能力
   * @param text 待翻译文本
   */
  async translate(text: string): Promise<TranslationResult> {
    const { cache } = this;
    const translation = cache.get(text);
    if (translation) return translation;
    const translationResult = await this.translateText(text);
    if (isErrorData(translationResult) && !translationResult.cache)
      return translationResult;
    this.cache.set(text, translationResult);
    return translationResult;
  }

  /**
   * 词典基于有道翻译网页版，因此需要获取特定的网页DOM
   */
  private async getPageDOM(input: string): Promise<Document> {
    //短时间内快速查询的情况下，如果上一个未返回，则直接中止
    if (this.xhr) this.xhr.abort();
    return new Promise((resolve, reject) => {
      //词典基于有道网页版
      const searchURL =
        "https://dict.youdao.com/w/" + encodeURIComponent(input);
      const xhr = new XMLHttpRequest();
      this.xhr = xhr;
      xhr.open("GET", searchURL);
      xhr.responseType = "document";
      xhr.timeout = 6000;
      xhr.addEventListener("load", () => {
        if (xhr.status < 200 || xhr.status >= 400)
          reject(
            createNoCacheError(
              `请求错误,状态码：${xhr.status}，原因：${xhr.statusText}`
            )
          );
        resolve(xhr.response);
      });
      xhr.addEventListener("error", () => {
        reject(createNoCacheError(`网络连接错误，请检查网络连接状态`));
      });
      xhr.addEventListener("timeout", () => {
        reject(createNoCacheError("请求超时,请再次尝试或查看网络连接状态"));
      });
      xhr.addEventListener("abort", () => {
        reject(createNoCacheError("请求被取消"));
      });
      xhr.send(null);
    });
  }

  /**
   * 对text进行翻译，获取翻译数据
   * @param text 需要进行翻译的文本
   */
  private async translateText(text: string): Promise<TranslationResult> {
    try {
      //将 驼峰、-、_ 等写法连接的文本转换为由空格分隔的文本
      text = lowerCase(text);
      const dom = await this.getPageDOM(text);
      let translation: WordData | PhraseData | SentenceData | void;
      //如果存在空格，则认为其为多个单词组合的句子、词组
      if (/\s/g.test(text)) {
        translation = translatePhraseAndSentence(dom);
      } else {
        translation = translateWord(dom);
      }

      if (!translation) handleNotFound(dom, text);
      //上面的判断决定了其必定不为空，因此可以使用 !进行断言
      return translation!;
    } catch (err: any) {
      if (isErrorData(err)) return err;
      return createNoCacheError(err?.message);
    }
  }
}

/**
 * 处理多个单词组成的翻译文本，一般情况下是 短语或句子
 */
function translatePhraseAndSentence(
  dom: Document
): SentenceData | PhraseData | void {
  //情况一：待翻译的是短语
  const translatedPhrase = translatePhrase(dom);
  if (translatedPhrase) return translatedPhrase;

  //情况二:待翻译的是句子
  const translatedSentence = translateSentence(dom);
  if (translatedSentence) return translatedSentence;
}

/**
 * 用于兜底处理未找到任何翻译的情况
 */
function handleNotFound(dom: Document, text: string) {
  //可能是用户拼写出错，推测正确的拼写给用户参考
  const possibleSpelling = getCorrectSpelling(dom);
  if (possibleSpelling) {
    throw createCacography(possibleSpelling);
  }
  //真的没有找到任何翻译
  throw createNoCacheError(`"没找到关于 '${text}' 的任何翻译"`);
}

/**
 * 获取页面的中关于拼写错误部分的正确推断
 */
function getCorrectSpelling(dom: Document) {
  const inferCorrects = [
    ...dom.querySelectorAll("#results-contents .error-typo .typo-rel a"),
  ].reduce((acc, node) => {
    const text = node.textContent;
    if (text) acc.push(text);
    return acc;
  }, [] as string[]);
  if (inferCorrects.length) return inferCorrects;
}
