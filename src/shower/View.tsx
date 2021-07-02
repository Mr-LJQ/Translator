import React from "react";

import Nav from "./components/Nav";
import WordCard from "./WordCard/index";
import PhraseCard from "./PhraseCard/index";
import SentenceCard from "./SentenceCard/index";
import AudioContext from "./Context/AudioContext";

import { getNoteWordData_Top, getNoteWordData } from "./utils/index";
import { Agent, PostMessage, loopJudgment, History } from "../utils/index";
import { SelectionWatcher } from "../watcher/SelectionWatcher";

import {
  Status,
  NoteData,
  AnkiResponse,
  AddButtonState,
  TranslationResult,
} from "../../types/index";

interface State {
  data?: TranslationResult; //初始时没有数据
  addButtonStates: AddButtonState[];
}

interface HistoryCache extends State {
  scrollTop: number;
}

class View extends React.Component<{}, State> {
  agent?: Agent;
  audio: HTMLAudioElement;
  postMessage?: PostMessage;
  selectionWatcher?: SelectionWatcher;

  state: State = {
    addButtonStates: [{ status: 0, statusText: "添加到Anki" }],
  };
  scrollTop = 0;
  history = new History<HistoryCache>(10);

  constructor(props: object) {
    super(props);
    this.audio = document.createElement("audio");
    this.addWordNote = this.addWordNote.bind(this);
    this.addPhraseNote = this.addPhraseNote.bind(this);
    this.addSentenceNote = this.addSentenceNote.bind(this);
    this.addWordNote_Top = this.addWordNote_Top.bind(this);
    this.forward = this.forward.bind(this)
    this.backward = this.backward.bind(this)
  }

  render() {
    const { data, addButtonStates } = this.state;
    const { addWordNote, addWordNote_Top, addPhraseNote, addSentenceNote } =
      this;
    let component;
    if (!data) return <></>;
    if ("error" in data) return <p>{data.error}</p>;
    if ("word" in data) {
      component = (
        <WordCard
          addButtonState={addButtonStates[0]}
          addButtonStates={addButtonStates.slice(1)}
          {...data}
          addNote={addWordNote}
          addNote_Top={addWordNote_Top}
        />
      );
    }
    if ("phrase" in data) {
      component = (
        <PhraseCard
          addNote={addPhraseNote}
          addButtonState={addButtonStates[0]}
          {...data}
        />
      );
    }
    if ("sentence" in data) {
      component = (
        <SentenceCard
          {...data}
          addNote={addSentenceNote}
          addButtonState={addButtonStates[0]}
        />
      );
    }

    return (
      <>
        <AudioContext.Provider value={this.audio}>
          {component}
        </AudioContext.Provider>
        <Nav forward={this.forward} backward={this.backward}></Nav>
      </>
    );
  }

  componentDidMount() {
    this.agent = new Agent({
      self: window,
      handler: (message: any, sendResponse: (data?: any) => void) => {
        const { command, data } = message;
        switch (command) {
          case "showTranslation":
            sendResponse();
            document.documentElement.style.cssText = `
              opacity:0.6;
            `;
            this.delayed(() => {
              this.showTranslation(data, () => {
                document.documentElement.style.cssText = "";
              });
            });
            break;
          case "pauseAudio":
            this.pauseAudio();
            break;
          default:
            throw new Error("存在未处理的指令:" + command);
        }
      },
    });
    this.postMessage = this.agent.postMessage;

    //可以通过选中iframe内部单词来再次查询翻译
    this.selectionWatcher = new SelectionWatcher((text: string) => {
      this?.postMessage?.("showTranslated", text);
    });
    this.agent.onMessage();
    this.selectionWatcher.install();
  }
  componentWillUnmount() {
    this?.agent?.offMessage();
    this?.selectionWatcher?.uninstall();
  }
  componentDidUpdate(prevProps: object, prevState: State) {
    //只有在数据更新时，修正滚动条位置
    const { data } = this.state;
    const { data: _data } = prevState;
    if (_data !== data) {
      document.documentElement.scrollTop = this.scrollTop;
    }
  }

