/* 
  允许用户通过搜索栏主动输入单词，
    而后对单词进行查询
*/

export class PopupSearchBar {

  private closed: boolean
  private searchBar: HTMLFormElement
  showTranslated

  constructor(showTranslated:(text:string) => void) {
    this.closed = true
    this.searchBar = this.createSearchBar()

    this.showTranslated = showTranslated

    this.onPaste = this.onPaste.bind(this)
    this.toggleSearchBar = this.toggleSearchBar.bind(this)
    this.clearSearchBar = this.clearSearchBar.bind(this)
  }


  toggleSearchBar() {
    let { searchBar, closed } = this

    //查询导航条是否存在，反复触发时切换其开关状态
    if (closed) {
      this.closed = false
      document.body.append(searchBar)
      searchBar.search.focus()
    } else {
      this.clearSearchBar()
      return
    }

    //用户可能会通过粘贴的方式进行查询，简化用户查询操作
    document.addEventListener("paste", this.onPaste)

    //失去焦点意味着用户离开，关闭搜索条
    searchBar.addEventListener("blur", () => {
      this.clearSearchBar()
    }, { once: true ,capture:true})//因为blur事件不会冒泡，因此需要在捕获阶段触发(focusout可冒泡)。
  }

  private onPaste() {
    let { searchBar } = this
    let searchInput = searchBar.search
    //如果用户通过粘贴进行查询，则在searchInput获取到具体内容后立刻进行查询
    searchInput.addEventListener("input", () => {
      let text = searchInput.value.trim()
      if (text) {
        //进行查询
        this.showTranslated(text)
      }
    }, { once: true }) //注意，仅触发一次
  }

  /**
   * 清除搜索条，并进行必要的清理
   */
  private clearSearchBar() {
    this.closed = true
    let searchBar = this.searchBar
    searchBar.search.value = ""
    document.removeEventListener("paste", this.onPaste)
    try {//因为当用户使用快捷键移除searchBar时,焦点也会失去，导致触发两次移除操作而报错。
      searchBar.remove()
    }catch{}
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
    form.id = "extension_searchBar"
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
        this.showTranslated(text)
      }
    })
    return form
  }
}

