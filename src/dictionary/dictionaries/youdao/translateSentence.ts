import type { SentenceData } from "../../types";
import type { CheerioAPI } from "cheerio";

/**
 * 句子翻译
 */
export function translateSentence($: CheerioAPI): SentenceData | void {
  const sentenceNode = $("#ydTrans .trans-container p").first();
  const transNode = $("#ydTrans .trans-container p").eq(1);
  const sentence = sentenceNode.text().trim();
  const sentence_translation = transNode.text().trim();
  if (!sentence || !sentence_translation) return;
  return {
    sentence,
    type: "SENTENCE",
    sentence_translation,
    sentence_audio: `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(
      sentence
    )}&le=eng`,
  };
}
