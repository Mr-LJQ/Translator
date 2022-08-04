import React from "react";
import { decodeBTag } from "../utils";

//组件
import {CardStateButton} from "./CardStateButton"
import AudioButton from "./AudioButton";

//声明
import type {CardsStatus} from "../View"
import type {PhraseData} from "../../../backend-script/dictionary"



interface Props extends PhraseData {
  updateAnki: () => void;
  cardsStatus?: CardsStatus;
}

export function Phrase(props: Props) {
  const {
    phrase,
    translations,
    phrase_audio,
    example_sentences,
    cardsStatus,
    updateAnki,
  } = props;
  return (
    <div>
      <header className="bg-green-150 rounded p-1.5">
        <div className="flex items-center">
          <h1 className="mr-auto text-2xl text-black">{phrase}</h1>
          <AudioButton audioURL={phrase_audio} />
        </div>
        <p className="text-base">
          {cardsStatus && (
            <CardStateButton {...cardsStatus} onClick={updateAnki} />
          )}
          {translations.reduce((acc, cur) => {
            return acc + " ; " + cur;
          })}
        </p>
      </header>
      {example_sentences && (
        <ul className="mt-2">
          {example_sentences.map((item, index) => {
            return (
              <li
                key={index}
                className="bg-green-150 rounded mb-1 text-lg py-1 pl-4"
              >
                <AudioButton
                  audioURL={item.example_audio}
                  className="float-right"
                />
                <p>{decodeBTag(item.example_sentence)}</p>
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

