import React, { useContext, useRef } from "react";
import { decodeBTag } from "../utils";
import {HiddenChinese} from "../context"

//组件
import AudioButton from "./AudioButton";
import { CardStateButton } from "./CardStateButton";

//类型
import type { WordData, ExampleSentence } from "../../../backend-script/dictionary/index";
import type { CardsStatus } from "../View";

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//展示单词的UI组件

interface Props extends WordData {
  updateAnki: (index: number) => void;
  updateAnkiTranslations: (idx: number, num: number) => void;
  translationsCardsStatus: CardsStatus[][];
  cardsStatusList: CardsStatus[];
}

export function Word(props: Props) {
  const {
    word,
    phonetic,
    star_amount,
    translations,
    cardsStatusList,
    translationList,
    translationsCardsStatus,
    updateAnki,
    updateAnkiTranslations,
  } = props;
  return (
    <div>
      <header className="bg-green-150 p-2 rounded">
        <div className="flex items-center">
          <h1 className="text-4xl text-black">{word}</h1>
          <div className="leading-tight ml-4 mr-auto self-end text-lg text-yellow-600">
            {"★".repeat(star_amount)}
          </div>
        </div>
        <div className="flex flex-wrap items-center">
          <Phonetic symbols={phonetic.en} audioURL={phonetic.en_audio} />
          <Phonetic symbols={phonetic.am} audioURL={phonetic.am_audio} />
        </div>
      </header>
      <ul className="mt-2 rounded">
        {translationList &&
          translationList.map((item, index) => {
            const { example_sentences, ...other } = item;
            return (
              <li className="bg-green-150 rounded text-base my-2" key={index}>
                <Explanation
                  {...other}
                  updateAnki={() => updateAnki(index)}
                  cardsStatus={cardsStatusList[index]}
                />
                {example_sentences && (
                  <ExampleSentences exampleSentences={example_sentences} />
                )}
              </li>
            );
          })}
      </ul>
      {translations && (
        <Translations updateAnkiTranslations={updateAnkiTranslations} translationsCardsStatus={translationsCardsStatus}>
          {translations}
        </Translations>
      )}
    </div>
  );
}

function Phonetic(props: { symbols?: string; audioURL?: string }) {
  const { symbols, audioURL } = props;
  const ref = useRef({ playAudio: () => undefined });
  const playAudio = () => {
    ref.current.playAudio();
  };
  return (
    <div
      className="group flex items-center"
      hidden={symbols === undefined && audioURL === undefined}
    >
      <p
        hidden={symbols === undefined}
        className="cursor-pointer pr-1.5 text-black text-lg"
        onClick={playAudio}
      >
        {symbols}
      </p>
      <AudioButton
        ref={ref}
        audioURL={audioURL}
        className="group-hover:audio"
      />
    </div>
  );
}

function Explanation(props: {
  updateAnki: () => void;
  translation: string;
  definition: string;
  part_of_speech: string;
  cardsStatus: CardsStatus;
}) {
  const { part_of_speech, definition, translation, cardsStatus, updateAnki } =
    props;
  const hiddenChinese = useContext(HiddenChinese);
  return (
    <p>
      <PartOfSpeech>{part_of_speech}</PartOfSpeech>
      <CardStateButton {...cardsStatus} onClick={updateAnki} />
      {decodeBTag(definition)}
      {!hiddenChinese && <span className="text-blue-800">{translation}</span>}
    </p>
  );
}

function ExampleSentences(props: { exampleSentences: ExampleSentence[] }) {
  const hiddenChinese = useContext(HiddenChinese);
  return (
    <ul>
      {props.exampleSentences.map((exampleSentence) => {
        const { example_sentence, example_sentence_translation } =
          exampleSentence;
        return (
          <li
            className="border border-black px-4 py-1.5 rounded text-base my-1.5"
            key={example_sentence}
          >
            <p>{example_sentence}</p>
            {!hiddenChinese && (
              <p className="text-blue-800">{example_sentence_translation}</p>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function PartOfSpeech(props: { children: string }) {
  let part_of_speech = props.children;
  return (
    <span className="bg-blue-800 font-bold mr-1 px-3 py-0.5 text-base text-white">
      {part_of_speech}
    </span>
  );
}

function Translations(props: {
  children: string[];
  translationsCardsStatus:CardsStatus[][]
  updateAnkiTranslations: (idx: number, num: number) => void;
}) {
  let translations = props.children;
  let {updateAnkiTranslations,translationsCardsStatus} = props
  return (
    <ul className="rounded">
      {translations.map((item, idx) => {
        let point = item.indexOf(".") + 1;
        let part_of_speech = point === -1 ? "" : item.slice(0, point);
        return (
          <div key={item} className="mt-2 rounded bg-green-150">
            {part_of_speech && <PartOfSpeech>{part_of_speech}</PartOfSpeech>}
            <ul>
              {item
                .slice(point)
                .split("；")
                .map((item, num) => {
                  return (
                    <li
                      className="text-base py-2 pl-2 list-disc list-inside border-b border-black"
                      key={item}
                    >
                      {item}
                      <CardStateButton
                        {...translationsCardsStatus[idx][num]}
                        onClick={() => updateAnkiTranslations(idx, num)}
                      />
                    </li>
                  );
                })}
            </ul>
          </div>
        );
      })}
    </ul>
  );
}
