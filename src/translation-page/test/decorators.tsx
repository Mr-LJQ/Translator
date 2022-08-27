import React from "react";
import { Messenger } from "@/utils";
import {
  AudioContext,
  MessengerContext,
  HiddenChinese,
} from "../components/Context";

const audioElement = document.createElement("audio");

const messenger = new Messenger({
  self: window,
  //这是在iframe内的，因此必定存在
  target: window.top!,
});

const { onMessage, postMessage } = messenger;
messenger.install();

export const decorators = [
  (Story: any) => {
    return (
      <HiddenChinese.Provider value={false}>
        <AudioContext.Provider value={audioElement}>
          <MessengerContext.Provider
            value={{
              postMessage,
              onMessage,
            }}
          >
            <Story />
          </MessengerContext.Provider>
        </AudioContext.Provider>
      </HiddenChinese.Provider>
    );
  },
];
