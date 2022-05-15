import { Messenger } from "./messenger";
import { assertion } from "../utils/tools"
import { Command } from "../utils/command";
import { getURL, setStorage, getStorage } from "../utils/extensions-api";

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//声明引入
import type { PostMessage } from "./messenger";
import type { Point } from "../events/event-listener";
import type { TranslationResult } from "../dictionary/index";

export interface ShowData {
  translatedData: TranslationResult;
  point?: Point;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//创建iframe，将其链接到预定义的View中

//魔法字符串
const openSelection = "OPEN_SELECTION"
const hiddenChinese = "HIDDEN_CHINESE"

export class Iframe {
  onMessage;
  mask: HTMLDivElement;
  private configContainer
  private messenger: Messenger;
  private shower: HTMLDivElement;
  private postMessage: PostMessage;
  private iframeSize

  constructor() {
    this.iframeSize = { width: 400, height: 300 }
    this.isVisible = this.isVisible.bind(this)
    //建立通信
    this.messenger = new Messenger({
      self: window,
    });

    this.onMessage = this.messenger.onMessage;
    this.postMessage = this.messenger.postMessage;

    //创建iframe
    const { container, iframe, configContainer, configButton, forwardButton, backButton } = this.createShower();

    this.shower = container;
    this.configContainer = configContainer
    //保证获取contentWindow
    iframe.addEventListener("load", () => {
      let contentWindow = iframe.contentWindow as Window;
      this.messenger.addTarget(contentWindow);
      this.messenger.install();

      this.onMessage(Command.HistoryIndex, ({ index, head, tail }) => {
        if (index <= head) {
          backButton.classList.add("invalid")
        } else {
          backButton.classList.remove("invalid")
        }
        if (index >= tail) {
          forwardButton.classList.add("invalid")
        } else {
          forwardButton.classList.remove("invalid")
        }
      })

      //绑定一些事件
      configContainer.addEventListener("input", (event) => {
        let input = event.target
        //按照configContainer的结构，input 必定是 HTMLInputElement
        if (!assertion<HTMLInputElement>(true, input)) return
        if (input.name === openSelection) {
          const isOpen = input.checked
          this.messenger.postMessage(Command.OpenSelection, isOpen)
          setStorage({ openSelection: isOpen })
        }

        if (input.name === hiddenChinese) {
          const hidden = input.checked
          this.messenger.postMessage(Command.HiddenChinese, hidden)
          setStorage({ hiddenChinese: hidden })
        }
      })

      const configMask = document.createElement("div")
      configMask.style.cssText = `
        position:absolute;
        margin:0;
        left:0;
        right:0;
        top:0;
        bottom:0;
      `
      configMask.addEventListener("click", () => {
        configContainer.classList.add("hidden")
        configMask.remove()
      })

      container.addEventListener("click", (event) => {
        let target = event.target
        if (target === configButton) {
          configContainer.classList.remove("hidden")
          //需要用到层叠规则的‘后来居上’，所以使用prepend插入configMask 
          container.prepend(configMask)
        }
        if (target === backButton) {
          this.messenger.postMessage(Command.BackHistory)
        }

        if (target === forwardButton) {
          this.messenger.postMessage(Command.ForwardHistory)
        }
      })


      //拖拽
      //因为拖拽是通过监听document上的鼠标移动实现的，而内部存在iframe会导致对document的监听失效
      //因此在拖拽行为发生的时候，生成一个层次更高的蒙版，以能够正确的监听document上的鼠标移动
      const moveMask = document.createElement("div")
      moveMask.style.cssText = `
        position:fixed;
        margin:0;
        left:0;
        right:0;
        top:0;
        bottom:0;
      `
      let count = 0//用于降低拖拽判断的灵敏度，避免用户单击出现问题
      container.addEventListener("mousedown", (event) => {
        let { left, top } = container.getBoundingClientRect()
        let { clientX, clientY } = event
        let relativeX = clientX - left
        let relativeY = clientY - top

        let mouseMoveHandle = (event: MouseEvent) => {
          count++
          if (count <= 3) return //要先触发三次该事件才认为用户执行拖拽
          container.append(moveMask)
          container.style.left = event.clientX - relativeX + "px"
          container.style.top = event.clientY - relativeY + "px"
        }
        let mouseUpHandle = () => {
          moveMask.remove()
          count = 0 //重置数值
          document.removeEventListener("mousemove", mouseMoveHandle)
          document.removeEventListener("mouseup", mouseUpHandle)
        }
        document.addEventListener("mousemove", mouseMoveHandle)
        document.addEventListener("mouseup", mouseUpHandle)
      })

      getStorage(["openSelection", "hiddenChinese"], (item) => {
        this.postMessage(Command.OpenSelection, !!item.openSelection)
        this.postMessage(Command.HiddenChinese, !!item.hiddenChinese)
      })
    });

    //此处的shower.html需要参考所生成文件的具体名称
    iframe.src = getURL("shower.html");

    this.mask = this.createMask();
    this.mask.addEventListener("click", this.onClickToggle.bind(this))
  }

  private createMask() {
    //通过蒙版点击监听来隐藏iframe，如果绑定在document上，有可能因为处于其它iframe而无效
    const mask = document.createElement("div");
    mask.style.cssText = `
      position:fixed;
      z-index:99999;
      left:0;
      right:0;
      top:0;
      bottom:0;
      background:rgba(0,0,0,.3);
    `;
    return mask;
  }

