export function addContextMenuItem(
  createProperties: chrome.contextMenus.CreateProperties,
  callback?: () => void
) {
  chrome.contextMenus.create(createProperties, callback);
}

export function onContextMenuClick(
  callback: (
    info: chrome.contextMenus.OnClickData,
    tab?: chrome.tabs.Tab | undefined
  ) => void
) {
  chrome.contextMenus.onClicked.addListener(callback);
}
