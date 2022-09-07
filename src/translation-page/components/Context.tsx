import React, { useContext } from "react";
import type { PostMessage, OnMessage } from "@/utils";

export const MessengerContext = React.createContext<{
  onMessage: OnMessage;
  postMessage: PostMessage;
}>(null!);
export const HiddenChinese = React.createContext<boolean>(null!);
export const AudioContext = React.createContext<HTMLAudioElement>(null!);
MessengerContext.displayName = "MessengerContext";
HiddenChinese.displayName = "HiddenChinese";
AudioContext.displayName = "AudioContext";

export const useAudio = addEmptyCatch(AudioContext);
export const useMessenger = addEmptyCatch(MessengerContext);
export const useHiddenChinese = addEmptyCatch(HiddenChinese);

function addEmptyCatch<T>(context: React.Context<T>) {
  return () => {
    const result = useContext(context);
    if (result === null) {
      throw new Error(
        `未找到${context.displayName}上下文所对应的值，请先通过 <Context.Provider> 传递值.`
      );
    }
    return result;
  };
}
