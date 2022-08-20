import React, { useContext } from "react";
import { PostMessage, OnMessage, invariant } from "@/utils";

export const MessengerContext = React.createContext<{
  onMessage: OnMessage;
  postMessage: PostMessage;
}>(null!);
export const HiddenChinese = React.createContext<boolean>(null!);
export const AudioContext = React.createContext<HTMLAudioElement>(null!);

export function useMessenger() {
  const result = useContext(MessengerContext);
  invariant(result != null, "MessengerContext 的值为空");
  return result;
}

export function useHiddenChinese() {
  const result = useContext(HiddenChinese);
  invariant(result != null, "HiddenChinese 的值为空");
  return result;
}

export function useAudio() {
  const result = useContext(AudioContext);
  invariant(result != null, "AudioContext 的值为空");
  return result;
}
