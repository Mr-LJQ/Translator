import React from "react";
import { SentenceData } from "@/dictionary";
import { AnkiButton } from "../AnkiButton";
import { AudioButton } from "../AudioButton";
import { AnkiButtonInfo } from "../../types";

interface Props extends SentenceData {
  ankiButtonInfo: AnkiButtonInfo;
  updateAnki: () => void;
}
/**
 * 用于展示 Sentence 相关翻译数据的组件
 */
export function SentenceSection(props: Props) {
  const {
    sentence,
    ankiButtonInfo,
    sentence_audio,
    sentence_translation,
    updateAnki,
  } = props;
  return (
    <div>
      <header className="flex items-center p-1.5 bg-green-loveEye rounded">
        <h1 className="text-xl indent-[2em] mr-auto">{sentence}</h1>
        <AudioButton audioURL={sentence_audio} className="float-right" />
      </header>
      <main className="mt-1 bg-green-loveEye p-1.5 text-xl rounded indent-[2em]">
        <AnkiButton
          {...ankiButtonInfo}
          updateAnki={updateAnki}
          className="float-right"
        />
        {sentence_translation}
      </main>
    </div>
  );
}
