import React from "react";
import { SentenceData } from "@/dictionary";
import { AudioButton } from "./AudioButton";
import { AnkiButton } from "./AnkiButton";
import { AnkiButtonInfo } from "../types";

interface Props extends SentenceData {
  ankiButtonInfo: AnkiButtonInfo;
  updateAnki: () => void;
}

export function Sentence(props: Props) {
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
          onClick={updateAnki}
          className="float-right"
        />
        {sentence_translation}
      </main>
    </div>
  );
}
