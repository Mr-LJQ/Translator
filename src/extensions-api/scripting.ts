export function executeScript(
  details: chrome.scripting.ScriptInjection<any[], unknown>,
  callback?: (result: chrome.scripting.InjectionResult<unknown>[]) => void
) {
  chrome.scripting.executeScript(details, callback);
}
