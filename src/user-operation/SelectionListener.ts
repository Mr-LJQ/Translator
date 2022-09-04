/**
 * 双击选中翻译事件
 */
import {
  getSelectionText,
  isContentEditable,
  isSearchContainer,
} from "./utils";

import type { TranslateAndDisplayText } from "@/types";

export class SelectionListener {
  private enableCtrl = true;
  private selectionChanged = false;
  private translateAndDisplayText: TranslateAndDisplayText;

  constructor(translateAndDisplayText: TranslateAndDisplayText) {
    this.translateAndDisplayText = translateAndDisplayText;
  }

  install = () => {
    document.addEventListener("mousedown", this.onMouseDown);
    document.addEventListener("mouseup", this.onMouseUp);
  };
  uninstall = () => {
    document.removeEventListener("mousedown", this.onMouseDown);
    document.removeEventListener("mouseup", this.onMouseUp);
  };

  /**
   * @param value true,使得用户能够在按住 Ctrl键进行选取时，可以翻译 可输入元素内部的文本，false则是不可以
   */
  switchStrengthenSelectionByPressedCtrl = (value: boolean) => {
    this.enableCtrl = value;
  };

  private onMouseDown = () => {
    document.addEventListener("selectionchange", this.onSelectionChange, {
      once: true,
    });
  };

  private onSelectionChange = () => {
    this.selectionChanged = true;
  };

  /**
   * 当用户拖蓝选取文本时，鼠标抬起是进行查询的时间
   * 当用户双击选取文本时，鼠标抬起也是进行查询的时机
   * @returns void
   */
  private onMouseUp = (event: MouseEvent) => {
    if (!this.selectionChanged) {
      document.removeEventListener("selectionchange", this.onSelectionChange);
      return;
    }

    this.selectionChanged = false;
    const selectedText = getSelectionText();
    if (!selectedText) return;

    const hotKey = event.ctrlKey;
    const focusNode = document.activeElement;
    //判断是否跳过对于可编辑元素的过滤
    if (!(this.enableCtrl && hotKey)) {
      //不对输入框中的文本进行选中翻译
      if (focusNode && isContentEditable(focusNode)) return;
    }
    if (isSearchContainer(focusNode)) return;
    this.translateAndDisplayText(selectedText);
  };
}
