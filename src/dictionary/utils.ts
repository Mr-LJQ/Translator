/**
 * 获取页面的中关于拼写错误部分的正确推断
 */
export function getCorrectSpelling(dom: Document) {
  const inferCorrects = [...dom.querySelectorAll("#results-contents .error-typo .typo-rel a")].reduce((acc, node) => {
    const text = node.textContent
    if (text) acc.push(text)
    return acc
  }, [] as string[])
  if (inferCorrects.length) return inferCorrects
}
