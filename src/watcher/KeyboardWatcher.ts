/*
  监听用户热键(shift/ctrl/alt)，
    当用户按下热键时，
    自动选中当前鼠标悬停位置的所对应的单词
    进行对选择单词的查询
*/
import { getSelectionText, getRangeFromPoint } from "../utils/index"
import { CachedOptions, Point } from "../../types/index"

export class KeyboardWatcher {

  private getClientPoint: () => Point
  private showTranslated: (text: string) => void
  private hotKey: CachedOptions["hotKey"]
  private checkout: RegExp

  constructor(showTranslated: (text: string) => void, getClientPoint: () => Point) {
    this.getClientPoint = getClientPoint
    this.showTranslated = showTranslated
    this.hotKey
    this.checkout = /[a-z_]/i

    //所有向外暴露的方法的this都是绑定的
    this.install = this.install.bind(this)
    this.uninstall = this.uninstall.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.updateHotKey = this.updateHotKey.bind(this)
    this.updateCheckout = this.updateCheckout.bind(this)
  }

  updateCheckout(source: string) {
    this.checkout = new RegExp(source)
  }
  updateHotKey(hotKey: CachedOptions["hotKey"]) {
    this.hotKey = hotKey
  }

  install() {
    document.addEventListener("keydown", this.onKeyDown)
  }
  uninstall() {
    document.removeEventListener("keydown", this.onKeyDown)
  }

  private onKeyDown(event: KeyboardEvent) {
    const { hotKey } = this
    const { x, y } = this.getClientPoint()
    if (hotKey && event[hotKey]) {
      this.autoSelectText(x, y)
      let selectedText = getSelectionText()
      if (!selectedText) return
      this.showTranslated(selectedText)
    }
  }

  /**
   * 判断是否符合自动选中条件
   * @param letter 当前需要判断的字母
   * @returns Boolean
   */
  private validate(letter: string) {
    return this.checkout.test(letter)
  }

  /**
   * 根据用户鼠标的当前位置，自动选中符合要求的文本，并用拖蓝的形式返回
   * 间接触发 selectionchange 监听(监听由 ./SelectionWatcher.ts 文件添加)
   * @param x ClientX
   * @param y ClientY
   * @returns 
   */
  private autoSelectText(x: number, y: number) {
    let range = getRangeFromPoint(x, y)
    if (!range) return
    let node = range.startContainer

    //并非文本节点，退出
    if (node.nodeType !== 3) return

    range = this.extendRange(range)

    //用拖蓝形式展现被选中的单词
    let selection = getSelection()

    if (!selection) return

    selection.removeAllRanges()
    selection.addRange(range)
  }

  /**
   * 传入一个 选中文本节点 的Range对象，
   * 按照一定要求对其进行扩充，
   * 返回一个新的Range
   * 
   * @param range Range
   * @returns Range
   */
  private extendRange(range: Range): Range {
    let textNode = <CharacterData>range.startContainer
    let limit_left = 0
    let limit_right = textNode.length
    let text = textNode.data
    let { startOffset, endOffset } = range

    //如果当前鼠标位置的字符不符合要求，则表明无需进行自动选取
    if (!this.validate(text[startOffset])) return range

    while (limit_left <= startOffset) {
      let letter = text[startOffset]
      if (this.validate(letter)) {
        startOffset--
      } else {
        break
      }
    }
    //回退到前一个符合要求的字符
    startOffset++

    //startOffset与endOffset在一开始是相等的，避免重复验证同一个字符
    endOffset++
    while (endOffset < limit_right) {
      let letter = text[endOffset]
      if (this.validate(letter)) {
        endOffset++
      } else {
        break
      }
    }
    //因为setEnd不包括endOffset，因此不用回退到上一个符合要求的字符
    //但需要注意，避免endOffset超出limit_right
    endOffset = Math.min(limit_right, endOffset)
    let result
    result = new Range()
    result.setStart(textNode, startOffset)
    result.setEnd(textNode, endOffset)
    return result
  }
}












