import {
  laxOptions,
  Phonetic,
  ExampleSentence,
  TranslationUnit,
  WordTranslation,
  Options,
  SentenceTranslation,
} from "../../types/index"



export class Collins_en_cn {
  constructor() {
  }
  async translateWord(word: string): Promise<WordTranslation> {
    let dom = await getPageDOM(word)
    let frequence = Number(dom.querySelector(".star")?.className?.match(/star(\d)/)?.[1]) || 1
    word = <string>dom.querySelector(".wordbook-js")?.firstElementChild?.textContent

    return {
      word, //单词本体
      frequence,//单词出现的频率
      phonetic: getPhonetic(dom, word),//单词音标与音频
      translationUnits: getTranslationUnits(dom) //单词的翻译单元
    }
  }
  async translateSentence(sentence: string): Promise<SentenceTranslation> {
    let dom = await getPageDOM(sentence)
    let transNode = dom.querySelectorAll('#ydTrans .trans-container p')[1];
    if (!transNode) return {
      sentence: "",
      sentenceTranslation: ""
    }
    return {
      sentence,
      sentenceTranslation: transNode.textContent || ""
    }
  }
}

/**
 * 
 * @param input 需要进行翻译的内容
 * @returns 翻译内容对应的DOM文档
 */
async function getPageDOM(input: string): Promise<Document> {
  return new Promise((resolve) => {
    //词典基于有道网页版
    let BASE_URL = "http://dict.youdao.com/w/"
    let searchURL = BASE_URL + encodeURIComponent(input)
    let xhr = new XMLHttpRequest()
    xhr.open("GET", searchURL)
    xhr.responseType = "document"
    xhr.addEventListener("load", function () {
      resolve(xhr.response)
    })
    xhr.send(null)
  })
}

/**
 * @param dom 有道翻译页面文档DOM
 * @param word 翻译的目标单词
 * @returns 单词音标与音频对象
 */
function getPhonetic(dom: Document, word: string): Phonetic {
  let en = <string>dom.querySelectorAll(".pronounce")?.[0]?.textContent?.replace(/\s*|\r|\n/g, "")
  let am = <string>dom.querySelectorAll(".pronounce")?.[0]?.textContent?.replace(/\s*|\r|\n/g, "")
  return {
    am, //美国发音
    en,//英国发音
    am_audio: `http://dict.youdao.com/dictvoice?audio=${word}&type=2`, //美国发音音频URI
    en_audio: `http://dict.youdao.com/dictvoice?audio=${word}&type=1`, //英国发音音频URI
  }
}

/**
 * 
 * @param dom 网易网页版翻译所对应的DOM文档对象
 * @returns 获取单词例句相关的数据数组
 */
function getTranslationUnits(dom: Document): Array<TranslationUnit> {
  //获取所有翻译项
  let lis = dom.querySelectorAll("#collinsResult .ol li")
  if (!lis.length) return []
  return Array.from(lis).reduce((result, li) => {
    //处理释义与对应的翻译的逻辑
    let textResult = getTranslationText(li)
    //过滤无效项
    if (!textResult) {
      return result
    }
    let [text, index] = textResult
    result.push({
      part_of_speech: getPartOfSpeech(li), //词性
      definition: text.slice(0, index), //定义
      translation: text.slice(index).trim(), //翻译
      exampleSentences: getExampleSentences(li),//例句数组 
    })
    return result
  }, [] as Array<TranslationUnit>)
}

/**
 * 
 * @param li 需要处理的其中一条翻译条目所对应的li元素节点
 * @returns 返回该释义对应单词的词性，例如：n-count
 */
function getPartOfSpeech(li: Element): string {
  let targetNode = li.querySelector(".collinsMajorTrans p .additional")
  return (targetNode && targetNode.textContent) || ""
}

/**
 * 
 * @param li 需要处理的其中一条翻译条目所对应的li元素节点
 * @returns [text,index] 返回翻译文本 text ，以及用于截取英文释义与中文翻译的下标 index 
 */
function getTranslationText(li: Element): [string, number] | null {
  let pNode = <Element>li.querySelector(".collinsMajorTrans p")
  if (!pNode) return null
  //过滤掉干扰项
  let nodes = Array.from(pNode.childNodes).filter(node => {
    if (!node.textContent?.trim()) return false
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

  index = text.lastIndexOf(".",index) + 1

  return [text, index]
}

/**
 * 
 * @param li 需要处理的其中一条翻译条目所对应的li元素节点
 * @returns 返回例句相关数据
 */
function getExampleSentences(li: Element): ExampleSentence[] {
  let div_example_s = li.querySelectorAll(".exampleLists .examples")
  return Array.from(div_example_s).map(div => {
    let children = div.children
    let example_sentence = children[0].textContent || ""
    let example_sentence_translation = children[1].textContent || ""
    let example_audio = `https://fanyi.baidu.com/gettts?lan=en&text=${encodeURIComponent(example_sentence)}&spd=3&source=web`
    return {
      example_sentence, //英语例句
      example_sentence_translation, //中文例句
      example_audio //例句音频URI
    }
  })
}