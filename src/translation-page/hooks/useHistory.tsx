import React, {
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
  useRef,
} from "react";
import {
  isWordData,
  isPhraseData,
  isSentenceData,
  TranslationResult,
} from "@/dictionary";
import { Command } from "@/configuration";
import { History, __main__ } from "../utils";
import { useMessenger } from "../components/Context";
import { AnkiButtonInfoObject, Status } from "../types";

interface HistoryType {
  scrollTop: number;
  data: TranslationResult;
  ankiButtonInfoObject: AnkiButtonInfoObject;
}

interface HistoryRef {
  scrollTop: number;
  history: History<HistoryType>;
  data: TranslationResult | undefined;
  ankiButtonInfoObject: AnkiButtonInfoObject;
  dataCallback?: () => void;
}

interface HistoryParams {
  data: TranslationResult | undefined;
  loadedSubscribe: (callback: () => void) => void;
  setData: React.Dispatch<React.SetStateAction<TranslationResult | undefined>>;
}
/**
 * 该部分主要封装的是历史记录相关功能的逻辑
 */
export function useHistory(params: HistoryParams) {
  const { data, setData, loadedSubscribe } = params;
  const { onMessage, postMessage } = useMessenger();
  const [ankiButtonInfoObject, setAnkiButtonInfoObject] =
    useState<AnkiButtonInfoObject>({
      //在使用前会进行赋值
      [__main__]: null!,
    });

  //实现引用数据
  const historyRef = useRef<HistoryRef>({
    data,
    scrollTop: 0,
    ankiButtonInfoObject,
    history: new History(10),
  });
  //刷新引用
  historyRef.current.data = data;
  historyRef.current.ankiButtonInfoObject = ankiButtonInfoObject;

  /**
   * 更新当前历史条目的信息
   */
  const updateHistory = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop;
    const { history, data, ankiButtonInfoObject } = historyRef.current;
    const result = history.update({
      data: data!, //触发该函数时,不为 undefined
      scrollTop,
      ankiButtonInfoObject,
    });
    return result;
  }, []);

  /**
   * 渲染提供的历史条目
   */
  const renderHistory = useCallback((history: HistoryType) => {
    const { scrollTop, ankiButtonInfoObject, data } = history;
    historyRef.current.scrollTop = scrollTop;
    setData(data);
    setAnkiButtonInfoObject(ankiButtonInfoObject);
  }, []);

  /**
   * 展示前一个历史翻译
   */
  const forwardHistory = useCallback(() => {
    updateHistory();
    const history = historyRef.current.history.next();
    if (history) renderHistory(history);
  }, [updateHistory, renderHistory]);

  /**
   * 展示后一个历史翻译
   */
  const backwardHistory = useCallback(() => {
    updateHistory();
    const history = historyRef.current.history.prev();
    if (history) renderHistory(history);
  }, [updateHistory, renderHistory]);

  /**
   * 创建新的历史记录
   */
  const createHistory = useCallback((data: TranslationResult) => {
    const ankiButtonInfoObject: AnkiButtonInfoObject = { [__main__]: [] };
    //if (data.type === "ERROR") {}
    if (isPhraseData(data) || isSentenceData(data)) {
      ankiButtonInfoObject[__main__]!.push({
        status: Status.Add,
        message: "添加到Anki",
      });
    }
    if (isWordData(data)) {
      data.translationList?.forEach(() => {
        ankiButtonInfoObject[__main__]!.push({
          status: Status.Add,
          message: "添加到Anki",
        });
      });
      //有多少个独立的翻译短语，就有多少个添加按钮
      if (data.translations) {
        Object.entries(data.translations).forEach(([key, value]) => {
          ankiButtonInfoObject[key] = value.map(() => {
            return {
              status: Status.Add,
              message: "添加到Anki",
            };
          });
        });
      }
    }

    return {
      data,
      scrollTop: 0,
      ankiButtonInfoObject,
    };
  }, []);
  /**
   * 在历史堆栈变动时，将变动信息发送到内容脚本
   */
  useEffect(
    function () {
      return historyRef.current.history.subscribe((index, head, tail) => {
        postMessage(Command.HistoryIndex, {
          index,
          head,
          tail,
        });
      });
    },
    [postMessage]
  );
  /**
   * 监听返回上一个历史条目的指令
   */
  useEffect(
    function () {
      return onMessage(Command.BackHistory, function () {
        loadedSubscribe(backwardHistory);
      });
    },
    [onMessage, loadedSubscribe]
  );
  /**
   * 监听进入下一个历史条目的指令
   */
  useEffect(
    function () {
      return onMessage(Command.ForwardHistory, function () {
        loadedSubscribe(forwardHistory);
      });
    },
    [loadedSubscribe, onMessage]
  );

  /**
   * 当data更新，则复位滚动条位置
   */
  useLayoutEffect(
    function () {
      window.scrollTo({
        top: historyRef.current.scrollTop,
      });
    },
    [data]
  );

  return {
    updateHistory,
    createHistory,
    renderHistory,
    ankiButtonInfoObject,
    setAnkiButtonInfoObject,
    history: historyRef.current.history,
  };
}
