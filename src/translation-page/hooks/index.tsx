import { useState, useCallback, useEffect, useRef } from "react";
import { isErrorData, TranslationResult } from "@/dictionary";
import { Command } from "@/configuration";
import { useMessenger, useAudio } from "../components/Context";
import { useAnki } from "./useAnki";
import { useHistory } from "./useHistory";
import { useLoadedObserver } from "./useLoadedObserver";
import { createHistory } from "../utils";

/**
 * 将 useHistory、useAnki、useLoadedObserver提供的功能结合起来
 */
export function useFeature() {
  const { onMessage } = useMessenger();
  const audioElement = useAudio();
  const [data, setData] = useState<TranslationResult | undefined>();
  //创建一个data的引用，以及时获取最新的 data
  const dateRef = useRef(data);
  dateRef.current = data;

  //处理loading逻辑的相关数据
  const {
    isLoading,
    dispatch,
    loadingSet,
    subscribe: loadedSubscribe,
  } = useLoadedObserver();

  //用于模拟 class 模式中的 setState(state,callback)模式
  const showTranslationCallbackRef = useRef<() => void>();

  const {
    history,
    ankiButtonInfoObject,
    updateHistory,
    renderHistory,
    setAnkiButtonInfoObject,
  } = useHistory({
    data,
    setData,
    loadedSubscribe,
  });

  const updateAnki = useAnki({
    loadingSet,
    ankiButtonInfoObject,
    setAnkiButtonInfoObject,
  });

  /**
   * 展示翻译数据
   */
  const showTranslation = useCallback(
    (nextData: TranslationResult, callback: () => void) => {
      const newHistory = createHistory(nextData);
      const data = dateRef.current;
      if (!data) {
        //最开始的时候，data是undefined
        history.append(newHistory);
      } else if (isErrorData(data) && !data.cache) {
        //如果当前展示的是错误信息且不缓存，则用新data覆盖
        history.update(newHistory);
      } else {
        updateHistory(); //缓存当前的
        history.append(newHistory); //将新信息压入历史栈
      }
      showTranslationCallbackRef.current = callback;
      return renderHistory(newHistory);
    },
    [updateHistory, renderHistory, history]
  );

  /**
   * 监听渲染新翻译的指令
   */
  useEffect(
    function () {
      return onMessage(Command.ShowTranslation, function (data, callback) {
        loadedSubscribe(function () {
          showTranslation(data, callback);
        });
      });
    },
    [onMessage, loadedSubscribe, showTranslation]
  );

  /**
   * 所有loading处理完毕后调用的回调
   * 这意味着 loading 状态与 ankiButtonInfoObject 有关
   */
  useEffect(
    function () {
      if (!loadingSet.size) {
        dispatch();
      }
    },
    [ankiButtonInfoObject, loadingSet, dispatch]
  );

  useEffect(
    function () {
      showTranslationCallbackRef.current?.();
      showTranslationCallbackRef.current = undefined;
      audioElement.pause();
    },
    [data, audioElement]
  );
  return {
    data,
    isLoading,
    ankiButtonInfoObject,
    updateAnki,
  };
}
