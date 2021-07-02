import React from "react";

import { AddButtonState, SentenceData } from "../../../types/index";

import AudioButton from "../components/AudioButton";
import AddButton from "../components/AddButton";

interface Props extends SentenceData {
  addNote: () => void;
  addButtonState: AddButtonState;
}

function SentenceCard(props: Props) {
  const {
    sentence,
    addButtonState,
    sentence_audio,
    sentenceTranslation,
    addNote,
  } = props;
  return (
    <div>
      <header className="p-1.5 bg-green-150 rounded">
        <AudioButton audioURL={sentence_audio} className="float-right" />
        <h1 className="text-xl indent-2">{sentence}</h1>
      </header>
      <main className="mt-1 bg-green-150 p-1.5 text-xl rounded indent-2">
        {sentence && (
          <AddButton {...addButtonState} onClick={addNote} />
        )}
        {sentenceTranslation}
      </main>
    </div>
  );
}

export default SentenceCard;
