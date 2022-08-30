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
        overflowY: "auto",
        transform: "scale(1)",
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
  );
}

export function hiddenChineseDecorator(Story: any) {
  return (
    <HiddenChinese.Provider value={false}>
      <Story />
    </HiddenChinese.Provider>
  );
}

export function audioElementDecorator(Story: any) {
  const audioElement = document.createElement("audio");
  return (
    <AudioContext.Provider value={audioElement}>
      <Story />
    </AudioContext.Provider>
  );
}
