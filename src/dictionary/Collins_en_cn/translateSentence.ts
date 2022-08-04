import type { SentenceData } from "../types";

//句子翻译
export default function translateSentence(dom: Document): SentenceData | void {
  let sentenceNode = dom.querySelectorAll("#ydTrans .trans-container p")[0];
  let transNode = dom.querySelectorAll("#ydTrans .trans-container p")[1];
  const sentence = sentenceNode?.textContent?.trim();
  const sentence_translation = transNode?.textContent?.trim();
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
