export function setBadgeText(
  details: chrome.browserAction.BadgeTextDetails,
  callback?: () => void
) {
  chrome.browserAction.setBadgeText(details, callback);
}
