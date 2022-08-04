import React from "react";

import AudioButton from "./AudioButton";
import { CardStateButton } from "./CardStateButton";

import type { SentenceData} from "../../../backend-script/dictionary/index"
import type { CardsStatus } from "../View";

interface Props extends SentenceData {
  updateAnki: () => void;
  cardsStatus: CardsStatus;
}

export function Sentence(props: Props) {
  const {
    sentence,
    cardsStatus,
    sentence_audio,
    sentence_translation,
    updateAnki,
  } = props;
  return (
    <div>
      <header className="p-1.5 bg-green-150 rounded">
        <AudioButton audioURL={sentence_audio} className="float-right" />
        <h1 className="text-xl indent-2">{sentence}</h1>
      </header>
      <main className="mt-1 bg-green-150 p-1.5 text-xl rounded indent-2">
        {sentence && <CardStateButton {...cardsStatus} onClick={updateAnki} />}
        {sentence_translation}
      </main>
    </div>
  );
}

