import React, { useCallback, useRef } from "react";
import { produce } from "immer";

import { Command } from "@/configuration";
import { useMessenger } from "../components/Context";
import { transformAnkiResponseStatus, __main__ } from "../utils";
import {
  Status,
  NoteData,
  AnkiButtonInfo,
  AnkiButtonInfoObject,
} from "../types";

interface AnkiParams {
  loadingSet: Set<string>;
  ankiButtonInfoObject: AnkiButtonInfoObject;
  setAnkiButtonInfoObject: React.Dispatch<
    React.SetStateAction<AnkiButtonInfoObject>
  >;
}

/**
 * 该部分主要封装的是与 Anki间的互操作逻辑
 */
export function useAnki(params: AnkiParams) {
  const { postMessage } = useMessenger();
  const { ankiButtonInfoObject, setAnkiButtonInfoObject, loadingSet } = params;
  const ankiButtonInfoObjectRef = useRef(ankiButtonInfoObject);
  ankiButtonInfoObjectRef.current = ankiButtonInfoObject;
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
      const ankiButtonInfoObject = ankiButtonInfoObjectRef.current
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
                //transformAnkiResponseStatus 保证不为undefined，有开发时的报错保护，以及相关单元测试进行保证
                draft[key]![idx]!.status = transformAnkiResponseStatus(status)!;
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
            //transformAnkiResponseStatus 保证不为undefined，有开发时的报错保护，以及相关单元测试进行保证
            draft[key]![idx]!.status = transformAnkiResponseStatus(status)!;
          });
        });
      });
    },
    [
      loadingSet,
      postMessage,
      disableState,
      setAnkiButtonInfoObject,
    ]
  );
  return submit;
}
