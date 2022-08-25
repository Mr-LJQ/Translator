import React, { useContext } from "react";
import { invariant } from "@/utils";
import type { PostMessage, OnMessage } from "@/utils";

export const MessengerContext = React.createContext<{
  onMessage: OnMessage;
  postMessage: PostMessage;
}>(null!);
export const HiddenChinese = React.createContext<boolean>(null!);
export const AudioContext = React.createContext<HTMLAudioElement>(null!);

export const useAudio = addEmptyCatch(AudioContext);
export const useMessenger = addEmptyCatch(MessengerContext);
export const useHiddenChinese = addEmptyCatch(HiddenChinese);

function addEmptyCatch<T>(context: React.Context<T>) {
  return () => {
    const result = useContext(context);
    if (__DEV__) {
      if (result === null) {
        throw new Error(
          "为找到上下文所对应的值，请先通过 <Context.Provider> 传递值."
        );
      }
    }
    return result;
  };
}
