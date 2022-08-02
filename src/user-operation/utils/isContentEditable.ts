export function isContentEditable(element:Element) {
  if (["INPUT", "TEXTAREA"].includes(element.tagName)) return true;
  if (element instanceof HTMLElement && element.isContentEditable) return true;
  return false;
}