//监听用户热键(shift/ctrl/alt)，当用户按下热键时，选中当前鼠标悬停位置的所对应的单词
import {getRangeFromPoint} from "../utils"

interface Point { x: number, y: number }

export class KeyboardWatcher {

  private point: Point
  private checkout:RegExp
  private hotKey: "shiftKey" | "ctrlKey" | "altKey"

  constructor() {
    this.point = {} as Point
    this.hotKey = "shiftKey"
    this.checkout = /[a-z_]/i

    this.onMouseMove = this.onMouseMove.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
  }
  install() {
    //时刻更新鼠标当前位置到this.point
    document.addEventListener("mousemove", this.onMouseMove)
    document.addEventListener("keydown", this.onKeyDown)
  }
  uninstall() {
    document.removeEventListener("mousemove", this.onMouseMove)
    document.removeEventListener("keydown", this.onKeyDown)
  }
  
  //因为无法不通过事件获取鼠标相对视口位置，因此需要该监听
  private onMouseMove(event: MouseEvent) {
    let {point} = this
    point.x = event.clientX
    point.y = event.clientY
  }

  private onKeyDown(event: KeyboardEvent) {
    const { hotKey, point } = this
    const { x, y } = point
    if (event[hotKey]) {
      this.selectRangeText(x, y)
    }
  }
  
  /**
   * 判断是否符合自动选中条件
   * @param letter 当前需要判断的字母
   * @returns 
   */
  private validate (letter:string) {
    return this.checkout.test(letter)
  }

  /**
   * 根据用户鼠标位置，自动拓展选中目标单词
   * @param range Range
   * @returns Range
   */
  private selectWordRange(range: Range): Range | null {
    let textNode = <CharacterData>range.startContainer
    let limit_left = 0
    let limit_right = textNode.length
    let text = textNode.data
    let { startOffset, endOffset } = range
    if (!this.validate(text[startOffset])) return null

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
    let result
    result = new Range()
    result.setStart(textNode, startOffset)
    result.setEnd(textNode, endOffset)
    return result
  }

  /**
   * 根据用户鼠标的当前位置，自动选中符合要求的文本，并用拖蓝的形式返回
   * @param x ClientX
   * @param y ClientY
   * @returns 
   */
  private selectRangeText(x: number, y: number) {
    let range = getRangeFromPoint(x, y)
    let node = range?.startContainer
    //并非文本节点，退出
    if (node?.nodeType !== 3) return
    range = this.selectWordRange(<Range>range)
    //目标位置字符并不符合检索要求(例如:并非英文字母)
    if (!range) return
  
    //用拖蓝形式展现被选中的单词
    let selection = getSelection()
    selection?.removeAllRanges()
    selection?.addRange(range)
    //触发selectionchange监听，查询相关选中
  }
}












