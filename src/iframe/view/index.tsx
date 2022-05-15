import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Messenger } from "../messenger";
import { Command } from "../../utils/command";
import { MessengerContext, AudioContext } from "./context";
import { SelectionListener } from "../../events/event-listener";

import "../../index.css";

import { View } from "./View";

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//

//用于进行语音播放
const audioElement = document.createElement("audio");

let messenger = new Messenger({ self: window });
messenger.install();
let onMessage = messenger.onMessage;
let postMessage = messenger.postMessage;

//监听停止播放的指令
onMessage(Command.PauseAudio, () => {
  try {
    audioElement.pause();
  } catch {}
});

//添加选词监听
let selectionListener = new SelectionListener((text: string) => {
  postMessage(Command.TranslateText, text);
});

onMessage(Command.OpenSelection,(enable) => {
  enable ? selectionListener.install() : selectionListener.uninstall();
})


//避免内部滚动条影响到外部滚动条，只能够减低灵敏度，实际上还是会影响到
document.addEventListener("scroll", function (event) {
  event.stopPropagation();
});

//此处 root 与其对应的 html文件中的根标签有关
const root = document.getElementById("root");
root?.classList.add("px-2","pb-2")

ReactDOM.render(
  <StrictMode>
    <AudioContext.Provider value={audioElement}>
      <MessengerContext.Provider value={{ onMessage, postMessage }}>
        <View />
      </MessengerContext.Provider>
    </AudioContext.Provider>
  </StrictMode>,
  root
);
