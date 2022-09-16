import {
  ErrorData,
  PhraseData,
  SentenceData,
  TranslationResult,
  WordData,
} from "../../types";
import { translateWord as _translateWord } from "./translateWord";
import { createCacography, request, NEXT_HANDLER } from "../../utils";
import { translatePhrase as _translatePhrase } from "./translatePhrase";
import { translateSentence as _translateSentence } from "./translateSentence";

export const youdao = {
  translateWord: catchError(_translateWord),
  translatePhrase: catchError(_translatePhrase),
  translateSentence: catchError(_translateSentence),
};

/**
 * 用于获取有道翻译页面
 * @param text 待翻译文本
 * @returns 翻译文本对应的 Document
 */
async function getDOM(text: string) {
  const dom = (await request(
    "https://dict.youdao.com/w/" + encodeURIComponent(text),
    {
      timeout: 4000,
      responseType: "document",
    }
  )) as Document;
  return dom;
}

/**
 * 封装部分重复逻辑，主要用于处理 _translatePhrase _translateWord _translateSentence 内部可能出现的报错
 * @param handler
 * @returns
 */
function catchError(
  handler: typeof _translateWord
): (text: string) => Promise<WordData | typeof NEXT_HANDLER>;
function catchError(
  handler: typeof _translatePhrase
): (text: string) => Promise<PhraseData | typeof NEXT_HANDLER>;
function catchError(
  handler: typeof _translateSentence
): (text: string) => Promise<SentenceData | typeof NEXT_HANDLER>;
function catchError(
  handler: (dom: Document) => void | Exclude<TranslationResult, ErrorData>
): (
  text: string
) => Promise<Exclude<TranslationResult, ErrorData> | typeof NEXT_HANDLER> {
  return async (text: string) => {
    const dom = await getDOM(text);
    let result;
    try {
      result = handler(dom);
    } catch (e) {
      console.error(e);
      result = NEXT_HANDLER;
    }
    if (result == null) handleNotFound(dom);
    //void 的情况应该被 handleNotFound 处理，
    // 但为了避免版本多次迭代后可能出现的 void，
    //  因此设定默认值为 NEXT_HANDLER
    return result || NEXT_HANDLER;
  };
}

/**
 * 用于处理未找到任何翻译的情况
 *  可能是用户拼写错误
 *  也可能是真的没有找到任何翻译
 */
function handleNotFound(dom: Document) {
  //可能是用户拼写出错，推测正确的拼写给用户参考
  const possibleSpelling = getCorrectSpelling(dom);
  if (possibleSpelling) {
    throw createCacography(possibleSpelling);
  }
  //真的没有找到任何翻译
  throw NEXT_HANDLER;
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
