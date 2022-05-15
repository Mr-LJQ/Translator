import React from "react";

import type {OnMessage,PostMessage} from "../messenger"

export const MessengerContext = React.createContext<{onMessage:OnMessage,postMessage:PostMessage}>(null!)
export const AudioContext = React.createContext<HTMLAudioElement>(null!)
export const HiddenChinese = React.createContext<Boolean>(null!)