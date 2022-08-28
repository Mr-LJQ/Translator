import React, { useRef } from "react";
import { AnkiButton } from "../AnkiButton";
import { AudioButton } from "../AudioButton";
import { useHiddenChinese } from "../Context";
import { decodeBTag, __main__ } from "../../utils";
import { AnkiButtonInfo, AnkiButtonInfoObject } from "../../types";
import { WordData, ExampleSentence, TranslationItem } from "@/dictionary";

interface Props extends WordData {
  updateAnki: (index: number) => void;
  ankiButtonInfoObject: AnkiButtonInfoObject;
  updateAnkiTranslations: (key: string, idx: number) => void;
}
/**
 * 用于展示 Word 相关翻译数据的组件
 */
export function WordSection(props: Props) {
  const {
    word,
    phonetic,
    star_amount,
    translations,
    translationList,
    ankiButtonInfoObject,
    updateAnki,
    updateAnkiTranslations,
  } = props;

  return (
    <div>
      <header className="bg-green-loveEye p-2 rounded">
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
      {translationList && (
        <TranslationList
          updateAnki={updateAnki}
          translationList={translationList}
          ankiButtonInfos={ankiButtonInfoObject[__main__]!}
        />
      )}
      {translations && (
        <Translations
          translations={translations}
          updateAnkiTranslations={updateAnkiTranslations}
          ankiButtonInfoObject={ankiButtonInfoObject}
        />
      )}
    </div>
  );
}

const Phonetic = React.memo(function Phonetic(props: {
  symbols?: string;
  audioURL?: string;
}) {
  const { symbols, audioURL } = props;
  const ref = useRef<{ playAudio: () => void }>({
    playAudio() {
      return undefined;
    },
  });

  const playAudio = function playAudio() {
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
        className="group-hover:play-audio"
      />
    </div>
  );
});

const TranslationList = React.memo(function TranslationList(props: {
  ankiButtonInfos: AnkiButtonInfo[];
  translationList: TranslationItem[];
  updateAnki: (index: number) => void;
}) {
  const { translationList, updateAnki, ankiButtonInfos } = props;
  return (
    <ul className="mt-2 rounded">
      {translationList.map(function (item, index) {
        const { example_sentences, ...other } = item;
        return (
          <li className="bg-green-loveEye rounded text-base my-2" key={index}>
            <Explanation
              {...other}
              index={index}
              updateAnki={updateAnki}
              ankiButtonInfo={ankiButtonInfos[index]!}
            />
            {example_sentences && (
              <ExampleSentences exampleSentences={example_sentences} />
            )}
          </li>
        );
      })}
    </ul>
  );
});

interface ExplanationProps extends TranslationItem {
  index: number;
  updateAnki: (index: number) => void;
  ankiButtonInfo: AnkiButtonInfo;
}

const Explanation = React.memo(function Explanation(props: ExplanationProps) {
  const {
    index,
    updateAnki,
    definition,
    translation,
    part_of_speech,
    ankiButtonInfo,
  } = props;
  const hiddenChinese = useHiddenChinese();
  return (
    <div>
      <PartOfSpeech>{part_of_speech}</PartOfSpeech>
      <AnkiButton
        {...ankiButtonInfo}
        updateAnki={() => {
          return updateAnki(index);
        }}
        className="float-right"
      />
      {decodeBTag(definition)}
      {!hiddenChinese && <span className="text-blue-800">{translation}</span>}
    </div>
  );
});

const ExampleSentences = React.memo(function ExampleSentences(props: {
  exampleSentences: ExampleSentence[];
}) {
  const hiddenChinese = useHiddenChinese();
  return (
    <ul>
      {props.exampleSentences.map(function (exampleSentence) {
        const { example_sentence, example_sentence_translation } =
          exampleSentence;
        return (
          <li
            key={example_sentence}
            className="border border-black px-4 py-1.5 rounded text-base my-1.5"
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
});

const Translations = React.memo(function Translations(props: {
  updateAnkiTranslations: (key: string, idx: number) => void;
  ankiButtonInfoObject: AnkiButtonInfoObject;
  translations: {
    [key: string]: string[];
  };
}) {
  const { updateAnkiTranslations, ankiButtonInfoObject, translations } = props;
  return (
    <ul className="rounded">
      {Object.entries(translations).map(function ([partOfSpeech, val]) {
        return (
          <TranslationsLi
            key={partOfSpeech}
            translations={val}
            partOfSpeech={partOfSpeech}
            updateAnkiTranslations={updateAnkiTranslations}
            ankiButtonInfos={ankiButtonInfoObject[partOfSpeech]!}
          />
        );
      })}
    </ul>
  );
});

const TranslationsLi = React.memo(function TranslationsLi(props: {
  partOfSpeech: string;
  translations: string[];
  ankiButtonInfos: AnkiButtonInfo[];
  updateAnkiTranslations: (key: string, idx: number) => void;
}) {
  const {
    translations,
    partOfSpeech,
    ankiButtonInfos,
    updateAnkiTranslations,
  } = props;
  return (
    <li key={partOfSpeech} className="mt-2 rounded bg-green-loveEye">
      <ul>
        {translations.map(function (item, idx) {
          return (
            <TranslationLi
              idx={idx}
              key={item}
              item={item}
              partOfSpeech={partOfSpeech}
              ankiButtonInfo={ankiButtonInfos[idx]!}
              updateAnkiTranslations={updateAnkiTranslations}
            />
          );
        })}
      </ul>
    </li>
  );
});

const TranslationLi = React.memo(function TranslationLi(props: {
  idx: number;
  item: string;
  partOfSpeech: string;
  ankiButtonInfo: AnkiButtonInfo;
  updateAnkiTranslations: (key: string, idx: number) => void;
}) {
  const { partOfSpeech, item, ankiButtonInfo, idx, updateAnkiTranslations } =
    props;
  return (
    <li className="text-base py-2 pl-2 border-b border-black" key={item}>
      {partOfSpeech && <PartOfSpeech>{partOfSpeech}</PartOfSpeech>}
      <AnkiButton
        className="float-right"
        {...ankiButtonInfo}
        updateAnki={() => {
          return updateAnkiTranslations(partOfSpeech, idx);
        }}
      />
      {item}
    </li>
  );
});

const PartOfSpeech = React.memo(function PartOfSpeech(props: {
  children: string;
}) {
  const part_of_speech = props.children;
  return (
    <span className="bg-blue-800 font-bold mr-1 px-3 py-0.5 text-base text-white">
      {part_of_speech}
    </span>
  );
});
