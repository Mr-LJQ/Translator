import { SentenceData } from "../../types/index";

export default function translateSentence(dom: Document): SentenceData | undefined {
  let sentence = dom.querySelectorAll('#ydTrans .trans-container p')[0]
  let transNode = dom.querySelectorAll('#ydTrans .trans-container p')[1];
  const sentenceText = sentence?.textContent?.trim()
  const sentenceTextTranslation = transNode?.textContent?.trim()
  if (!sentenceText) return
  if (!sentenceTextTranslation) return
  return {
    sentence: sentenceText,
    sentenceTranslation: sentenceTextTranslation,
    sentence_audio: `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(sentenceText)}&le=eng`,
  }
}