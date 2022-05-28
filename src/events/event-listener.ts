//搜索栏ID
const SEARCH_BAR_ID = "ANKI_BROWSER_EXTENSIONS_SEARCHBAR"

import type { Storage } from "../utils/extensions-api"
export interface Point {
  x: number,
  y: number
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//双击选中翻译事件
export class SelectionListener {
  selectionChanged = false
  constructor(public translateAndShowText: (text: string) => void) {
    this.install = this.install.bind(this)
    this.uninstall = this.uninstall.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onSelectionChange = this.onSelectionChange.bind(this)
  }

  install() {
    document.addEventListener("mousedown", this.onMouseDown)
    document.addEventListener("mouseup", this.onMouseUp)
  }
  uninstall() {
    document.removeEventListener("mousedown", this.onMouseDown)
    document.removeEventListener("mouseup", this.onMouseUp)
  }

  private onMouseDown() {
    document.addEventListener("selectionchange", this.onSelectionChange, { once: true })
  }

  private onSelectionChange() {
    this.selectionChanged = true
  }

  /**
   * 当用户拖蓝选取文本时，鼠标抬起是进行查询的时间
   * 当用户双击选取文本时，鼠标抬起也是进行查询的时机
   * @returns void
   */
  private onMouseUp() {
    if (!this.selectionChanged) return
    this.selectionChanged = false
    let selectedText = getSelectionText()
    if (!selectedText) return
    
    //不对输入框中的文本进行选中翻译
    const focusNode = document.activeElement?.nodeName || ""
    const filterNodeName = ["INPUT", "TEXTAREA"]
    if (filterNodeName.includes(focusNode)) return

    this.translateAndShowText(selectedText)
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//允许用户通过搜索栏主动输入单词，而后对单词进行查询

export class SearchListener {
  private searchBar
  private closed = true
  private installed = false
  translateAndShowText

  constructor(translateAndShowText: (text: string) => void) {
    this.searchBar = this.createSearchBar()
    this.searchBar.hidden = true
    this.install = this.install.bind(this)
    this.uninstall = this.uninstall.bind(this)
    this.translateAndShowText = translateAndShowText
    this.clearSearchBar = this.clearSearchBar.bind(this)
    this.toggleSearchBar = this.toggleSearchBar.bind(this)
  }
  install() {
    this.installed = true
    document.body.append(this.searchBar)
  }

  uninstall() {
    this.installed = false
    this.clearSearchBar()
    this.searchBar.remove()
  }

  toggleSearchBar() {
    let { searchBar, closed, installed } = this

    //只在已安装的情况下，才能够切换其显示状态
    if (!installed) return

    //查询导航条是否存在，反复触发时切换其开关状态
    if (closed) {
      this.closed = false
      searchBar.hidden = false
      searchBar.search.focus()
    } else {
      this.clearSearchBar()
      return
    }

    //失去焦点意味着用户离开，关闭搜索条
    searchBar.addEventListener("blur", () => {
      this.clearSearchBar()
    }, { once: true, capture: true })//因为blur事件不会冒泡，因此需要在捕获阶段触发(focusout可冒泡)。
  }


  /**
   * 清除搜索条，并进行必要的清理
   */
  private clearSearchBar() {
    this.closed = true
    let searchBar = this.searchBar
    searchBar.search.value = ""
    searchBar.hidden = true
  }

  /**
   * 创建搜索条
   * @returns HTMLFormElement
   */
  private createSearchBar(): HTMLFormElement {
    //创建HTML结构
    let form = document.createElement("form")
    let searchInput = document.createElement("input")
    //为form设置必要的attribute
    form.autocomplete = "off"
    form.id = SEARCH_BAR_ID
    form.action = "#"

    searchInput.type = "text"
    searchInput.name = "search"
    form.append(searchInput)

    //设置CSS样式
    form.style.cssText = `
      position:fixed;
      z-index:99999;
      left:0;
      right:0;
      top:20vh;
      margin: auto;
      min-width: 200px;
      width: 25%;
    `
    searchInput.style.cssText = `
      box-sizing: border-box;
      width: 100%;
      border: 1px solid #666;
      border-radius: 5px;
      padding: 0 10px;
      box-shadow: 1px 1px 2px -1px #333;
      outline: none;
      font-family: "微软雅黑";
      font-size: 16px;
      line-height: 2;
    `
    //绑定事件监听
    //当用户按下enter键时进行查询
    form.addEventListener("submit", (event) => {
      event.preventDefault()
      let text = searchInput.value.trim()
      if (text) {
        //进行查询
        this.translateAndShowText(text)
      }
    })
    return form
  }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//因为浏览器并没有提供一个属性以直接获取鼠标位置,所以需要通过监听实现
export class CursorListener {
  cursorPosition: Point
  screenPosition: Point
  constructor() {
    this.cursorPosition = { x: 0, y: 0 }
    this.screenPosition = { x: 0, y: 0 }
    this.onMouseMove = this.onMouseMove.bind(this)
    this.getCursorPosition = this.getCursorPosition.bind(this)
    this.getScreenPosition = this.getScreenPosition.bind(this)
  }
  install() {
    document.addEventListener("mousemove", this.onMouseMove, true)//避免被阻止冒泡导致失效
  }
  uninstall() {
    document.removeEventListener("mousemove", this.onMouseMove, true)
  }
  /**
   * 返回鼠标当前相对视口的位置，this已绑定
   * @returns {x:number,y:number}
   */
  getCursorPosition() {
    return this.cursorPosition
  }
  /**
   * 返回鼠标当前相对视口的位置，this已绑定
   * @returns 
   */
  getScreenPosition() {
    return this.screenPosition
  }
  private onMouseMove(event: MouseEvent) {
    const { clientX, clientY, screenY, screenX } = event
    this.cursorPosition = {
      x: clientX,
      y: clientY
    }
    if (window === window.top) return
    this.screenPosition = {
      x: screenX,
      y: screenY
    }
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
  监听用户热键(shift/ctrl/alt)，
    当用户按下热键时，
    自动选中当前鼠标悬停位置的所对应的单词
    进行对选择单词的查询
*/


export class HotKeyListener {

  private getCursorPosition: () => Point
  private translateAndShowText: (text: string) => void
  private hotKey?: "shiftKey" | "ctrlKey" | "altKey"
  private checkout: RegExp
  constructor(translateAndShowText: (text: string) => void, getCursorPosition: () => Point) {
    this.getCursorPosition = getCursorPosition
    this.translateAndShowText = translateAndShowText
    this.hotKey
    this.checkout = /[a-z_]/i

    //所有向外暴露的方法的this都是绑定的
    this.install = this.install.bind(this)
    this.uninstall = this.uninstall.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.updateHotKey = this.updateHotKey.bind(this)
  }

  updateHotKey(hotKey: Storage["hotKey"]) {
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
    const { x, y } = this.getCursorPosition()

    //当焦点在输入框中，不进行热键选词
    const focusNode = document.activeElement?.nodeName || ""
    const filterNodeName = ["INPUT", "TEXTAREA"]
    if (filterNodeName.includes(focusNode)) return

    if (hotKey && event[hotKey]) {
      this.autoSelectText(x, y)
      let selectedText = getSelectionText()
      if (!selectedText) return
      this.translateAndShowText(selectedText)
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
   * 根据用户鼠标的当前位置，自动选中符合要求的文本，表现为对应文本拖蓝选中
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * 纯函数，获取当前拖蓝选中的文本(已清除左右空格)
 * @returns string
 */
function getSelectionText(): string | undefined {
  let selection = getSelection()
  return selection?.toString().trim()
}

/**
 * 纯函数,对document.caretPositionFromPoint等方法进行浏览器兼容处理
 * @param x clientX
 * @param y clientY
 * @returns Range
 */
function getRangeFromPoint(x: number, y: number): Range | null {
  if ("caretRangeFromPoint" in document) {
    return document.caretRangeFromPoint(x, y)
  }

  if ("caretPositionFromPoint" in document) {
    //@ts-ignore 该方法存在于firefox
    let caretPosition = document.caretPositionFromPoint(x, y)
    if (!caretPosition) return null
    let { offsetNode, offset } = caretPosition
    let range = document.createRange()
    range.setStart(offsetNode, offset)
    return range
  }
  if (process.env.NODE_ENV === "development") {
    throw new Error("没有找到 'caretPositionFromPoint' 或者 'caretRangeFromPoint'")
  }
  return null
}