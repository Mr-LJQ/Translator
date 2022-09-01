import {
  getSelectionText,
  getRangeFromPoint,
  isContentEditable,
  isSearchContainer,
  UserSelectHandler,
} from "./utils";
import type { HotKey, TranslateAndDisplayText, GetPoint } from "@/types";

export class HotKeyListener {
  modify;
  restore;
  private hotKey?: HotKey;
  private checkout: RegExp;
  private getPoint: GetPoint;
  private translateAndDisplayText: TranslateAndDisplayText;

  constructor(
    translateAndDisplayText: TranslateAndDisplayText,
    getPoint: GetPoint
  ) {
    this.getPoint = getPoint;
    this.translateAndDisplayText = translateAndDisplayText;
    this.hotKey = "shiftKey";
    this.checkout = /[a-z_]/i;

    const { modify, restore } = new UserSelectHandler();
    this.modify = modify;
    this.restore = restore;
  }

  updateHotKey = (hotKey: HotKey | undefined) => {
    this.hotKey = hotKey;
  };

  install = () => {
    document.addEventListener("keydown", this.onKeyDown);
  };
  uninstall = () => {
    document.removeEventListener("keydown", this.onKeyDown);
    this.restore();
  };

  private onKeyDown = (event: KeyboardEvent) => {
    const { hotKey } = this;

    if (hotKey && event[hotKey]) {
      //当焦点在可输入元素上，不进行热键选词
      const focusNode = document.activeElement;
      if (focusNode && isContentEditable(focusNode)) return;
      //这是一个用 div 封装的 input
      if (isSearchContainer(focusNode)) return;

      const { x, y } = this.getPoint();
      this.autoSelectText(x, y);
      const selectedText = getSelectionText();
      if (!selectedText) return;
      this.translateAndDisplayText(selectedText);
    }
  };

  /**
   * 判断是否符合自动选中条件
   * @param letter 当前需要判断的字母
   * @returns Boolean
   */
  private validate = (letter: string | undefined) => {
    if (letter == null) return false;
    return this.checkout.test(letter);
  };

  /**
   * 根据用户鼠标的当前位置，自动选中符合要求的文本，表现为对应文本拖蓝选中
   * @param x ClientX
   * @param y ClientY
   * @returns
   */
  private autoSelectText = (x: number, y: number) => {
    let range = getRangeFromPoint(x, y);
    if (!range) return;

    range = this.extendRange(range);
    if (range == null) return;

    const selection = getSelection();
    if (!selection) return;

    //避免因为 user-select:none 而导致 热键选中失效
    const target = range.commonAncestorContainer.parentElement;
    if (target != null) {
      this.modify(target);
    }

    //只有 firefox支持多个拖蓝选中，而其它浏览器不支持，因此如果不先清空原有的range，则后面的添加无效
    selection.removeAllRanges();
    //用拖蓝形式展现被选中的单词
    selection.addRange(range);
  };

  /**
   * 传入一个 选中文本节点 的 Range对象，
   * 按照一定要求对其进行扩充，
   * 返回一个新的Range
   *
   * @param range Range
   * @returns Range
   */
  private extendRange = (range: Range): Range | null => {
    const textNode = range.startContainer;
    //并非文本节点，退出
    if (!isText(textNode)) return null;
    const limit_left = 0;
    const limit_right = textNode.length;
    const text = textNode.data;
    let { startOffset, endOffset } = range;

    //如果当前鼠标位置的字符不符合要求，则表明无需进行自动选取
    if (!this.validate(text[startOffset])) return range;

    while (limit_left <= startOffset) {
      const letter = text[startOffset];
      if (this.validate(letter)) {
        startOffset--;
      } else {
        break;
      }
    }
    //回退到前一个符合要求的字符
    startOffset++;
    //startOffset与endOffset在一开始是相等的，避免重复验证同一个字符
    endOffset++;
    while (endOffset < limit_right) {
      const letter = text[endOffset];

      if (this.validate(letter)) {
        endOffset++;
      } else {
        break;
      }
    }
    //因为setEnd不包括endOffset，因此不用回退到上一个符合要求的字符
    //但需要注意，避免endOffset超出limit_right
    endOffset = Math.min(limit_right, endOffset);
    const newRange = new Range();
    newRange.setStart(textNode, startOffset);
    newRange.setEnd(textNode, endOffset);
    return newRange;
  };
}

function isText(node: Node): node is Text {
  return node.nodeType === 3;
}
