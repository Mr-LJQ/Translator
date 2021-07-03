export { default as Agent } from "./agent"
export type { PostMessage } from "./agent"
export { Cacher, History } from "./cacher"

/**
 * 纯函数，获取当前拖蓝选中的文本(已清除左右空格)
 * @returns string
 */
export function getSelectionText(): string | undefined {
  let selection = getSelection()
  return selection?.toString().trim()
}

/**
 * 纯函数,对document.caretPositionFromPoint等方法进行浏览器兼容处理
 * @param x clientX
 * @param y clientY
 * @returns Range
 */
export function getRangeFromPoint(x: number, y: number): Range | null {

  if ("caretRangeFromPoint" in document) {
    return (document as Document).caretRangeFromPoint(x, y)
  }

  if ("caretPositionFromPoint" in document) {
    let caretPosition = (document as Document).caretPositionFromPoint(x, y)
    if (!caretPosition) return null
    let { offsetNode, offset } = caretPosition
    let range = (document as Document).createRange()
    range.setStart(offsetNode, offset)
    return range
  }

  return null
}

/**
 * 去除驼峰、去除 -_ 连接符，使单词回归正常语法
 * @param text 进行去驼峰、去连接符的文本
 * @returns 标准化语句
 */
export function optimizeText(text: string) {
  //匹配驼峰
  let camel = /([a-z])([A-Z])([a-z])/g;
  //匹配joinLine
  let joinLine = /([a-z])[-_]([a-z])/gi;

  return text
    .replace(camel, function (item, $1, $2, $3) {
      return $1 + " " + $2.toLowerCase() + $3;
    })
    .replace(joinLine, "$1" + " " + "$2");
}

/**
 * 纯函数,测量文本宽度
 * @param text 需要测量宽度的文本
 * @param fontSize 单个字体大小
 * @return number 文本宽度
 */
export function measureTextWidth(text: string, fontSize: number = 16) {
  try {
    const ctx = <CanvasRenderingContext2D>document.createElement("canvas").getContext("2d")
    ctx.font = `${fontSize}px serif`
    return ctx.measureText(text).width
  } catch (e) {
    return text.length * fontSize
  }
}

interface Options {
  predicate: (this: void, ...args: any[]) => boolean,
  callback?: (this: void, ...args: any[]) => void
  time?: number
  firstRun?: boolean
}

export function loopJudgment(options: Options) {
  const { predicate, callback, time = 1000, firstRun = false } = options
  let count = 0
  let timerId: any
  if (firstRun && predicate(count)) return callback?.()
  const loopCallback = function () {
    if (predicate(count)) {
      return callback?.()
    }
    count++
    timerId = setTimeout(loopCallback, time);
  }
  timerId = setTimeout(loopCallback, time);
  return function () {
    clearTimeout(timerId)
  }
}

/**
  * 纯函数，过滤掉无效查询
  *  - 字符串为空的情况
  *  - 查询主体并非英文
  * @param text 
  * @return 返回过滤后的字符，该字符应当是符合查询要求的
  */
export function validateText(text: string) {
  text = text.trim()

  //过滤为空的字符串
  if (!text) return false

  //如果英文字母数量不足百分之五十，则认为其并非需要查询的内容
  const amount = text.match(/\b[a-z]+\b/ig)?.reduce((amount, item) => {
    return amount + item.length
  }, 0)
  if (!amount || (amount / text.length < 0.5)) return false

  //过滤用户对URL的复制的查询
  if (text.search(/http:|https:/gi) === 0) return false

  //存在3个以上换行符时，用户可能只是进行复制粘贴操作，过滤掉
  const nLength = text.match(/\n/g)?.length
  if (nLength && nLength > 3) return false

  return true
}

/**
 * 纯函数，根据键提取目标对象的值，并返回新对象
 * @param target 目标对象
 * @param keys 需要提取的值所对应的键数组
 * @returns 新对象，包含目标对象特定的键的值
 */
export function pick<T extends object>(target: T, keys: Array<keyof T>): Partial<T> {
  const result: Partial<T> = {}
  keys.forEach((key) => {
    result[key] = target[key]
  })
  return result
}

/**
 * 纯函数，Object.entries()的单一版本，只提取单个键的[key,value]
 * @param target 目标对象
 * @param key 需要提取的键
 * @returns [key,value]
 */
export function extractEntry<T extends object, K extends keyof T>(target: T, key: K): [K, T[K]] {
  return [key, target[key]]
}