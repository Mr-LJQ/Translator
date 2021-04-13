//对用户拖蓝选中的文本进行监听，如果是目标文本则进行查询

import {debounce,getSelectionText} from "../utils"
import {queryText} from "../../types/index"

export class SelectionWatcher {

  private selectionChangeListener:() => void

  constructor (public queryText:queryText) {

    this.selectionChangeListener = debounce(onSelectionChange,500).bind(this)
  }

  install () {
    document.addEventListener("selectionchange",this.selectionChangeListener)
  }
  uninstall () {
    document.removeEventListener("selectionchange",this.selectionChangeListener)
  }
}

function onSelectionChange(this:SelectionWatcher) {
  let selectedText = getSelectionText()
  if (!selectedText) return
  this.queryText(selectedText)
}



