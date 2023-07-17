export function setBadgeText(
  details: chrome.action.BadgeTextDetails,
  callback?: () => void
) {
  chrome.action.setBadgeText(details, callback);
}
