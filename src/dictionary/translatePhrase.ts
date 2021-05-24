import { ExampleSentence, PhraseData } from "../../types/index"

export default function translatePhrase(dom:Document): PhraseData | undefined {
  const phrase = getOriginText(dom)
    if (!phrase) return
    let translation = dom.querySelectorAll('#ydTrans .trans-container p')[1]?.textContent
    const translations = getTranslation(dom) || (translation && [translation])
    if (!translations) return
    const phrase_audio = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(phrase)}`
    const exampleSentences = getPhraseExamples(dom)
    if (!exampleSentences) return
    return {
      phrase,
      translations,
      phrase_audio,
      exampleSentences
    }
}

/**
 * 获取翻译源文本
 * @param dom 
 * @returns 
 */
 function getOriginText(dom: Document): string {
  return (
    dom.querySelector(".wordbook-js")?.firstElementChild?.textContent ||
    ""
  )
}

/**
 * 获取单词的粗略翻译
 * @param dom 具有翻译内容的页面DOM
 * @returns 
 */
 function getTranslation(dom: Document): string[] | undefined {
  const ul = dom.querySelector("#phrsListTab .trans-container > ul")
  if (!ul) return
  const liNodes = ul.children
  let result = Array.from(liNodes).reduce((result, li) => {
    let text = li.textContent
    if (!text) return result
    result.push(text)
    return result
  }, [] as string[])
  if (!result.length) return
  return result
}

/**
 * 获取短语例句
 * @param dom 
 * @returns 
 */
 function getPhraseExamples(dom: Document): ExampleSentence[] | undefined {
  let liNodes = dom.querySelectorAll("#bilingual .ol li")
  let result = Array.from(liNodes).reduce((result, li) => {
    let pNodes = li.querySelectorAll("p")
    if (!pNodes[0] || !pNodes[1]) return result
    //用于获取音频
    const example_sentence_origin = pNodes[0]?.textContent || ""
    //获取短语加粗的例句
    const example_sentence = Array.from(pNodes[0].childNodes).reduce((sentence, node) => {
      let text
      if (node.nodeName !== "SPAN") return sentence
      const children = (<HTMLSpanElement>node).children
      if (!children.length) return sentence + node.textContent
      const childNodes = node.childNodes
      text = Array.from(childNodes).reduce((text, node) => {
        if (node.nodeType === 3) return text + node.textContent
        if (node.nodeName === "B") {
          return text + `<b>${node.textContent}</b>`
        }
        return text
      }, "")
      return sentence + text
    }, "")

    const example_sentence_translation = pNodes[1].textContent || ""
    const example_audio = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(example_sentence_origin)}&le=eng`
    result.push({
      example_audio,
      example_sentence,
      example_sentence_translation,
    })
    return result
  }, [] as ExampleSentence[])
  if (!result.length) return
  return result
}