import { Point, ShowData } from "@/types";
import { Command } from "@/configuration";
import { Messenger, PostMessage, OnMessage } from "@/utils";
import { getURL, getStorageByArray, setStorage } from "@/extensions-api";
//魔法字符串
const openSelection = "OPEN_SELECTION";
const hiddenChinese = "HIDDEN_CHINESE";

export class Agent {
  mask?: HTMLDivElement;
  configMask?: HTMLDivElement;
  configContainer;
  translationWrapper;
  translationContainer;
  messenger: Messenger;
  onMessage: OnMessage;
  postMessage: PostMessage;

  constructor() {
    //建立通信
    this.messenger = new Messenger({
      self: window,
    });
    this.onMessage = this.messenger.onMessage;
    this.postMessage = this.messenger.postMessage;
    //创建iframe
    const {
      iframe,
      wrapper,
      container,
      backButton,
      configButton,
      forwardButton,
      configContainer,
    } = createTranslationView();
    this.translationWrapper = wrapper;
    this.translationContainer = container;
    this.configContainer = configContainer;

    //保证获取contentWindow
    iframe.addEventListener("load", () => {
      const contentWindow = iframe.contentWindow;
      this.messenger.addTarget(contentWindow!);
      this.messenger.install();

      //实现历史按钮的明暗功能 明（存在历史记录） ,暗（不存在历史记录）
      this.onMessage(Command.HistoryIndex, ({ index, head, tail }) => {
        if (index <= head) {
          backButton.classList.add("invalid");
        } else {
          backButton.classList.remove("invalid");
        }

        if (index >= tail) {
          forwardButton.classList.add("invalid");
        } else {
          forwardButton.classList.remove("invalid");
        }
      });

      /**
       * 实现对 translation-page 是否支持 selection 翻译 以及 是否隐藏 中文翻译 的控制
       */
      configContainer.addEventListener("input", (event) => {
        const input = event.target;
        if (!isInputElement(input)) return;

        if (input.name === openSelection) {
          const isOpen = input.checked;
          this.postMessage(Command.OpenSelection, isOpen);
          setStorage({
            openSelection: isOpen,
          });
        }

        if (input.name === hiddenChinese) {
          const hidden = input.checked;
          this.postMessage(Command.HiddenChinese, hidden);
          setStorage({
            hiddenChinese: hidden,
          });
        }
      });

      const configMask = createMask(`
        position:absolute;
        margin:0;
        left:0;
        top:0;
        right:0;
        bottom:0;
      `);
      this.configMask = configMask;

      configMask.addEventListener("click", () => {
        configContainer.classList.add("hidden");
        configMask.remove();
      });
      container.addEventListener("click", (event) => {
        const target = event.target;
        if (target === configButton) {
          configContainer.classList.remove("hidden");
          //需要用到层叠规则的‘后来居上’，所以使用prepend插入configMask
          container.prepend(configMask);
        }
        if (target === backButton) {
          this.messenger.postMessage(Command.BackHistory);
        }
        if (target === forwardButton) {
          this.messenger.postMessage(Command.ForwardHistory);
        }
      });

      //拖拽
      //因为拖拽是通过监听document上的鼠标移动实现的，而内部存在iframe会导致对document的监听失效
      //因此在拖拽行为发生的时候，生成一个层次更高的蒙版，以能够正确的监听document上的鼠标移动
      const moveMask = createMask(`
        position:fixed;
        margin:0;
        left:0;
        top:0;
        bottom:0;
        right:0;
      `);
      let count = 0; //用于降低拖拽判断的灵敏度，避免用户单击出现问题

      container.addEventListener("mousedown", (event) => {
        const { left, top } = container.getBoundingClientRect();
        const clientX = event.clientX;
        const clientY = event.clientY;
        const relativeX = clientX - left;
        const relativeY = clientY - top;

        const mouseMoveHandle = function mouseMoveHandle(event: MouseEvent) {
          count++;
          if (count <= 3) return; //要先触发三次该事件才认为用户执行拖拽

          container.append(moveMask);
          container.style.left = event.clientX - relativeX + "px";
          container.style.top = event.clientY - relativeY + "px";
        };

        const mouseUpHandle = function mouseUpHandle() {
          moveMask.remove();
          count = 0; //重置数值

          document.removeEventListener("mousemove", mouseMoveHandle);
          document.removeEventListener("mouseup", mouseUpHandle);
        };

        document.addEventListener("mousemove", mouseMoveHandle);
        document.addEventListener("mouseup", mouseUpHandle);
      });

      getStorageByArray(["openSelection", "hiddenChinese"], (item) => {
        this.postMessage(Command.OpenSelection, !!item.openSelection);
        this.postMessage(Command.HiddenChinese, !!item.hiddenChinese);
      });
    });
    //此处的translationPage.html需要参考所生成文件的具体名称
    iframe.src = getURL("translationPage.html");

    /**
     * 之所以不使用 inset: 0px; 的写法，是因为那样写会占用更多的内存
     *  该 mask 已经提升到合成层，而合成层会占用更大的内存，而占用的内存与元素大小正相关
     *  通过下面的写法，元素的大小为 1*1,占用内存小，而用scale放大后又可以保证原有效果（本质是时间换空间？）
     */
    const mask = createMask(`
      position:fixed;
      z-index:99999;
      top:50%;
      left:50%;
      width:1px;
      height:1px;
      transform:scale(5000);
      background:rgba(0,0,0,.3);
    `);
    this.mask = mask;
    this.mask.addEventListener("click", this.onClickToggle);
  }
  install = () => {
    this.messenger?.install();
    document.body.append(this.translationWrapper);
  };
  uninstall = () => {
    this.hiddenTranslationView();
    this.messenger?.uninstall();
    this.translationWrapper.remove();
  };
  isVisible = () => {
    return this.mask?.isConnected;
  };
  onClickToggle = () => {
    this.hiddenTranslationView();
    this.postMessage(Command.PauseAudio);
  };
  hiddenTranslationView = () => {
    this.mask?.remove();
    this.configMask?.remove();
    //不能够使用 hidden=true 的形式，因为那样会导致 translationContainer 在渲染树中删除
    //这样会导致 translationPage 更新时，不能够实时获取内部元素的高度
    this.translationContainer.style.visibility = "";
    this.configContainer.classList.add("hidden");
  };
  showTranslation = (data: ShowData) => {
    const translatedData = data.translatedData;
    const point = data.point;
    this.postMessage(Command.ShowTranslation, translatedData, () => {
      //UI更新后再展示iframe,避免闪烁
      this.showUI(point);
    });
  };
  showUI = (point?: Point) => {
    const rect = this.translationContainer.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    let left = point?.x || rect.left;
    let top = point?.y || rect.top;
    //用于判断是否超出视口
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;
    //对越界位置进行修正
    left = Math.min(Math.max(0, left), clientWidth - width);
    top = Math.min(Math.max(0, top), clientHeight - height);
    !this.mask!.isConnected && document.body.append(this.mask!);
    this.translationContainer.style.cssText = `
      visibility:visible;
      left:${left}px;
      top:${top}px;
    `;
  };
}

