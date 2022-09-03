import React, { useCallback } from "react";
import {
  WordData,
  isWordData,
  isErrorData,
  isPhraseData,
  isSentenceData,
  TranslationResult,
} from "@/dictionary";
import {
  __main__,
  transformWordData,
  transformPhraseData,
  transformTranslations,
} from "../../utils";
import { NoteData, AnkiButtonInfoObject } from "../../types";

import { WordSection } from "../WordSection";
import { ErrorSection } from "../ErrorSection";
import { PhraseSection } from "../PhraseSection";
import { SentenceSection } from "../SentenceSection";
import { LoadingMask } from "../Loading";

interface Props {
  isLoading: boolean;
  data: TranslationResult | undefined;
  ankiButtonInfoObject: AnkiButtonInfoObject;
  updateAnki: (
    data: NoteData,
    key: string | typeof __main__,
    idx: number
  ) => void;
}

export function DisplayContainer(props: Props) {
  const { data, updateAnki, ankiButtonInfoObject, isLoading } = props;

  const updateAnkiWord = useCallback(
    function (index: number) {
      const wordData = transformWordData(data as WordData, index);
      updateAnki(wordData, __main__, index);
    },
    [data, updateAnki]
  );

  const updateAnkiTranslations = useCallback(
    function (key: string, idx: number) {
      updateAnki(transformTranslations(data as WordData, key, idx), key, idx);
    },
    [data, updateAnki]
  );

  //初始阶段data为空
  if (!data) {
    return (
      <p className="fixed inset-0 flex items-center justify-center text-2xl text-center bg-green-loveEye ">
        翻译记录为空
      </p>
    );
  }

  return (
    <>
      {isLoading && <LoadingMask className="fixed inset-0 z-50" />}
      {isErrorData(data) && <ErrorSection {...data} />}
      {isWordData(data) && (
        <WordSection
          {...data}
          updateAnki={updateAnkiWord}
          updateAnkiTranslations={updateAnkiTranslations}
          ankiButtonInfoObject={ankiButtonInfoObject}
        />
      )}
      {isPhraseData(data) && (
        <PhraseSection
          {...data}
          ankiButtonInfo={ankiButtonInfoObject[__main__]![0]!} //按照设计必定存在值
          updateAnki={() => {
            return updateAnki(transformPhraseData(data), __main__, 0);
          }}
        />
      )}
      {isSentenceData(data) && (
        <SentenceSection
          {...data}
          updateAnki={() => {
            return updateAnki(data, __main__, 0);
          }}
          ankiButtonInfo={
            ankiButtonInfoObject[__main__]![0]! //按照设计必定存在值
          }
        />
      )}
    </>
  );
}
