import {
  HiddenChinese,
  AudioContext,
} from "@/translation-page/components/Context";
import React from "react";

export function containerDecorator(Story: any) {
  return (
    <div
      style={{
        width: 400,
        height: 300,
        boxShadow: "0 0 0 10px skyblue",
        transform: "scale(1)",
      }}
    >
      <div
        style={{
          width: 400,
          height: 300,
          overflowY: "auto",
        }}
      >
        <div
          style={{
            padding: "0 8px 8px 8px",
          }}
        >
          <Story />
        </div>
      </div>
    </div>
  );
}

export function hiddenChineseDecorator(Story: any) {
  return (
    <HiddenChinese.Provider value={false}>
      <Story />
    </HiddenChinese.Provider>
  );
}

export const audioElement = document.createElement("audio");

export function audioElementDecorator(Story: any) {
  return (
    <AudioContext.Provider value={audioElement}>
      <Story />
    </AudioContext.Provider>
  );
}
