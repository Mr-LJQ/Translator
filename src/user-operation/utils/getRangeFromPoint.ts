/**
 * 对 document.caretPositionFromPoint/caretRangeFromPoint 进行浏览器兼容处理
 * @param x clientX
 * @param y clientY
 * @returns Range | null
 */
export function getRangeFromPoint(x: number, y: number): Range | null {
  if ("caretRangeFromPoint" in document) {
    return document.caretRangeFromPoint(x, y);
  }

  if ("caretPositionFromPoint" in document) {
    //@ts-ignore 该方法存在于firefox
    const caretPosition = document.caretPositionFromPoint(x, y);
    if (!caretPosition) return null;
    const { offsetNode, offset } = caretPosition;
    const range = document.createRange();
    range.setStart(offsetNode, offset);
    return range;
  }
  throw new Error(
    "没有在 document 上找到 'caretPositionFromPoint' 或者 'caretRangeFromPoint' 方法，无法实现热键选中功能。"
  );
}
