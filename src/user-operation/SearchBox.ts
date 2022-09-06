import { attachSymbolToSearchContainer } from "./utils";
import type { TranslateAndDisplayText } from "@/types";

/**
 * 允许用户通过搜索栏主动输入单词，而后对单词进行查询
 */
export class SearchBox {
  openSearchBox;
  private closeSearchBox;
  private container;

  constructor(translateAndDisplayText: TranslateAndDisplayText) {
    const { container, openSearchBox, closeSearchBox } = createSearchBar(
      translateAndDisplayText
    );
    this.container = container;
    this.openSearchBox = openSearchBox;
    this.closeSearchBox = closeSearchBox;
  }
  install = () => {
    document.body.append(this.container);
  };
  uninstall = () => {
    this.closeSearchBox();
    this.container.remove();
  };
}

const FORM_ID = "search-form";
const INPUT_ID = "search-input";
const BUTTON_ID = "search-button";
/**
 * 创建搜索条
 */
function createSearchBar(translateAndDisplayText: TranslateAndDisplayText) {
  const container = document.createElement("div");
  attachSymbolToSearchContainer(container);
  //实现幽灵节点
  container.style.setProperty("display", "contents", "important");
  const shadow = container.attachShadow({
    mode: "open",
  });
  shadow.innerHTML = `
    <style>
      #${FORM_ID} {
        display:none;
        box-sizing: border-box;
        position: fixed;
        z-index: 99999;
        left: 50%;     
        right: 0;       
        top: 10vh;
        margin: auto;
        min-width: 200px;
        width: 25%;
        border: 1px solid #666;
        border-radius: 5px;
        background:white;
        box-shadow: 1px 1px 2px -1px #333;
      }
      #${INPUT_ID} {
        flex: 1;
        box-sizing: border-box;
        width: 100%;
        border: none;
        border-radius: 5px 0 0 5px;
        padding: 0 10px;
        outline: none;
        font-size: 16px;
        line-height: 2;
      }
      #${BUTTON_ID} {
        font-size: 28px;
        line-height: 1;
        border: none;
        border-radius: 0 5px 5px 0;
        background: white;
        outline:none;
      }
      #${BUTTON_ID}:hover,
      #${BUTTON_ID}:focus {
        background: #e6e6e6;
      }
      .vertical {
        width: 1px;
        background: #666;
        margin: 3px 0;
      }
    </style>    
    <form action="#" autocomplete="off" id="${FORM_ID}">
      <input type="text" id="${INPUT_ID}"/>
      <span class="vertical"></span>
      <button type="button" id="${BUTTON_ID}">×</button>
    </form>
  `;
  const form = shadow.getElementById(FORM_ID) as HTMLFormElement;
  const input = shadow.getElementById(INPUT_ID) as HTMLInputElement;
  const button = shadow.getElementById(BUTTON_ID) as HTMLButtonElement;
  //绑定事件监听
  //当用户按下enter键时进行查询
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const text = input.value.trim();
    if (text) {
      translateAndDisplayText(text);
    }
  });

  button.addEventListener("click", closeSearchBox);

  function closeSearchBox() {
    input.value = "";
    form.style.display = "none";
  }

  function openSearchBox() {
    form.style.display = "flex";
    input.focus();
    input.select();
  }

  return {
    container,
    openSearchBox,
    closeSearchBox,
  };
}
