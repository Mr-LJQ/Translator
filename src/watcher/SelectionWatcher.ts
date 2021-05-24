//对用户拖蓝选中的文本进行监听，并进行查询

import {getSelectionText, isActiveElement} from "../utils/index"

export class SelectionWatcher {
  selectionChanged
  constructor (public showTranslated:(text:string) => void) {
    this.selectionChanged = false

    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onSelectionChange = this.onSelectionChange.bind(this)
  }

  install () {
    document.addEventListener("mousedown",this.onMouseDown)
    document.addEventListener("mouseup",this.onMouseUp)
  }
  uninstall () {
    document.removeEventListener("mousedown",this.onMouseDown)
    document.removeEventListener("mouseup",this.onMouseUp)
  }

  private onMouseDown () {
    document.addEventListener("selectionchange",this.onSelectionChange,{once:true})
  }

  private onSelectionChange () {
    this.selectionChanged = true
  }
  
  /**
   * 当用户拖蓝选取文本时，鼠标抬起是进行查询的时间
   * 当用户双击选取文本时，鼠标抬起也是进行查询的时机
   * @returns void
   */
  private onMouseUp () {
    if (!this.selectionChanged) return
    this.selectionChanged = false
    if (isActiveElement()) return
    let selectedText = getSelectionText()
    if (!selectedText) return
    this.showTranslated(selectedText)
  }
}
  



