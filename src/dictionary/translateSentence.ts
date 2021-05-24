import { SentenceData } from "../../types/index";

export default function translateSentence(dom:Document): SentenceData | undefined  {
  let sentence = dom.querySelectorAll('#ydTrans .trans-container p')[0]
    let transNode = dom.querySelectorAll('#ydTrans .trans-container p')[1];
    if (!sentence?.textContent) return
    if (!transNode?.textContent) return
    return {
      sentence: sentence.textContent,
      sentenceTranslation: transNode.textContent,
      sentence_audio: `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(sentence.textContent)}&le=eng`,
    }
}