const SEARCH_CONTAINER_ID = "ANKI_BROWSER_EXTENSIONS_SEARCH_CONTAINER_ID";
const ATTRIBUTE_NAME =
  "ANKI_BROWSER_EXTENSIONS_SEARCH_CONTAINER_ATTRIBUTE_NAME";

export function isSearchContainer(element: unknown) {
  if (element == null) return false;
  if (!(element instanceof HTMLElement)) return false;
  return element.getAttribute(ATTRIBUTE_NAME) === SEARCH_CONTAINER_ID;
}

export function attachSymbolToSearchContainer(element: Element) {
  element.setAttribute(ATTRIBUTE_NAME, SEARCH_CONTAINER_ID);
}
