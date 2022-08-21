import React from "react";
import { PhraseData, ExampleSentence } from "@/dictionary";
import { AudioButton } from "./AudioButton";
import { AnkiButton } from "./AnkiButton";
import { decodeBTag } from "../utils";
import { AnkiButtonInfo } from "../types";

interface Props extends PhraseData {
  ankiButtonInfo: AnkiButtonInfo;
  updateAnki: () => void;
}

export function Phrase(props: Props) {
  const {
    phrase,
    translations,
    phrase_audio,
    ankiButtonInfo,
    example_sentences,
    updateAnki,
  } = props;
  return (
    <div>
      <header className="bg-green-loveEye rounded p-1.5">
        <div className="flex items-center">
          <h1 className="text-2xl text-black">{phrase}</h1>
          <AudioButton audioURL={phrase_audio} className="mr-auto ml-1" />
          <AnkiButton
            {...ankiButtonInfo}
            onClick={updateAnki}
            className="float-right"
          />
        </div>
        <Translations translations={translations} />
      </header>
      {example_sentences && (
        <ExampleSentences example_sentences={example_sentences} />
      )}
    </div>
  );
}

const Translations = React.memo(function Translations(props: {
  translations: string[];
}) {
  const { translations } = props;
  return (
    <p className="text-base">
      {translations.flatMap(function (item) {
        return [item, <br key={item} />];
      })}
    </p>
  );
});

const ExampleSentences = React.memo(function ExampleSentences(props: {
  example_sentences: ExampleSentence[];
}) {
  const { example_sentences } = props;
  return (
    <ul className="mt-2">
      {example_sentences.map((item, index) => {
        const {
          example_audio,
          example_sentence,
          example_sentence_translation,
        } = item;
        return (
          <li
            key={index}
            className="bg-green-loveEye rounded mb-1 text-lg py-1 pl-4"
          >
            <AudioButton audioURL={example_audio} className="float-right" />
            <p>{decodeBTag(example_sentence)}</p>
            <p className="text-blue-800">{example_sentence_translation}</p>
          </li>
        );
      })}
    </ul>
  );
});
