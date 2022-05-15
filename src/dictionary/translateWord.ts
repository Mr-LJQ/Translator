
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//声明
export interface WordData {
  word: string  //单词本体
  star_amount: number //单词出现的频率
  phonetic: Phonetic //单词音标与音频
  translations?: string[] //简略翻译
  translationList?: Array<TranslationItem>//单词的翻译单元
}
export interface ExampleSentence {
  example_sentence: string //英语例句
  example_sentence_translation: string //中文例句
  example_audio: string //例句音频URI
}

export interface TranslationItem {
  part_of_speech: string //词性
  translation: string  //翻译
  definition: string  //定义
  definition_audio: string //定义音频
  example_sentences?: Array<ExampleSentence> //例句数组
}

export interface Phonetic {
  am?: string  //美国发音
  en?: string  //英国发音
  am_audio?: string //美国发音音频URI
  en_audio?: string //英国发音音频URI
}

export interface ErrorData {
  cache: boolean
  possibleSpelling?: string[],
  errorMessage: string,
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//单词翻译

export default function translateWord(dom: Document): WordData | ErrorData {
  let word = getOriginText(dom)
  let star_amount = Number(dom.querySelector(".star")?.className?.match(/star(\d)/)?.[1]) || 0
  const correctWords = getCorrectSpelling(dom)
  if (correctWords) return { cache: true, possibleSpelling: correctWords, errorMessage: "拼写存在错误" }
  if (!word) return { errorMessage: "没有找到所查询的单词", cache: false }

  return {
    word, //单词本体
    star_amount,//单词出现的频率
    translations: getTranslation(dom),
    phonetic: getPhonetic(dom, word),//单词音标与音频
    translationList: getTranslationList(dom, word) //单词的翻译单元
  }
}

/**
 * 获取页面的中关于拼写错误部分的正确推断
 */
export function getCorrectSpelling(dom: Document) {
  const inferCorrects = [...dom.querySelectorAll("#results-contents .error-typo .typo-rel a")].reduce((acc, node) => {
    const text = node.textContent
    if (text) acc.push(text)
    return acc
  }, [] as string[])
  if (inferCorrects.length) return inferCorrects
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
function getPhonetic(dom: Document, word: string) {
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
function getTranslationList(dom: Document, word: string): Array<TranslationItem> | undefined {
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
      example_sentences: getExampleSentences(li),//例句数组 
    })
    return result
  }, [] as Array<TranslationItem>)
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
  let reg = /[a-z.)]/i
  while (index >= 0) {
    if (reg.test(text[index - 1])) break
    index--
  }
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
