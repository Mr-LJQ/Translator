/**
 * 实现以下功能的模块
 *  - 历史记录功能
 *  - 监听内容脚本渲染翻译的指令
 */
import React, {
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { Command } from "@/configuration";
import { useMessenger } from "../hooks";
import { History, __main__ } from "../utils";
import { AnkiButtonInfoObject, Status, DisplayContainerProps } from "../types";
import {
  isWordData,
  isErrorData,
  isPhraseData,
  isSentenceData,
  TranslationResult,
} from "@/dictionary";
import { Loading } from "./Loading";

interface StateRef {
  scrollTop: number;
  forward: () => void;
  ////在使用前会进行赋值
  backward: () => void;
  ////在使用前会进行赋值
  showTranslation: (nextData: TranslationResult, callback: () => void) => void;
  ////在使用前会进行赋值
  history: History<HistoryType>;
  dataCallback?: () => void;
  loadedCallback?: () => void;
}

interface HistoryType {
  data: TranslationResult;
  scrollTop: number;
  ankiButtonInfoObject: AnkiButtonInfoObject;
}

export function HistoryContainer(props: {
  children: (props: DisplayContainerProps) => void;
}) {
  const { children } = props;

  //获取必要上下文
  const { postMessage, onMessage } = useMessenger();

  //相关状态
  const [data, setData] = useState<TranslationResult | undefined>();
  const [ankiButtonInfoObject, setAnkiButtonInfoObject] =
    useState<AnkiButtonInfoObject>({
      //在使用前会进行赋值
      [__main__]: null!,
    });

  const [isLoading, setIsLoading] = useState(false);

  //记录处于 loading 状态的集合
  const loadingSet: Set<string> = useMemo(() => {
    return new Set();
  }, []);

  //实现引用数据
  const stateRef = useRef<StateRef>({
    scrollTop: 0,
    ////在使用前会进行赋值
    forward: null!,
    ////在使用前会进行赋值
    backward: null!,
    ////在使用前会进行赋值
    showTranslation: null!,
    history: new History(10),
  });

  /**
   * 更新当前历史条目的信息
   */

  const updateHistory = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop;
    const result = stateRef.current.history.update({
      data: data!, //进入该函数时 data不为 undefined
      scrollTop,
      ankiButtonInfoObject,
    });
    return result;
  }, [data, ankiButtonInfoObject]);

  /**
   * 渲染提供的历史条目
   */
  const renderHistory = useCallback(
    (history: HistoryType, callback?: () => void) => {
      const { scrollTop, ankiButtonInfoObject, data } = history;
      stateRef.current.scrollTop = scrollTop;
      //data更新完成后，执行回调函数
      stateRef.current.dataCallback = callback;
      setData(data);
      setAnkiButtonInfoObject(ankiButtonInfoObject);
    },
    []
  );

  /**
   * 展示前一个历史翻译
   */
  stateRef.current.forward = useCallback(() => {
    updateHistory();
    const history = stateRef.current.history.next();
    if (history) renderHistory(history);
  }, [updateHistory, renderHistory]);

  /**
   * 展示后一个历史翻译
   */
  stateRef.current.backward = useCallback(() => {
    updateHistory();
    const history = stateRef.current.history.prev();
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
   * 展示翻译数据
   */
  stateRef.current.showTranslation = useCallback(
    (nextData, callback) => {
      const newHistory = createHistory(nextData);

      if (!data) {
        //最开始的时候，data是undefined
        stateRef.current.history.append(newHistory);
      } else if (isErrorData(data) && !data.cache) {
        //如果当前展示的是错误信息且不缓存，则用新data覆盖
        stateRef.current.history.update(newHistory);
      } else {
        updateHistory(); //缓存当前的
        stateRef.current.history.append(newHistory); //将新信息压入历史栈
      }

      return renderHistory(newHistory, callback);
    },
    [data, updateHistory, createHistory, renderHistory]
  );
  /**
   * 在历史堆栈变动时，将变动信息发送到内容脚本
   */
  useEffect(
    function () {
      return stateRef.current.history.subscribe((index, head, tail) => {
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
   * 封装了一些可以复用的逻辑
   */
  const displayCallback = useCallback(
    (callback: () => void) => {
      const _fn = function _fn() {
        setIsLoading(false);
        callback();
      };

      if (loadingSet.size) {
        setIsLoading(true);
        return (stateRef.current.loadedCallback = _fn);
      }

      _fn();
    },
    [loadingSet]
  );
  /**
   * 监听渲染新翻译的指令
   */

  useEffect(
    function () {
      return onMessage(Command.ShowTranslation, function (data, callback) {
        displayCallback(function () {
          stateRef.current.showTranslation(data, function () {
            callback();
          });
        });
      });
    },
    [onMessage, displayCallback]
  );
  /**
   * 监听返回上一个历史条目的指令
   */
  useEffect(
    function () {
      return onMessage(Command.BackHistory, function () {
        displayCallback(function () {
          stateRef.current.backward();
        });
      });
    },
    [onMessage, displayCallback]
  );
  /**
   * 监听进入下一个历史条目的指令
   */

  useEffect(
    function () {
      return onMessage(Command.ForwardHistory, function () {
        displayCallback(function () {
          stateRef.current.forward();
        });
      });
    },
    [displayCallback, onMessage]
  );
  /**
   * 当data更新，则复位滚动条位置
   */

  useLayoutEffect(
    function () {
      window.scrollTo({
        top: stateRef.current.scrollTop,
      });
    },
    [data]
  );

  /**
   * 用于实现对某些data改变后执行某个回调函数的功能
   */
  useEffect(
    function () {
      stateRef.current.dataCallback?.();
      stateRef.current.dataCallback = undefined;
    },
    [data]
  );
  /**
   * 所有loading执行完毕后调用的回调
   */

  useEffect(
    function () {
      if (!loadingSet.size) {
        stateRef.current.loadedCallback?.();
        stateRef.current.loadedCallback = undefined;
      }
    },
    [ankiButtonInfoObject, loadingSet]
  );

  return (
    <>
      {isLoading && <Loading className="fixed inset-0 z-50" />}
      {children({
        data,
        loadingSet,
        ankiButtonInfoObject,
        setAnkiButtonInfoObject,
      })}
    </>
  );
}