  private createShower() {
    const { width, height } = this.iframeSize
    let container = document.createElement("div");
    let header = document.createElement("header");
    let iframe = document.createElement("iframe");
    let configButton = document.createElement("button");
    let forwardButton = document.createElement("button");
    let backButton = document.createElement("button");
    let configContainer = document.createElement("form")

    getStorage(["openSelection", "hiddenChinese"], (item) => {
      configContainer.innerHTML = `
        <label >启用选词翻译<input type="checkbox" name="${openSelection}" ${item.openSelection ? "checked" : ""}/></label>
        <label >隐藏中文翻译<input type="checkbox" name="${hiddenChinese}" ${item.hiddenChinese ? "checked" : ""}/></label>
      `
    })

    header.append(backButton, forwardButton, configButton, configContainer);
    container.append(header, iframe);

    configButton.textContent = "∨";
    forwardButton.textContent = "＞";
    backButton.textContent = "＜";

    header.classList.add("anki_extensions_translation_header")
    iframe.classList.add("anki_extensions_translation_iframe")
    container.classList.add("anki_extensions_translation_view")
    backButton.classList.add("anki_extensions_translation_back", "invalid");
    configButton.classList.add("anki_extensions_translation_config");
    forwardButton.classList.add("anki_extensions_translation_forward", "invalid")
    configContainer.classList.add("anki_extensions_translation_config_container", "hidden")

    //部分页面为了避免广告插入，会在设置一个类似 iframe."no-self"{display:none!important}
    //所为了避免受到影响，就需要添加下面这一行
    iframe.style.setProperty("display", "block", "important");

    //因为无法直接通过js设置 :hover 所以使用这样的方法来替代
    let style = document.createElement("style");
    style.innerText = `
    .anki_extensions_translation_view {
      position:fixed;
      z-index: 999999;
      border-radius: 6px;
      background: #fff;
    }
    .anki_extensions_translation_header {
      height:30px;
    }
    .anki_extensions_translation_iframe {
      width:${width}px;
      height:${height}px;
      border: none;
    }
    .anki_extensions_translation_config,
    .anki_extensions_translation_back,
    .anki_extensions_translation_forward{
      height: 30px;
      width: 30px;
      padding: 0;
      color: inherit;
      font-size: 24px;
      text-align:center;
      border-style: none;
      line-height: 30px;
      background:transparent;
      cursor: pointer;
      user-select: none;
    }

    .anki_extensions_translation_back.invalid,
    .anki_extensions_translation_forward.invalid{
      color:#aaa;
      cursor: auto;
    }

    .anki_extensions_translation_config {
      float: right;
      font-weight: 700;
    }
    .anki_extensions_translation_back {
      float:left;
    }
    .anki_extensions_translation_forward {
      float:left;
      margin-left:5px;
    }
    
    .anki_extensions_translation_config:hover,
    .anki_extensions_translation_back:hover,
    .anki_extensions_translation_forward:hover{
      border-radius:50%;
      background:#ddd;
    }

    .anki_extensions_translation_back.invalid:hover,
    .anki_extensions_translation_forward.invalid:hover{
      border-radius:0px;
      background:none;
    }
   
    .hidden {
      display:none!important;
    }
    .anki_extensions_translation_config_container {
      display: flex;
      position: absolute;
      flex-flow: column;
      padding: 5px;
      border: 1px solid;
      border-radius: 5px 0 5px 5px;
      background:white;
      right: 6px;
      top: 40px;
      user-select:none;
    }
    .anki_extensions_translation_config_container:after {
      content: "";
      position: absolute;
      width: 10px;
      height: 10px;
      right: 2px;
      top: -6px;
      border-style: solid;
      background: white;
      border-width: 1px 0 0 1px;
      transform: rotate(45deg);
    }
    `;

    document.documentElement.append(style);

    return { container, iframe, forwardButton, backButton, configContainer, configButton }
  }

  isVisible () {
    return !this.mask.hidden
  }

  hiddenIframe() {
    this.mask.hidden = true;
    //不能够使用 .hidden 的形式，因为那样会导致shower在渲染树中删除
    //这样会导致shower更新时，不能够实时获取内部元素的高度
    this.shower.style.visibility = "hidden"
    this.configContainer.classList.add("hidden")
  }

  install() {
    this.hiddenIframe();
    this.messenger?.install();
    document.body.append(this.mask);
    document.body.append(this.shower);
  }

  uninstall() {
    this.hiddenIframe();
    this.messenger?.uninstall();
    this.mask.remove();
    this.shower.remove();
  }

  /**
   * 当用户点击mask时，隐藏shower
   * @param event
   */
  private onClickToggle(event: MouseEvent) {
    event.stopPropagation();
    this.hiddenIframe();
    this.postMessage?.(Command["PauseAudio"]);
  }

  /**
   * 一层简单的封装，其目的在于使外部调用更加便捷统一
   * @param data
   */
  showTranslation(data: ShowData) {
    const { translatedData, point } = data;
    this.postMessage?.(Command.ShowTranslation, translatedData, () => {
      //UI更新后再展示iframe,避免闪烁
      this.showUI(point);
    });
  }

  /**
   * 展示UI
   */
  showUI(point?: Point) {
    let rect = this.shower.getBoundingClientRect()
    let { width, height } = rect
    let left = point?.x || rect.left
    let top = point?.y || rect.top

    //用于判断是否超出视口
    let clientWidth = document.documentElement.clientWidth;
    let clientHeight = document.documentElement.clientHeight;
    //对越界位置进行修正
    left = Math.min(Math.max(0, left), clientWidth - width);
    top = Math.min(Math.max(0, top), clientHeight - height);

    this.mask.hidden = false;
    this.shower.style.cssText = `
    visibility:auto;
    left:${left}px;
    top:${top}px;
    `;
  }
}
