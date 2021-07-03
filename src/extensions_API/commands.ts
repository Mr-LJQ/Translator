interface Handlers {
  [key: string]: (...args: any[]) => void
}

let onCommand = function (handlers: Handlers) {
  //监听用户快捷键，用于开关拓展
  chrome.commands.onCommand.addListener((command) => {
    const handler = handlers[command]
    handler()
  })
}

if (process.env.NODE_ENV === "development") {
  onCommand = function StrictOnCommand(handlers: Handlers) {
    const { commands } = chrome.runtime.getManifest()
    if (!commands) throw new Error("Commands are not configured in manifest.json file")
    const commandNames = Object.keys(handlers)
    commandNames.forEach((command) => {
      if (!(command in commands)) throw new Error("Unexpected command:" + command)
    })
    //监听用户快捷键，用于开关拓展
    chrome.commands.onCommand.addListener((command) => {
      const handler = handlers[command]
      handler()
    })
  }
}


export { onCommand }