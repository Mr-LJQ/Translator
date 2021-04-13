/**
 * 防抖
 * @param callback 需要进行防抖处理的函数
 * @param time 
 * @returns 
 */
export function debounce(callback: Function, time: number) {
  let timerId: number
  return function (this: unknown, ...args: any[]) {
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