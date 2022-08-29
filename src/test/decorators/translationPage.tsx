import React from "react";
import { AudioContext } from "@/translation-page/components/Context";
const audioElement = document.createElement("audio");

export const decorators = [
  (Story: any) => {
    return (
      <div
        style={{
          position: "relative",
          width: 400,
          height: 300,
          boxShadow:"0 0 0 1000px rgba(0,0,0,.3)",
          padding: "0 8px 8px 8px",
          overflowY: "auto",
        }}
      >
        <AudioContext.Provider value={audioElement}>
          <Story />
        </AudioContext.Provider>
      </div>
    );
  },
];
