import React, { useState, useMemo, useLayoutEffect } from "react";
import { Messenger } from "@/utils";
import { SelectionListener } from "@/user-operation";
import { Command } from "@/configuration";
import { AudioContext, MessengerContext, HiddenChinese } from "../hooks";
import { HistoryContainer } from "./HistoryContainer";
import { DisplayContainer } from "./DisplayContainer";

const audioElement = document.createElement("audio");

const messenger = new Messenger({
  self: window,
  //这是在iframe内的，因此必定存在
  target: window.top!,
});

const { onMessage, postMessage } = messenger;
messenger.install();

const selectionListener = new SelectionListener((text) => {
  postMessage(Command.TranslateText, text);
});
//监听停止播放的指令

onMessage(Command.PauseAudio, () => {
  try {
    audioElement.pause();
    // eslint-disable-next-line no-empty
  } catch (e) {}
});

onMessage(Command.OpenSelection, (enable) => {
  enable ? selectionListener.install() : selectionListener.uninstall();
});

export function View() {
  const [hiddenChinese, setHiddenChinese] = useState(true);
  //需要使用 useLayoutEffect ，以尽可能早的添加该监听
  useLayoutEffect(() => {
    return onMessage(Command.HiddenChinese, (hidden) => {
      setHiddenChinese(hidden);
    });
  }, []);

  const Container = useMemo(function () {
    return (
      <AudioContext.Provider value={audioElement}>
        <MessengerContext.Provider value={{ onMessage, postMessage }}>
          <HistoryContainer>
            {function (props) {
              return <DisplayContainer {...props} />;
            }}
          </HistoryContainer>
        </MessengerContext.Provider>
      </AudioContext.Provider>
    );
  }, []);
  return (
    <HiddenChinese.Provider value={hiddenChinese}>
      {Container}
    </HiddenChinese.Provider>
  );
}
