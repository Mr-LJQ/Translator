interface HandlerObject {
  [key: string]: () => void;
}

let onCommand = function onCommand(handlerObject: HandlerObject) {
  //监听用户快捷键，用于开关拓展
  chrome.commands.onCommand.addListener(function (command) {
    var handler = handlerObject[command];
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
      var handler = handlerObject[command];
      handler?.();
    });
  };
}

export { onCommand };
