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

import { youdao, alibaba } from "./dictionaries";
import {} from "./utils";
import {
  Cache,
  chain,
  spaceCase,
  isErrorData,
  NEXT_HANDLER,
  createNoCacheError,
} from "./utils";

import type {
  WordData,
  PhraseData,
  SentenceData,
  TranslationResult,
} from "./types";

export class Dictionary {
  private cache: Cache<string, TranslationResult>;
  private phraseTranslators: Array<
    (text: string) => Promise<PhraseData | typeof NEXT_HANDLER>
  >;
  private sentenceTranslators: Array<
    (text: string) => Promise<SentenceData | typeof NEXT_HANDLER>
  >;
  private wordTranslators: Array<
    (text: string) => Promise<WordData | typeof NEXT_HANDLER>
  >;
  constructor(max = 30) {
    const { translateWord, translatePhrase, translateSentence } = youdao;
    this.wordTranslators = [translateWord];
    this.phraseTranslators = [translatePhrase];
    this.sentenceTranslators = [translateSentence, alibaba.translateSentence];
    this.cache = new Cache(max);
  }
  /**
   * 该函数主要处理缓存的问题
   * @param text 待翻译文本
   * @returns 翻译结果
   */
  async translate(text: string): Promise<TranslationResult> {
    const { cache } = this;
    const translation = cache.get(text);
    if (translation) return translation;
    const translationResult = await this.translateText(text);
    if (isErrorData(translationResult) && !translationResult.cache) {
      translationResult.queryText = text;
      return translationResult;
    }
    this.cache.set(text, translationResult);
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
    //将 驼峰、-、_ 等写法连接的文本转换为由空格分隔的文本
    const formattedText = spaceCase(text);
    const isFormattedMuchWord = /\s/g.test(formattedText);

    let result: TranslationResult;
    try {
      if (isKebabCase || (!isMuchWord && !isFormattedMuchWord)) {
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
  private translatePhraseOrSentence(muchWord: string) {
    //短语优先与句子
    return chain([...this.phraseTranslators, ...this.sentenceTranslators], {
      args: [muchWord],
      fallback: () => {
        return createNoCacheError(omitText(muchWord));
      },
    });
  }
  private translateWord(word: string) {
    return chain(this.wordTranslators, {
      args: [word],
      fallback: () => {
        return createNoCacheError(omitText(word));
      },
    });
  }
}

/**
 * 纯函数，用于复用 省略过长文本 的操作
 */
function omitText(text: string) {
  return `"没找到关于 '${
    text.length > 100 ? text.slice(0, 101) + "..." : text
  }' 的任何翻译"`;
}
