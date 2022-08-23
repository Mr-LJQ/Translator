//此处的值与 manifest 中 command对象的键相关
type Command =
  | "open_search_box"
  | "show_translation_page"
  | "switch_hotkey_and_selection_listener";

type HandlerObject = Record<Command, () => void>;
let onCommand = function onCommand(handlerObject: HandlerObject) {
  //监听用户快捷键，用于开关拓展
  chrome.commands.onCommand.addListener(function (command) {
    const handler = handlerObject[command as Command];
    handler?.();
  });
};

if (__DEV__) {
  onCommand = function StrictOnCommand(handlerObject: HandlerObject) {
    const { commands } = chrome.runtime.getManifest();
    if (!commands) throw new Error("manifest.json 文件中没有 commands 项");
    const commandNames = Object.keys(handlerObject);
    commandNames.forEach(function (command) {
      if (!(command in commands))
        throw new Error(`没有在 commands 中找到 ${command} 项`);
    });
    //监听用户快捷键，用于开关拓展
    chrome.commands.onCommand.addListener(function (command) {
      const handler = handlerObject[command as Command];
      handler?.();
    });
  };
}

export { onCommand };
