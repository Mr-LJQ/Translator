import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";

import { MessengerContext, HiddenChinese } from "./context";

//组件
import { Word } from "./components/Word";
import { Error } from "./components/Error";
import { Phrase } from "./components/Phrase";
import { Sentence } from "./components/Sentence";

//工具
import { Command } from "../../utils/command";
import { assertion } from "../../utils/tools";

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//类型

import type {
  WordData,
  ErrorData,
  PhraseData,
  SentenceData,
  TranslationResult,
} from "../../backend-script/dictionary/index";

import type {
  WordFields,
  PhraseFields,
  SentenceFields,
} from "../../options/field";

export enum CardState {
  Loading = "...",
  Add = "➕",
  Success = "✔",
  Error = "✖",
  Disconnect = "✄",
  Relearn = "↻",
}

export interface CardsStatus {
  state: CardState;
  explanation: string;
  cardIds?: number[];
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//

interface HistoryType {
  scrollTop: number;
  translationsCardsStatus: CardsStatus[][];
  cardsStatusList: CardsStatus[];
  data?: TranslationResult;
}

interface StateRef {
  scrollTop: number;
  history: History<HistoryType>;
  dataCallback?: Function;
  loadedCallback?: Function;
  isLoading: Function;
  forward: Function;
  backward: Function;
  showTranslation: (nextData: TranslationResult, callback: () => void) => void;
}

export function View() {
  //获取必要上下文
  let { postMessage, onMessage } = useContext(MessengerContext);

  //相关状态
  let [data, setData] = useState<TranslationResult | undefined>();
  let [cardsStatusList, setCardsStatusList] = useState<CardsStatus[]>([]);
  let [hiddenChinese, setHiddenChinese] = useState<Boolean>(false);
  let [translationsCardsStatus, setTranslationsCardsStatus] = useState<
    CardsStatus[][]
  >([]);

  //实现引用数据
  let stateRef = useRef<StateRef>({
    scrollTop: 0,
    history: new History<HistoryType>(10),
    forward: null!,
    backward: null!,
    isLoading: null!,
    showTranslation: null!,
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //向Anki发送更新相关内容的方法

  //使CardStateButton丧失按钮功能
  let disableState = useCallback((cardsStatus: CardsStatus) => {
    const { state } = cardsStatus;
    if (state === CardState.Loading) return true;
    if (state === CardState.Success) return true;
    return false;
  }, []);

  //核心逻辑
  let updateAnki = useCallback(
    (data: NoteData, index: number, num?: number) => {
      const cardsStatus =
        num == null
          ? cardsStatusList[index]
          : translationsCardsStatus[index][num];
      if (disableState(cardsStatus)) return;
      num == null
        ? setCardsStatusList((cardsStatusList) => {
            const cardsStatus = cardsStatusList[index];
            //注意：这是新的
            cardsStatusList = cardsStatusList.slice();
            cardsStatusList[index] = {
              ...cardsStatus, //避免覆盖cardIds
              state: CardState.Loading,
              explanation: "请等待...",
            };
            return cardsStatusList;
          })
        : setTranslationsCardsStatus((translationsCardsStatus) => {
            const cardsStatus = translationsCardsStatus[index][num];
            translationsCardsStatus = translationsCardsStatus.slice();
            translationsCardsStatus[index] =
              translationsCardsStatus[index].slice();
            translationsCardsStatus[index][num] = {
              ...cardsStatus,
              state: CardState.Loading,
              explanation: "请等待...",
            };
            return translationsCardsStatus;
          });
      //["➕", "✔", "✖","✄", "↻", ]
      //处理重置学习进度的逻辑
      const { cardIds } = cardsStatus;
      if (cardIds) {
        return postMessage(Command.RelearnNote, cardIds, (newCardsStatus) => {
          num == null
            ? setCardsStatusList((cardsStatusList) => {
                const cardsStatus = cardsStatusList[index];
                //注意：这是新的
                cardsStatusList = cardsStatusList.slice();
                cardsStatusList[index] = {
                  ...cardsStatus, //避免覆盖cardIds
                  ...newCardsStatus,
                };
                return cardsStatusList;
              })
            : setTranslationsCardsStatus((translationsCardsStatus) => {
                const cardsStatus = translationsCardsStatus[index][num];
                translationsCardsStatus = translationsCardsStatus.slice();
                translationsCardsStatus[index] =
                  translationsCardsStatus[index].slice();
                translationsCardsStatus[index][num] = {
                  ...cardsStatus,
                  ...newCardsStatus,
                };
                return translationsCardsStatus;
              });
        });
      }
      //添加卡片的逻辑
      postMessage(Command.AddNote, data, (newCardsStatus: CardsStatus) => {
        num == null
          ? setCardsStatusList((cardsStatusList) => {
              //注意：这是新的
              cardsStatusList = cardsStatusList.slice();
              cardsStatusList[index] = newCardsStatus;
              return cardsStatusList;
            })
          : setTranslationsCardsStatus((translationsCardsStatus) => {
              translationsCardsStatus = translationsCardsStatus.slice();
              translationsCardsStatus[index] =
                translationsCardsStatus[index].slice();
              translationsCardsStatus[index][num] = newCardsStatus;
              return translationsCardsStatus;
            });
      });
    },
    [cardsStatusList, translationsCardsStatus, postMessage, disableState]
  );

  let updateAnkiWord = useCallback(
    (index: number) => {
      if (!data || !("word" in data)) return;
      const wordData = transformWordData(data, index);
      if (!wordData) return;
      updateAnki(wordData, index + 1);
    },
    [data, updateAnki]
  );

  let updateAnkiTranslations = useCallback(
    (idx: number, num: number) => {
      if (!data || !("word" in data)) return;
      updateAnki(transformTranslations(data, idx, num), idx, num);
    },
    [data, updateAnki]
  );

  let updateAnkiPhrase = useCallback(() => {
    if (data && "phrase" in data) updateAnki(transformPhraseData(data), 0);
  }, [data, updateAnki]);

  let updateAnkiSentence = useCallback(() => {
    if (data && "sentence" in data) updateAnki(data, 0);
  }, [data, updateAnki]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //实现历史记录功能的方法

  //检测是否存在loading状态
  stateRef.current.isLoading = useCallback(() => {
    return (
      cardsStatusList.some(({ state }) => state === CardState.Loading) ||
      translationsCardsStatus.some((item) => {
        return item.some(({ state }) => state === CardState.Loading);
      })
    );
  }, [cardsStatusList, translationsCardsStatus]);

  //更新当前历史条目的信息
  let updateHistory = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop;
    return stateRef.current.history.update({
      data,
      scrollTop,
      cardsStatusList,
      translationsCardsStatus,
    });
  }, [cardsStatusList, data, translationsCardsStatus]);
  //渲染提供的历史条目
  let renderHistory = useCallback(
    (history: HistoryType, callback?: () => void) => {
      const { scrollTop, cardsStatusList, data, translationsCardsStatus } =
        history;
      stateRef.current.scrollTop = scrollTop;
      //这个data更新，执行回调函数
      stateRef.current.dataCallback = callback;
      setTranslationsCardsStatus(translationsCardsStatus);
      setData(data);
      setCardsStatusList(cardsStatusList);
    },
    []
  );
  
  stateRef.current.forward = useCallback(() => {
    updateHistory();
    const history = stateRef.current.history.next();
    if (history) renderHistory(history);
  }, [updateHistory, renderHistory]);

  stateRef.current.backward = useCallback(() => {
    updateHistory();
    const history = stateRef.current.history.prev();
    if (history) renderHistory(history);
  }, [updateHistory, renderHistory]);

  let createHistory = useCallback((data: TranslationResult) => {
    //初始化设置
    let cardsStatusList: CardsStatus[] = [
      { state: CardState.Add, explanation: "添加到Anki" },
    ];
    let translationsCardsStatus: CardsStatus[][] = [];
    if ("word" in data) {
      //有多少个独立的翻译短语，就有多少个添加按钮
      const cardsStatusArray: CardsStatus[] =
        data.translationList?.map(() => {
          return { state: CardState.Add, explanation: "添加到Anki" };
        }) || [];
      cardsStatusList.push(...cardsStatusArray);
      translationsCardsStatus = formatTranslations(
        data.translations || []
      )[0].map((item) => {
        return item.map(() => {
          return { state: CardState.Add, explanation: "添加到Anki" };
        });
      });
    }
    return {
      data,
      cardsStatusList,
      translationsCardsStatus,
      scrollTop: 0,
    };
  }, []);

  stateRef.current.showTranslation = useCallback(
    (nextData: TranslationResult, callback: () => void) => {
      let history = createHistory(nextData);

      if (!data) {
        //最开始的时候，data是undefined
        stateRef.current.history.append(history);
      } else if ("errorMessage" in data && !data.cache) {
        //如果当前展示的是错误信息且不缓存，则用新data覆盖
        stateRef.current.history.update(history);
      } else {
        updateHistory(); //缓存当前的
        stateRef.current.history.append(history); //将新信息压入历史栈
      }

      return renderHistory(history, callback);
    },
    [data, updateHistory, createHistory, renderHistory]
  );

  //监听传递过来的指令

  useEffect(() => {
    return stateRef.current.history.subscribe((index, head, tail) => {
      postMessage(Command.HistoryIndex, { index, head, tail });
    });
  }, [postMessage]);

  //监听显示/隐藏中文翻译的指令
  useEffect(() => {
    return onMessage(Command.HiddenChinese, (hidden) => {
      setHiddenChinese(hidden);
    });
  }, [onMessage]);

  //监听渲染新翻译的指令
  useEffect(() => {
    return onMessage(Command.ShowTranslation, (data, callback) => {
      document.documentElement.style.cssText = `
        opacity:0.6;
      `;
      let fn = () => {
        stateRef.current.showTranslation(data, () => {
          document.documentElement.style.cssText = "";
          callback();
        });
      };
      if (stateRef.current.isLoading())
        return (stateRef.current.loadedCallback = fn);
      fn();
    });
  }, [onMessage]);

  //监听返回前一个历史条目的指令
  useEffect(() => {
    return onMessage(Command.BackHistory, () => {
      document.documentElement.style.cssText = `
        opacity:0.6;
      `;
      let fn = () => {
        document.documentElement.style.cssText = "";
        //因为是在回调函数内，而backward依赖于其它属性
        //所以需要用引用写法，以在其依赖改变后，逻辑是正确的
        //如果使用闭包写法，则其不能够在依赖更新后，获取正确的函数
        stateRef.current.backward();
      };
      if (stateRef.current.isLoading())
        return (stateRef.current.loadedCallback = fn);
      fn();
    });
  }, [onMessage]);

  useEffect(() => {
    return onMessage(Command.ForwardHistory, () => {
      document.documentElement.style.cssText = `
        opacity:0.6;
      `;
      let fn = () => {
        document.documentElement.style.cssText = "";
        stateRef.current.forward();
      };
      if (stateRef.current.isLoading())
        return (stateRef.current.loadedCallback = fn);
      fn();
    });
  }, [onMessage]);

  //当data更新，则复位滚动条位置
  useEffect(() => {
    window.scrollTo({ top: stateRef.current.scrollTop });
  }, [data]);

  //用于实现对某些data改变后执行某个回调函数的功能
  useEffect(() => {
    stateRef.current.dataCallback?.();
    stateRef.current.dataCallback = undefined;
  }, [data]);

  useEffect(() => {
    if (!stateRef.current.isLoading()) {
      stateRef.current.loadedCallback?.();
      stateRef.current.loadedCallback = undefined;
    }
  }, [cardsStatusList, translationsCardsStatus]);

  //初始阶段data为空
  if (!data)
    return (
      <p className="bg-green-150 fixed flex inset-2 justify-center pt-20 text-2xl text-center">
        翻译记录为空，尚未进行任何翻译
      </p>
    );
  return (
    <>
      {assertion<ErrorData>("errorMessage" in data, data) && (
        <Error {...data}></Error>
      )}
      {assertion<WordData>("word" in data, data) && (
        <HiddenChinese.Provider value={hiddenChinese}>
          <Word
            {...data}
            updateAnki={updateAnkiWord}
            updateAnkiTranslations={updateAnkiTranslations}
            translationsCardsStatus={translationsCardsStatus}
            cardsStatusList={cardsStatusList.slice(1)}
          ></Word>
        </HiddenChinese.Provider>
      )}
      {assertion<PhraseData>("phrase" in data, data) && (
        <Phrase
          {...data}
          updateAnki={updateAnkiPhrase}
          cardsStatus={cardsStatusList[0]}
        ></Phrase>
      )}
      {assertion<SentenceData>("sentence" in data, data) && (
        <Sentence
          {...data}
          updateAnki={updateAnkiSentence}
          cardsStatus={cardsStatusList[0]}
        ></Sentence>
      )}
    </>
  );
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//工具函数，用于转换格式

export type NoteData = WordFields | PhraseFields | SentenceFields;

/**
 * 纯函数，用于处理数据，适配器模式
 * @param wordData WordData
 * @param index number
 * @returns NoteWordData
 */
function transformWordData(wordData: WordData, index: number): WordFields {
  const { star_amount, translationList, phonetic, word } = wordData;
  const { am, en, am_audio, en_audio } = phonetic;
  const {
    part_of_speech,
    translation,
    definition,
    definition_audio,
    example_sentences,
  } = translationList![index];
  let example_audio, example_sentence, example_sentence_translation;
  if (example_sentences) {
    example_audio = example_sentences[0].example_audio;
    example_sentence = example_sentences[0].example_sentence;
    example_sentence_translation =
      example_sentences[0].example_sentence_translation;
  }
  const noteWordData: WordFields = {
    word,
    star_amount: "★".repeat(star_amount),
    am,
    en,
    am_audio,
    en_audio,
    part_of_speech,
    translation,
    definition,
    definition_audio,
    example_sentence,
    example_sentence_translation,
    example_audio,
  };
  return noteWordData;
}

/**
 * 纯函数，用于处理那些没有定义的单词
 */
function transformTranslations(
  wordData: WordData,
  idx: number,
  num: number
): WordFields {
  const { star_amount, phonetic, word, translations } = wordData;
  const { am, en, am_audio, en_audio } = phonetic;
  const [formated, partOfSpeechList] = formatTranslations(translations || []);

  const noteWordData: WordFields = {
    word,
    star_amount: "★".repeat(star_amount),
    part_of_speech: partOfSpeechList[idx],
    translation: formated[idx][num],
    am,
    en,
    am_audio,
    en_audio,
  };
  return noteWordData;
}

/**
 * 纯函数，格式化translations的结构
 * 其作用是修改添加到Anki中的translations的数据结构，以在Anki上更好的表达。
 * @param translations
 * @returns
 */
function formatTranslations(translations: string[]): [string[][], string[]] {
  let partOfSpeechList: string[] = [];
  let formated = translations.map((item, index) => {
    let point = item.indexOf(".") + 1;
    let part_of_speech = point === -1 ? "" : item.slice(0, point);
    partOfSpeechList[index] = part_of_speech;
    return item.slice(point).split("；");
  });
  return [formated, partOfSpeechList];
}

/**
 * 纯函数，将PhraseData格式转换为NotePhraseData格式
 * @param data PhraseData
 * @returns NotePhraseData
 */
function transformPhraseData(data: PhraseData): PhraseFields {
  const { phrase, phrase_audio, translations, example_sentences } = data;
  const notePhraseData: PhraseFields = {
    phrase,
    phrase_audio,
    translations: translations.join(" ; "),
    example_sentence_1: example_sentences?.[0].example_sentence,
    example_sentence_translation_1:
      example_sentences?.[0].example_sentence_translation,
    example_audio_1: example_sentences?.[0].example_audio,
    example_sentence_2: example_sentences?.[1].example_sentence,
    example_sentence_translation_2:
      example_sentences?.[1].example_sentence_translation,
    example_audio_2: example_sentences?.[1].example_audio,
    example_sentence_3: example_sentences?.[2].example_sentence,
    example_sentence_translation_3:
      example_sentences?.[2].example_sentence_translation,
    example_audio_3: example_sentences?.[2].example_audio,
  };
  return notePhraseData;
}

/**
 * prev：获取当前指针的上一个历史，并将指针移动到目标位置
 * next：获取当前指针的下一个历史，并将指针移动到目标位置
 * update：更新当前指针的历史，指针不动
 * append:添加一个新历史到下一个指针位置，并将指针移动到目标位置
 */
class History<T> {
  private tail: number;
  private head: number;
  private index: number;
  private cacheArray: T[];
  private maxAmount: number;
  private subscribes: Array<
    (index: number, head: number, tail: number) => void
  >;
  constructor(maxAmount = 10) {
    this.cacheArray = [];
    this.head = 0;
    this.tail = -1;
    this.index = -1;
    this.maxAmount = maxAmount;
    this.subscribes = [];
  }
  prev() {
    const { head, index, maxAmount } = this;
    if (index <= head) return;
    this.index--;
    this.subscribes.forEach((fn) => fn(this.index, this.head, this.tail));
    return this.cacheArray[this.index % maxAmount];
  }
  next() {
    const { tail, index, maxAmount } = this;
    if (index >= tail) return;
    this.index++;
    this.subscribes.forEach((fn) => fn(this.index, this.head, this.tail));
    return this.cacheArray[this.index % maxAmount];
  }
  append(value: T) {
    this.index++;
    const { cacheArray, maxAmount, index, head } = this;
    this.tail = index;
    this.head = Math.max(index + 1 - maxAmount, head);
    this.subscribes.forEach((fn) => fn(this.index, this.head, this.tail));
    cacheArray[index % maxAmount] = value;
    return value;
  }
  update(value: T) {
    const { index, maxAmount, cacheArray } = this;
    cacheArray[index % maxAmount] = value;
    return value;
  }
  subscribe(callback: (index: number, head: number, tail: number) => void) {
    this.subscribes.push(callback);
    return () => {
      this.subscribes.filter((fn) => {
        return fn !== callback;
      });
    };
  }
}