function isInputElement(ele: any): ele is HTMLInputElement {
  //先排除非对象类型
  if (Object(ele) !== ele) return false;
  if (!(ele instanceof Element)) return false;
  return ele.tagName === "INPUT";
}

function createMask(cssText: string) {
  //通过蒙版点击监听来隐藏 translationPage，如果绑定在document上，有可能因为处于其它iframe而无效
  const wrapper = document.createElement("div");
  wrapper.style.cssText = `
    position:fixed;
    left:0;
    top:0;
    right:0;
    bottom:0;
  `;
  wrapper.style.setProperty("display", "block", "important");
  const shadowRoot = wrapper.attachShadow({
    mode: "open",
  });
  shadowRoot.innerHTML = `
    <style>
      .mask {
        ${cssText}
      }
    </style>
  `;
  const mask = document.createElement("div");
  mask.classList.add("mask");
  shadowRoot.append(mask);
  return wrapper;
}

function createTranslationView() {
  const width = 400;
  const height = 300;
  const wrapper = document.createElement("div");
  //创建幽灵节点
  wrapper.style.setProperty("display", "contents", "important");
  const shadowRoot = wrapper.attachShadow({
    mode: "open",
  });

  shadowRoot.innerHTML = `
    <style>
      .container {
        position:fixed;
        visibility:hidden;
        z-index: 999999;
        border-radius: 6px;
        background: #fff;
        user-select:none;
      }
      .header {
        height:30px;
      }
      .iframe {
        width:${width}px;
        height:${height}px;
        border: none;
      }
      .config {
        float: right;
        font-weight: 700;
      }
      .back,.forward {
        float:left;
        margin-left:5px;
      }
      .back,
      .config,
      .forward{
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
      .back:focus-visible,
      .config:focus-visible,
      .forward:focus-visible{
        outline: 2px solid blue;
        border-radius: 5px;
        outline-offset: -5px;
      }
      .back.invalid,
      .forward.invalid{
        color:#aaa;
        cursor: auto;
      }
      .back:hover,
      .config:hover,
      .forward:hover{
        border-radius:50%;
        background:#ddd;
      }
      .back.invalid:hover,
      .forward.invalid:hover{
        border-radius:0px;
        background:none;
      }
      .hidden {
        display:none!important;
      }
      .config-container {
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
      .config-container:after {
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
    </style>
  `;
  const container = document.createElement("div");
  const header = document.createElement("header");
  const iframe = document.createElement("iframe");
  const configButton = document.createElement("button");
  const forwardButton = document.createElement("button");
  const backButton = document.createElement("button");
  const configContainer = document.createElement("form");
  getStorageByArray(["openSelection", "hiddenChinese"], (item) => {
    configContainer.innerHTML = `
      <label >启用选词翻译<input type="checkbox" name="${openSelection}" ${
      item.openSelection ? "checked" : ""
    }/></label>
      <label >隐藏中文翻译<input type="checkbox" name="${hiddenChinese}" ${
      item.hiddenChinese ? "checked" : ""
    }/></label>`;
  });

  configButton.textContent = "∨";
  forwardButton.textContent = "＞";
  backButton.textContent = "＜";
  header.append(backButton, forwardButton, configButton, configContainer);
  container.append(header, iframe);
  shadowRoot.append(container);
  header.classList.add("header");
  iframe.classList.add("iframe");
  container.classList.add("container");
  backButton.classList.add("back", "invalid");
  configButton.classList.add("config");
  forwardButton.classList.add("forward", "invalid");
  configContainer.classList.add("config-container", "hidden");

  //部分页面为了避免广告插入，会在设置一个类似 iframe {display:none!important} 的样式
  //所为了避免受到影响，就需要添加下面这一行
  iframe.style.setProperty("display", "block", "important");

  return {
    container: container,
    iframe: iframe,
    forwardButton: forwardButton,
    backButton: backButton,
    configContainer: configContainer,
    configButton: configButton,
    wrapper: wrapper,
  };
}
