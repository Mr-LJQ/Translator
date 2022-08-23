/**
 * 实现与Anki交互相关逻辑的模块,并对翻译数据进行渲染
 */
import React, { useCallback } from "react";
import produce from "immer";
import { Command } from "@/configuration";
import {
  WordData,
  isWordData,
  isErrorData,
  isPhraseData,
  isSentenceData,
} from "@/dictionary";
import {
  __main__,
  transformWordData,
  transformPhraseData,
  transformTranslations,
  transformAnkiResponseStatus,
} from "../utils";
import { useMessenger } from "../hooks";
import {
  Status,
  NoteData,
  AnkiButtonInfo,
  DisplayContainerProps,
} from "../types";

import { Word } from "./Word";
import { Phrase } from "./Phrase";
import { Sentence } from "./Sentence";
import { ErrorComponent } from "./ErrorComponent";

export function DisplayContainer(props: DisplayContainerProps) {
  const { data, loadingSet, ankiButtonInfoObject, setAnkiButtonInfoObject } =
    props;

  const _updateAnki = useAnki({
    loadingSet,
    ankiButtonInfoObject,
    setAnkiButtonInfoObject,
  });

  const updateAnkiWord = useCallback(
    function (index: number) {
      const wordData = transformWordData(data as WordData, index);
      _updateAnki(wordData, __main__, index);
    },
    [data, _updateAnki]
  );

  const updateAnkiTranslations = useCallback(
    function (key: string, idx: number) {
      _updateAnki(transformTranslations(data as WordData, key, idx), key, idx);
    },
    [data, _updateAnki]
  );

  //初始阶段data为空
  if (!data) {
    return (
      <p className="fixed flex inset-2 justify-center pt-20 text-2xl text-center bg-green-loveEye ">
        翻译记录为空，尚未进行任何翻译
      </p>
    );
  }

  return (
    <>
      {isErrorData(data) && <ErrorComponent {...data} />}
      {isWordData(data) && (
        <Word
          {...data}
          updateAnki={updateAnkiWord}
          updateAnkiTranslations={updateAnkiTranslations}
          ankiButtonInfoObject={ankiButtonInfoObject}
        />
      )}
      {isPhraseData(data) && (
        <Phrase
          {...data}
          ankiButtonInfo={ankiButtonInfoObject[__main__]![0]!} //按照设计必定存在值
          updateAnki={() => {
            return _updateAnki(transformPhraseData(data), __main__, 0);
          }}
        />
      )}
      {isSentenceData(data) && (
        <Sentence
          {...data}
          updateAnki={() => {
            return _updateAnki(data, __main__, 0);
          }}
          ankiButtonInfo={
            ankiButtonInfoObject[__main__]![0]! //按照设计必定存在值
          }
        />
      )}
    </>
  );
}

function useAnki(props: Omit<DisplayContainerProps, "data">) {
  const { postMessage } = useMessenger();
  const { ankiButtonInfoObject, setAnkiButtonInfoObject, loadingSet } = props;

  /**
   * 过滤处于某些状态的按钮
   */
  const disableState = useCallback(function (info: AnkiButtonInfo) {
    const { status } = info;
    if (status === Status.Loading) return true;
    if (status === Status.Success) return true;
    return false;
  }, []);

  const submit = useCallback(
    function (data: NoteData, key: string | typeof __main__, idx: number) {
      //先有相应的数据可以被用户看到，用户的操作才会触发该函数，因此可以断言非空。
      const ankiButtonInfo = ankiButtonInfoObject[key]![idx]!;
      const symbol = `${String(key)}+${idx}`;
      if (disableState(ankiButtonInfo)) return;
      setAnkiButtonInfoObject(function (ankiButtonInfoObject) {
        loadingSet.add(symbol);
        return produce(ankiButtonInfoObject, (draft) => {
          //先有相应的数据可以被用户看到，用户的操作才会触发该函数，因此可以断言非空。
          draft[key]![idx]!.status = Status.Loading;
          draft[key]![idx]!.message = "请等待...";
        });
      });
      //处理重置学习进度的逻辑
      const cardIds = ankiButtonInfo.cardIds;

      if (cardIds) {
        return postMessage(
          Command.RelearnNote,
          cardIds,
          function (ankiResponse) {
            const { status, message, data } = ankiResponse;
            setAnkiButtonInfoObject(function (ankiButtonInfoObject) {
              loadingSet.delete(symbol);
              return produce(ankiButtonInfoObject, (draft) => {
                draft[key]![idx]!.message = message;
                draft[key]![idx]!.cardIds = data || ankiButtonInfo.cardIds;
                draft[key]![idx]!.status = transformAnkiResponseStatus(status);
              });
            });
          }
        );
      }
      //添加卡片的逻辑
      postMessage(Command.AddNote, data, function (ankiResponse) {
        const { message, status, data } = ankiResponse;
        setAnkiButtonInfoObject(function (ankiButtonInfoObject) {
          loadingSet.delete(symbol);
          return produce(ankiButtonInfoObject, (draft) => {
            draft[key]![idx]!.message = message;
            draft[key]![idx]!.cardIds = data || ankiButtonInfo.cardIds;
            draft[key]![idx]!.status = transformAnkiResponseStatus(status);
          });
        });
      });
    },
    [
      loadingSet,
      postMessage,
      disableState,
      ankiButtonInfoObject,
      setAnkiButtonInfoObject,
    ]
  );
  return submit;
}
