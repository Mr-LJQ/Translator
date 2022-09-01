import React, { useState, useMemo, useLayoutEffect } from "react";
import { Messenger } from "@/utils";
import { SelectionListener } from "@/user-operation";
import { Command } from "@/configuration";
import { AudioContext, MessengerContext, HiddenChinese } from "../Context";
import { DisplayContainer } from "../DisplayContainer";
import { useFeature } from "../../hooks";

const audioElement = document.createElement("audio");

const messenger = new Messenger({
  self: window,
  //这是在iframe内的，因此必定存在
  target: window.top!,
});
const { onMessage, postMessage } = messenger;
messenger.install();
/**
 * 便于测试，使测试时不会出现跨域问题
 */
if (__DEV__) {
  messenger.addTarget(window);
}
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
  const [hiddenChinese, setHiddenChinese] = useState(false);
  //需要使用 useLayoutEffect ，以尽可能早的添加该监听
  useLayoutEffect(() => {
    return onMessage(Command.HiddenChinese, (hidden) => {
      setHiddenChinese(hidden);
    });
  }, []);
  const content = useMemo(() => {
    return (
      <AudioContext.Provider value={audioElement}>
        <MessengerContext.Provider
          value={{
            postMessage,
            onMessage,
          }}
        >
          <Container />
        </MessengerContext.Provider>
      </AudioContext.Provider>
    );
  }, []);
  return (
    <HiddenChinese.Provider value={hiddenChinese}>
      {content}
    </HiddenChinese.Provider>
  );
}

const Container = React.memo(function Container() {
  const feature = useFeature();
  return <DisplayContainer {...feature} />;
});
