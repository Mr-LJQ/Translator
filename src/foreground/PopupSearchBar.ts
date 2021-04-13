//用户可以通过搜索栏主动输入单词，而后对单词进行查询
import {queryText} from "../../types/index"
export class PopupSearchBar {
  
  queryText:queryText
  searchBar: HTMLFormElement
  auxiliaryKey: KeyboardEvent["key"]
  hotKey: "shiftKey" | "ctrlKey" | "altKey"

  constructor(queryText:queryText) {
    this.hotKey = "altKey"
    this.auxiliaryKey = "r"
    this.searchBar = this.createSearchBar()

    this.queryText = queryText
    this.onPaste = this.onPaste.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  install() {
    document.addEventListener("keydown", this.onKeyDown)
  }

  uninstall() {
    document.removeEventListener("keydown", this.onKeyDown)
  }
  
  private onKeyDown(event: KeyboardEvent) {
    let { hotKey, auxiliaryKey, searchBar } = this
    if (event[hotKey] && event.key === auxiliaryKey) {
      try {
        document.body.append(searchBar)
        searchBar.search.focus()
      }catch {
        this.clearSearchBar()
        return
      }
  
      document.addEventListener("paste",this.onPaste)
      searchBar.addEventListener("blur",() => {
        this.clearSearchBar()
      },{once:true,capture:true})
    }
  }

  private onPaste () {
    let {searchBar} = this
    let searchInput = searchBar.search
    searchInput.addEventListener("input",() => {
      let text = searchInput.value.trim()
      if (text) {
        //进行查询
        this.queryText(text)
      }
    },{once:true})
  }
  private clearSearchBar () {
    let searchBar = this.searchBar
    searchBar.search.value = ""
    document.removeEventListener("paste",this.onPaste)
    searchBar.remove()
  }

  /**
   * 创建搜索条
   * @returns HTMLFormElement
   */
  private createSearchBar(): HTMLFormElement {
    //创建HTML结构
    let form = document.createElement("form")
    let searchInput = document.createElement("input")
    form.autocomplete = "off"
    searchInput.type = "text"
    searchInput.name = "search"
    form.append(searchInput)
  
    //设置CSS样式
    form.style.cssText = `
      min-width: 200px;
      width: 25%;
      margin: 5vh auto;
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
    form.addEventListener("submit", (event) => {
      event.preventDefault()
      let text = searchInput.value.trim()
      if (text) {
        //进行查询
        this.queryText(text)
      }
    })
    return form
  }
}

