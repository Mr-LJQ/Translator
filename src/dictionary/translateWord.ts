import { ErrorData, ExampleSentence, Phonetic, TranslationUnit, WordData } from "../../types/index";
import {getCorrectSpelling} from "./utils"

export default async function translateWord(word: string, dom: Document): Promise<WordData | ErrorData> {
  //单词大写开头与小写开头查询到的内容不一致，统一转换为全小写
  word = word.toLowerCase()
  word = getOriginText(dom)
  let starAmount = Number(dom.querySelector(".star")?.className?.match(/star(\d)/)?.[1]) || 0
  const correctWords = getCorrectSpelling(dom)
  if (correctWords) return {isCache:true,correct:correctWords,error:"拼写存在错误"}
  if (!word) return { error: "没有找到所查询的单词",isCache:false}

  return {
    word, //单词本体
    starAmount,//单词出现的频率
    translations: getTranslation(dom),
    phonetic: getPhonetic(dom, word),//单词音标与音频
    translationUnits: getTranslationUnits(dom, word) //单词的翻译单元
  }
}

/**
 * 获取翻译源文本
 * @param dom 
 * @returns 
 */
function getOriginText(dom: Document): string {
  return (
    dom.querySelector(".wordbook-js")?.firstElementChild?.textContent?.trim() ||
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
 * @param dom 有道翻译页面文档DOM
 * @param word 翻译的目标单词
 * @returns 单词音标与音频对象
 */
function getPhonetic(dom: Document, word: string): Phonetic {
  let en = dom.querySelectorAll(".pronounce")?.[0]?.textContent?.replace(/\s*|\r|\n/g, "")
  let am = dom.querySelectorAll(".pronounce")?.[1]?.textContent?.replace(/\s*|\r|\n/g, "")
  let am_audio, en_audio
  en_audio = `https://dict.youdao.com/dictvoice?audio=${word}&type=1`
  am_audio = `https://dict.youdao.com/dictvoice?audio=${word}&type=2`

  let phonetic = dom.querySelector("#collinsResult .wt-container .phonetic")?.textContent?.trim()
  if (phonetic) {
    phonetic = phonetic.replace(/^\//g, "[").replace(/\/$/, "]")
    if (!en || en.length < 3) en = (en || "") + phonetic
    if (!am || am.length < 3) am = (am || "") + phonetic
  }

  return {
    am, //美国发音
    en,//英国发音
    am_audio, //美国发音音频URI
    en_audio, //英国发音音频URI
  }
}

/**
 * 
 * @param dom 网易网页版翻译所对应的DOM文档对象
 * @param word 查询的单词
 * @returns 获取单词例句相关的数据数组
 */
function getTranslationUnits(dom: Document, word: string): Array<TranslationUnit> | undefined {
  //获取所有翻译项
  let lis = dom.querySelectorAll("#collinsResult .ol li")
  let result = Array.from(lis).reduce((result, li) => {
    //处理释义与对应的翻译的逻辑
    let textResult = getTranslationText(li)
    //过滤无效项
    if (!textResult) {
      return result
    }
    let [text, index] = textResult
    const definition = text.slice(0, index).trim()
    //清除<b></b>避免影响音频获取
    const definition_origin = definition.replace(/\<b\>|\<\/b\>/g, "")
    result.push({
      part_of_speech: getPartOfSpeech(li), //词性
      definition, //定义
      definition_audio: `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(definition_origin)}&le=eng`,
      translation: text.slice(index).trim(), //翻译
      exampleSentences: getExampleSentences(li),//例句数组 
    })
    return result
  }, [] as Array<TranslationUnit>)
  //避免出现空数组的情况
  if (!result.length) return
  return result
}

/**
 * 
 * @param li 需要处理的其中一条翻译条目所对应的li元素节点
 * @returns 返回该释义对应单词的词性，例如：n-count
 */
function getPartOfSpeech(li: Element): string {
  let targetNode = li.querySelector(".collinsMajorTrans p .additional")
  return (targetNode && targetNode.textContent?.trim()) || ""
}

/**
 * 
 * @param li 需要处理的其中一条翻译条目所对应的li元素节点
 * @returns [text,index] 返回翻译文本 text ，以及用于截取英文释义与中文翻译的下标 index 
 */
function getTranslationText(li: Element): [string, number] | null {
  let pNode = li.querySelector(".collinsMajorTrans p")
  if (!pNode) return null //不存在释义项
  //过滤掉干扰项
  let nodes = Array.from(pNode.childNodes).filter(node => {
    //过滤展示词性的节点
    if (node.nodeType === 1 && (node as Element).classList.contains("additional")) return false
    return true
  })
  //合并目标文本
  let text = ""
  nodes.forEach((node) => {
    if (node.nodeType === 3) {
      text += node.textContent
    }
    if (node.nodeName === "B") {
      text += `<b>${node.textContent}</b>`
    }
  })
  text = text.trim()
  //寻找英文释义与中文释义的边界
  let index = text.search(/[\u4e00-\u9fa5]+/i)
  //没有中文，则判断这并不是一个存放释义与翻译的标签
  if (index === -1) return null

  //可能存在以：(说的) 话 [强调]，结尾的情况，因此单纯的寻找第一个中文并不稳定。
  //如果句子以 . 结尾，则可以寻找点，但如果点不存在，则不应该更新index
  const pointIndex = text.lastIndexOf(".", index)
  index = pointIndex === -1 ? index : pointIndex + 1

  return [text, index]
}

/**
 * 
 * @param li 需要处理的其中一条翻译条目所对应的li元素节点
 * @returns 返回例句相关数据
 */
function getExampleSentences(li: Element): ExampleSentence[] | undefined {
  let div_example_s = li.querySelectorAll(".exampleLists .examples")
  let exampleSentences = Array.from(div_example_s).reduce((acc, div) => {
    let children = div.children
    let example_sentence = children[0]?.textContent?.trim() || ""
    let example_sentence_translation = children[1]?.textContent?.trim() || ""

    //如果例句存在才添加，否则应该过滤掉
    if (example_sentence) {
      acc.push({
        example_sentence, //英语例句
        example_sentence_translation, //中文例句
        example_audio: `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(example_sentence)}&le=eng`,
      })
    }

    return acc
  }, [] as ExampleSentence[])
  if (!exampleSentences.length) return
  return exampleSentences
}
