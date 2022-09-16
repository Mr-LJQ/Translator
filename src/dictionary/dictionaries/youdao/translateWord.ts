import type { WordData, ExampleSentence, TranslationItem } from "../../types";

//单词翻译
export function translateWord(dom: Document): WordData | void {
  //这是一个与传入的参数全等的字符串，之所以进行这一步，
  // 是因为如果该字符不能够在网页上被找到，则意味着翻译不存在/拼写错误。
  const word = getOriginText(dom);
  const star_amount =
    Number(dom.querySelector(".star")?.className?.match(/star(\d)/)?.[1]) || 0;
  if (!word) return;
  const translations = formatTranslations(getTranslation(dom));
  const translationList = getTranslationList(dom);
  if (!translations && !translationList) return;
  return {
    word,
    star_amount,
    type: "WORD",
    translations,
    translationList,
    form: getForm(dom),
    phonetic: getPhonetic(dom, word),
  };
}

/**
 * 获取单词的形式，例如,对于 word 则有
 * [ 复数 words 第三人称单数 words 现在分词 wording 过去式 worded 过去分词 worded ]
 */
function getForm(dom: Document) {
  const p = dom.querySelector("#phrsListTab .trans-container p.additional");
  if (!p) return;
  const form = p.textContent?.trim();
  if (form?.startsWith("[") && form.endsWith("]")) return form;
  return;
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
  );
}

/**
 * 获取单词的粗略翻译
 * @param dom 具有翻译内容的页面DOM
 * @returns
 */
function getTranslation(dom: Document): string[] | undefined {
  const ul = dom.querySelector("#phrsListTab .trans-container > ul");
  if (!ul) return;
  const liNodes = ul.children;
  const result = Array.from(liNodes).reduce((result, li) => {
    const text = li.textContent;
    if (!text) return result;
    result.push(text);
    return result;
  }, [] as string[]);
  if (!result.length) return;

  return result;
}

/**
 * @param dom 有道翻译页面文档DOM
 * @param word 翻译的目标单词
 * @returns 单词音标与音频对象
 */
function getPhonetic(dom: Document, word: string) {
  let en = dom
    .querySelectorAll(".pronounce")?.[0]
    ?.textContent?.replace(/\s*|\r|\n/g, "");
  let am = dom
    .querySelectorAll(".pronounce")?.[1]
    ?.textContent?.replace(/\s*|\r|\n/g, "");
  const en_audio = `https://dict.youdao.com/dictvoice?audio=${word}&type=1`;
  const am_audio = `https://dict.youdao.com/dictvoice?audio=${word}&type=2`;

  let phonetic = dom
    .querySelector("#collinsResult .wt-container .phonetic")
    ?.textContent?.trim();
  if (phonetic) {
    phonetic = phonetic.replace(/^\//g, "[").replace(/\/$/, "]");
    if (!en || en.length < 3) en = (en || "") + phonetic;
    if (!am || am.length < 3) am = (am || "") + phonetic;
  }

  return {
    am, //美国发音
    en, //英国发音
    am_audio, //美国发音音频URI
    en_audio, //英国发音音频URI
  };
}

/**
 * @param dom 网易网页版翻译所对应的DOM文档对象
 * @param word 查询的单词
 * @returns 获取单词例句相关的数据数组
 */
function getTranslationList(dom: Document): Array<TranslationItem> | undefined {
  //获取所有翻译项
  const lis = dom.querySelectorAll("#collinsResult .ol li");
  const result = Array.from(lis).reduce((result, li) => {
    //处理释义与对应的翻译的逻辑
    const textResult = getTranslationText(li);
    //过滤无效项
    if (!textResult) {
      return result;
    }
    const [text, index] = textResult;
    const definition = text.slice(0, index).trim();
    //清除<b></b>避免影响音频获取
    const definition_origin = definition.replace(/<b>|<\/b>/g, "");
    result.push({
      part_of_speech: getPartOfSpeech(li), //词性
      definition, //定义
      definition_audio: `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(
        definition_origin
      )}&le=eng`,
      translation: text
        .slice(index)
        .replace(/see|also|→/gi, "")
        .trim(), //翻译
      example_sentences: getExampleSentences(li), //例句数组
    });
    return result;
  }, [] as Array<TranslationItem>);
  //避免出现空数组的情况
  if (!result.length) return;
  return result;
}

/**
 *
 * @param li 需要处理的其中一条翻译条目所对应的li元素节点
 * @returns 返回该释义对应单词的词性，例如：n-count
 */
function getPartOfSpeech(li: Element): string {
  const targetNode = li.querySelector(".collinsMajorTrans p .additional");
  return (targetNode && targetNode.textContent?.trim()) || "";
}

/**
 * @param li 需要处理的其中一条翻译条目所对应的li元素节点
 * @returns [text,index] 返回翻译文本 text ，以及用于截取英文释义与中文翻译的下标 index
 */
function getTranslationText(li: Element): [string, number] | null {
  const pNode = li.querySelector(".collinsMajorTrans p");
  if (!pNode) return null; //不存在释义项
  //过滤掉干扰项
  const nodes = Array.from(pNode.childNodes).filter((node) => {
    //过滤展示词性的节点
    if (
      node.nodeType === 1 &&
      (node as Element).classList.contains("additional")
    )
      return false;
    return true;
  });
  //合并目标文本
  let text = "";
  nodes.forEach((node) => {
    if (node.nodeType === 3) {
      text += node.textContent;
    }
    if (node.nodeName === "B") {
      text += `<b>${node.textContent}</b>`;
    }
  });
  text = text.trim();
  //寻找英文释义与中文释义的边界
  let index = text.search(/[\u4e00-\u9fa5]+/i);
  //没有中文，则判断这并不是一个存放释义与翻译的标签
  if (index === -1) return null;

  //避免 中文翻译 被括号包裹起来的情况，而导致的 ()残留
  const reg = /[a-z.)]/i;
  while (index > 0) {
    if (reg.test(text[index - 1] || "")) break;
    index--;
  }
  return [text, index];
}

/**
 *
 * @param li 需要处理的其中一条翻译条目所对应的li元素节点
 * @returns 返回例句相关数据
 */
function getExampleSentences(li: Element): ExampleSentence[] | undefined {
  const div_example_s = li.querySelectorAll(".exampleLists .examples");
  const exampleSentences = Array.from(div_example_s).reduce((acc, div) => {
    const children = div.children;
    const example_sentence = children[0]?.textContent?.trim() || "";
    const example_sentence_translation = children[1]?.textContent?.trim() || "";

    //如果例句存在才添加，否则应该过滤掉
    if (example_sentence) {
      acc.push({
        example_sentence, //英语例句
        example_sentence_translation, //中文例句
        example_audio: `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(
          example_sentence
        )}&le=eng`,
      });
    }

    return acc;
  }, [] as ExampleSentence[]);
  if (!exampleSentences.length) return;
  return exampleSentences;
}

/**
 * 纯函数，格式化translations的结构
 */
function formatTranslations(translations: string[] | undefined) {
  if (translations == null) return;
  const formated = translations.reduce(function (acc, cur) {
    const point = cur.indexOf(".") + 1;
    const part_of_speech = point === -1 ? "" : cur.slice(0, point);
    const oldArray = acc[part_of_speech];
    const newArray = cur.slice(point).split("；");

    if (oldArray == null) {
      acc[part_of_speech] = newArray;
    } else {
      oldArray.push(...newArray);
      acc[part_of_speech] = oldArray;
    }

    return acc;
  }, {} as { [key: string]: string[] });
  return formated;
}
