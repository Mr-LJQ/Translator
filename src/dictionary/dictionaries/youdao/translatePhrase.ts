import type { CheerioAPI } from "cheerio";
import type { ExampleSentence, PhraseData } from "../../types";
/**
 * 短语翻译
 */
export function translatePhrase($: CheerioAPI): PhraseData | void {
  const phrase = getOriginText($);
  if (!phrase) return;
  const translation = $("#ydTrans .trans-container p").eq(1).text().trim();
  const translations = getTranslation($) || (translation && [translation]);
  if (!translations) return;

  const phrase_audio = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(
    phrase
  )}`;
  const example_sentences = getPhraseExamples($);
  return {
    phrase,
    translations,
    phrase_audio,
    type: "PHRASE",
    example_sentences,
  };
}
/**
 * 获取翻译源文本
 */
function getOriginText($: CheerioAPI) {
  return $(".wordbook-js").children().first().text().trim() || "";
}
/**
 * 获取单词的粗略翻译
 */
function getTranslation($: CheerioAPI) {
  const ul = $("#phrsListTab .trans-container > ul");
  if (ul.length === 0) return;
  const result = ul
    .children()
    .map((i, e) => {
      return $(e).text().trim();
    })
    .toArray()
    .filter((text) => text);
  if (result.length === 0) return;
  return result;
}
/**
 * 获取短语例句
 */
function getPhraseExamples($: CheerioAPI) {
  const liNodes = $("#bilingual .ol li");
  const result = Array.from(liNodes).reduce((result, li) => {
    const pNodes = $("p", li);
    if (pNodes.length < 2) return result;
    //用于获取音频
    const example_sentence_origin = pNodes.first().text().trim() || "";
    //获取短语加粗的例句
    const example_sentence = Array.from(pNodes.first().contents())
      .reduce((sentence, node) => {
        //@ts-ignore
        if (node.tagName !== "span") return sentence;
        const children = $(node).children();
        if (!children.length) return sentence + $(node).text();
        const childNodes = $(node).contents();
        const text = Array.from(childNodes).reduce((text, node) => {
          if (node.nodeType === 3) return text + $(node).text();
          //@ts-ignore
          if (node.tagName === "b") {
            return text + `<b>${$(node).text()}</b>`;
          }
          return text;
        }, "");
        return sentence + text;
      }, "")
      .trim();

    const example_sentence_translation = pNodes.eq(1).text().trim() || "";
    const example_audio = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(
      example_sentence_origin
    )}&le=eng`;
    result.push({
      example_audio,
      example_sentence,
      example_sentence_translation,
    });
    return result;
  }, [] as ExampleSentence[]);
  if (!result.length) return;
  return result;
}
