export {agent} from "./agent"
export type {PostMessage} from "./agent"
export {postBackend,onMessage,postFrontend} from "./messager"
export {Cacher} from "./cacher"

/**
 * 防抖
 * @param callback 需要进行防抖处理的函数
 * @param time 
 * @returns 
 */
export function debounce(callback: Function, time: number,options?:{
  firstRun:boolean
}) {
  const firstRun = options?.firstRun
  let timerId: number | undefined
  return function (this: unknown, ...args: any[]) {
    if (firstRun && timerId == null) callback.apply(this, args)
    clearTimeout(timerId)
    timerId = window.setTimeout(() => {
      callback.apply(this, args)
    }, time)
  }
}
 
/**
 * 获取当前拖蓝选中的文本
 * @returns string
 */
export function getSelectionText() {
  let selection = getSelection()
  return selection?.toString().trim() || ""
}

/**
 * 对document.caretPositionFromPoint等方法进行浏览器兼容处理
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
export function optimizeText(text:string) {
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
export function measureTextWidth (text:string,fontSize:number = 16) {
  try {
    const ctx = <CanvasRenderingContext2D>document.createElement("canvas").getContext("2d")
    ctx.font = `${fontSize}px serif`
    return ctx.measureText(text).width
  }catch (e) {
    return text.length*fontSize
  }
}

/**
 * 用于判断当前焦点是否位于目标元素
 * @returns Boolean
 */
export function isActiveElement() {
  //当前聚焦元素的nodeName
  const focusNode = document.activeElement?.nodeName || ""
  //过滤掉输入框中的文本选中
  let filterNodeName = ["INPUT", "TEXTAREA"]
  if (filterNodeName.includes(focusNode)) return true
  return false
}