  forward() {
    if (this.hasAwait()) return;
    if (this.whetherUpdateHistory()) this.updateHistory();
    const history = this.history.next();
    if (history) this.renderHistory(history);
  }
  backward() {
    if (this.hasAwait()) return;
    if (this.whetherUpdateHistory()) this.updateHistory();
    const history = this.history.prev();
    if (history) this.renderHistory(history);
  }
  whetherUpdateHistory() {
    const { data } = this.state;
    if (!data) return false
    return true;
  }
  updateHistory() {
    const scrollTop = document.documentElement.scrollTop;
    return this.history.update({
      scrollTop,
      ...this.state,
    });
  }
  renderHistory(history: HistoryCache, callback?: () => void) {
    const { scrollTop, ...state } = history;
    this.scrollTop = scrollTop;
    this.setState(state, callback);
  }

  /**
   * 无副作用的函数，通过status判断是否存在异步操作处于 ... 状态之中
   */
  hasAwait() {
    const { addButtonStates,data} = this.state;
    if (!data) return false;
    return addButtonStates?.some(({ status }) => status === -1);
  }

  delayed(callback: (...args: any[]) => void) {
    loopJudgment({
      predicate: (count) => {
        let hasAwait = this.hasAwait();
        if (count > 50) return true;
        return !hasAwait;
      },
      callback,
      time: 1000,
      firstRun: true,
    });
  }

  pauseAudio() {
    try {
      this.audio.pause();
    }catch {}
  }
  disableState(buttonState: AddButtonState) {
    const { status } = buttonState;
    const { loading, success } = Status;
    if (status === loading) return true;
    if (status === success) return true;
    return false;
  }
  addNote(data: NoteData, index: number) {
    const { addButtonStates } = this.state;
    const buttonState = addButtonStates[index];
    if (this.disableState(buttonState)) return;
    this.setState((state) => {
      let { addButtonStates } = state;
      const buttonState = addButtonStates[index];
      addButtonStates = addButtonStates.slice();
      addButtonStates[index] = {
        ...buttonState, //避免覆盖cardIds
        status: -1,
        statusText: "请等待...",
      };
      return { addButtonStates };
    });
    //["➕", "✔", "✖","✄", "↻", ]
    //处理重置学习进度的逻辑
    const { cardIds } = buttonState;
    if (cardIds) {
      return this?.postMessage?.(
        "relearnNote",
        cardIds,
        (data: AnkiResponse) => {
          this.setState((state) => {
            let { addButtonStates } = state;
            const buttonState = addButtonStates[index];
            addButtonStates = addButtonStates.slice();
            addButtonStates[index] = {
              ...buttonState, //避免覆盖cardIds
              ...data,
            };
            return { addButtonStates };
          });
        }
      );
    }
    //添加卡片的逻辑
    this?.postMessage?.("addNote", data, (data: AnkiResponse) => {
      this.setState((state) => {
        let { addButtonStates } = state;
        addButtonStates = addButtonStates.slice();
        addButtonStates[index] = data;
        return { addButtonStates };
      });
    });
  }
  addPhraseNote() {
    const { data } = this.state;
    if (data && "phrase" in data) this.addNote(data, 0);
  }
  addSentenceNote() {
    const { data } = this.state;
    if (data && "sentence" in data) this.addNote(data, 0);
  }
  addWordNote_Top() {
    let { data } = this.state;
    if (!data || !("word" in data)) return;
    const wordData = getNoteWordData_Top(data);
    this.addNote(wordData, 0);
  }
  addWordNote(index: number) {
    let { data } = this.state;
    if (!data || !("word" in data)) return;
    const wordData = getNoteWordData(data, index);
    if (!wordData) return;
    this.addNote(wordData, index + 1);
  }
  /**
   * 添加新数据到 this.history 之中
   * @param data 翻译数据
   */
  appendHistory(data: TranslationResult) {
    //初始化设置
    let addButtonStates = [{ status: 0, statusText: "添加到Anki" }];
    if ("word" in data) {
      //有多少个独立的翻译短语，就有多少个添加按钮
      const buttonStates =
        data.translationUnits?.map(() => {
          return { status: 0, statusText: "添加到Anki" };
        }) || [];
      addButtonStates = addButtonStates.concat(buttonStates);
    }
    return this.history.append({
      data,
      addButtonStates,
      scrollTop: 0,
    });
  }

  showTranslation(data: TranslationResult, callback: () => void) {
    //更新当次展示状态到其 history 之中
    if (this.whetherUpdateHistory()) this.updateHistory();
    //如果是错误则直接展现
    const history = this.appendHistory(data);
    return this.renderHistory(history, callback);
  }
}

export default View;
