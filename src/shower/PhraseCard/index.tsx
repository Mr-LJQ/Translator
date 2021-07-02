import React from "react";

import { AddButtonState, PhraseData } from "../../../types/index";

import AddButton from "../components/AddButton/index";
import AudioButton from "../components/AudioButton";
import { translateBTag } from "../utils/index";

interface Props extends PhraseData {
  addNote: () => void;
  hidden: boolean;
  addButtonState?: AddButtonState;
}

function PhraseCard(props: Props) {
  const {
    hidden,
    phrase,
    translations,
    phrase_audio,
    exampleSentences,
    addButtonState,
    addNote,
  } = props;
  return (
    <div hidden={hidden}>
      <header className="bg-green-150 rounded p-1.5">
        <div className="flex items-center">
          <h1 className="mr-auto text-2xl text-black">{phrase}</h1>
          <AudioButton audioURL={phrase_audio} />
        </div>
        <p className="text-base">
          {addButtonState && (
            <AddButton key={phrase} {...addButtonState} onClick={addNote} />
          )}
          {translations.reduce((acc, cur) => {
            return acc + " ; " + cur;
          })}
        </p>
      </header>
      {exampleSentences && (
        <ul className="mt-2">
          {exampleSentences.map((item, index) => {
            return (
              <li
                key={index}
                className="bg-green-150 rounded mb-1 text-lg py-1 pl-4"
              >
                <AudioButton
                  audioURL={item.example_audio}
                  className="float-right"
                />
                <p>{translateBTag(item.example_sentence)}</p>
                <p className="text-blue-800">
                  {item.example_sentence_translation}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default PhraseCard;
