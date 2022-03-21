export default function translateSentence(dom: Document){
  let sentenceNode = dom.querySelectorAll('#ydTrans .trans-container p')[0]
  let transNode = dom.querySelectorAll('#ydTrans .trans-container p')[1];
  const sentence = sentenceNode?.textContent?.trim()
  const sentenceTranslation = transNode?.textContent?.trim()
  if (!sentence || !sentenceTranslation) return
  return {
    sentence,
    sentenceTranslation,
    sentence_audio: `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(sentence)}&le=eng`,
  }
}

export type SentenceData = NonNullable<ReturnType<typeof translateSentence>>