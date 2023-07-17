/**
 * 插件的目标是提供最全面且最好的翻译，至于来源对于用户来说是可能是无关紧要的。
 *  存在多个翻译源，那么我可以实现一个“责任链模式”，当一个翻译源失效的时候，
 *    能够自动的将任务发放到下一个翻译源。
 * 这种模式带来了一个新的问题，因为需要“按链”发送多个请求，所以可能出现翻译缓慢的情况。
 *  这要求第一个翻译源应该可以涵盖大部分的翻译需求，
 *    而其它翻译源只是作为第一翻译源无法得到翻译时的后备
 * 这条责任链应该越短越好，因为每一个处理器其实都需要进行网络请求，
 *  而网络请求往往是缓慢的，特别是在网络情况不好的时候。
 */
import {
  getSessionStorage,
  setSessionStorage,
  removeSessionStorage,
  getBytesInUseSessionStorage,
} from "@/extensions-api";
import transformWords from "lodash.words";
import { youdao, alibaba } from "./dictionaries";
import { chain, isErrorData, NEXT_HANDLER, createNoCacheError } from "./utils";
import type {
  WordData,
  PhraseData,
  SentenceData,
  TranslationResult,
} from "./types";

export class Dictionary {
  private phraseTranslators: Array<
    (text: string) => Promise<PhraseData | typeof NEXT_HANDLER>
  >;
  private sentenceTranslators: Array<
    (text: string) => Promise<SentenceData | typeof NEXT_HANDLER>
  >;
  private wordTranslators: Array<
    (text: string) => Promise<WordData | typeof NEXT_HANDLER>
  >;
  private chineseTranslators: Array<
    (text: string) => Promise<WordData | SentenceData | typeof NEXT_HANDLER>
  >;
  constructor() {
    const { translateWord, translatePhrase, translateSentence } = youdao;
    this.wordTranslators = [translateWord];
    this.phraseTranslators = [translatePhrase];
    this.chineseTranslators = [translateWord, alibaba.translateChinese];
    this.sentenceTranslators = [translateSentence, alibaba.translateSentence];
  }
  /**
   * 该函数主要处理缓存的问题
   * @param text 待翻译文本
   * @returns 翻译结果
   */
  async translate(text: string): Promise<TranslationResult> {
    const cacheObject = await getSessionStorage({
      translationCachedObject: {},
    });
    const translationCachedObject = cacheObject.translationCachedObject || {};
    if (Reflect.has(translationCachedObject, text))
      return translationCachedObject[text]!;
    const translationResult = await this.translateText(text);
    if (isErrorData(translationResult) && !translationResult.cache) {
      translationResult.queryText = text;
      return translationResult;
    }
    translationCachedObject[text] = translationResult;
    try {
      await setSessionStorage({ translationCachedObject });
      // 这是显而易见的异步查询，但不知道为何eslint报错
      // eslint-disable-next-line testing-library/no-await-sync-query
      const bytes = await getBytesInUseSessionStorage(
        "translationCachedObject"
      );
      if (bytes > 2 ** 19) {
        //只缓存0.5M翻译数据
        removeSessionStorage("translationCachedObject");
      }
    } catch (e) {
      removeSessionStorage("translationCachedObject");
    }
    return translationResult;
  }
  /**
   * 该函数主要是将 text 区分为 word 、phrase 、sentence,并进行一些错误处理
   * @param text 带翻译文本
   * @returns 翻译结果
   */
  private async translateText(text: string): Promise<TranslationResult> {
    //对于以 - 连接的单个单词，例如 add-on，应该传递原文本
    const kebabCase = /\b[a-z]+-[a-z]+\b/i;
    const kebabText = text.replace(kebabCase, "");
    const isKebabCase = kebabText.length === 0;
    //对于多个单词组合而成的文本，应该传递为原文本
    const isMuchWord = /\s/g.test(text);
    //将单词字符串转换为单词数组
    const words = transformWords(`${text}`.replace(/['\u2019]/g, ""));
    //将 驼峰、-、_ 等写法连接的文本转换为由空格分隔的文本
    const formattedText = words.reduce(
      (result, word, index) => result + (index ? " " : "") + word,
      ""
    );
    const isFormattedMuchWord = /\s/g.test(formattedText);

    let result: TranslationResult;
    try {
      if (isChinese(text, words.length)) {
        result = await this.translateChinese(text);
      } else if (isKebabCase || (!isMuchWord && !isFormattedMuchWord)) {
        result = await this.translateWord(text);
      } else {
        const muchWord = isMuchWord ? text : formattedText;
        result = await this.translatePhraseOrSentence(muchWord);
      }
    } catch (e) {
      if (isErrorData(e)) {
        result = e;
      } else if (e instanceof Error) {
        result = createNoCacheError(e.message);
      } else {
        result = createNoCacheError(String(e));
      }
    }
    return result;
  }
  /**
   * 由于无法将 phrase 与 sentence 区分开，因此先判断是否为 phrase，如果不是再将其作为 sentence处理
   * @param muchWord 多个单词组成的文本
   */
  private translatePhraseOrSentence(text: string) {
    //短语优先与句子
    return taskChain(
      [...this.phraseTranslators, ...this.sentenceTranslators],
      text
    );
  }
  private translateWord(text: string) {
    return taskChain(this.wordTranslators, text);
  }
  private translateChinese(text: string) {
    return taskChain(this.chineseTranslators, text);
  }
}
/**
 * 封装起来的重复代码
 */
function taskChain<T extends (text: string) => Promise<any>>(
  handler: T[],
  text: string
) {
  return chain(handler, {
    args: [text] as Parameters<T>,
    fallback: () => {
      return createNoCacheError(omitText(text));
    },
  });
}

/**
 * 纯函数，用于复用 省略过长文本 的操作
 */
function omitText(text: string) {
  return `"没找到关于 '${
    text.length > 100 ? text.slice(0, 101) + "..." : text
  }' 的任何翻译"`;
}

/**
 * 纯函数，判断传入的字符是否包含中文
 */
function isChinese(text: string, wordSize: number) {
  let chineseSize = 0;
  text.replace(/[\u4e00-\u9fa5]+/gi, (chinese) => {
    chineseSize += chinese.length;
    return chinese;
  });
  if (chineseSize / wordSize >= 0.5) {
    return true;
  }
  return false;
}
