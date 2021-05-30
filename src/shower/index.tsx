import React from "react";
import ReactDOM from "react-dom";
import "./index.less";

import AudioContext from "./Context/AudioContext";

import WordCard from "./WordCard/index";
import PhraseCard from "./PhraseCard/index";
import SentenceCard from "./SentenceCard/index";

import { Agent, PostMessage, loopJudgment,History } from "../utils/index";
import { SelectionWatcher } from "../watcher/SelectionWatcher";

import {
  WordData,
  PhraseData,
  SentenceData,
  TranslationResult,
  NoteWordData,
  TranslationUnit,
  AddButtonState,
  AnkiResponse,
} from "../../types/index";

interface State {
  wordData?: WordData;
  phraseData?: PhraseData;
  sentenceData?: SentenceData;
  addWordState?: AddButtonState;
  addPhraseState?: AddButtonState;
  addSentenceState?: AddButtonState;
  addButtonStates?: AddButtonState[]; //word存在多个添加按钮
  error?: string;
  status: 0 | 1 | 2 | 3 | 4;
}

interface HistoryCache extends State {
  addWordNoteFlags: boolean[];
  addPhraseNoteFlag: boolean;
  addSentenceNoteFlag: boolean;
  addAllWordsNotesFlag: boolean;
  scrollTop: number;
}

class Shower extends React.Component<object, State> {
  agent: Agent;
  postMessage: PostMessage;
  audio: HTMLAudioElement;
  selectionWatcher: SelectionWatcher;

  state: State = {
    //0表示无内容渲染(初始状态)，1表示渲染错误，2表示渲染word ,3表示渲染词组，4表示渲染sentence
    status: 0,
  };

  history = new History<HistoryCache>(10);
  index = -1;
  scrollTop = 0;

  constructor(props: object) {
    super(props);

    this.audio = document.createElement("audio");

    this.pauseAudio = this.pauseAudio.bind(this);
    this.addWordNote = this.addWordNote.bind(this);
    this.addPhraseNote = this.addPhraseNote.bind(this);
    this.renderWordCard = this.renderWordCard.bind(this);
    this.addSentenceNote = this.addSentenceNote.bind(this);
    this.showTranslation = this.showTranslation.bind(this);
    this.addAllWordsNotes = this.addAllWordsNotes.bind(this);
    this.addWordNote_easy = this.addWordNote_easy.bind(this);

    this.go = this.go.bind(this);
    this.delayed = this.delayed.bind(this);
    this.forward = this.forward.bind(this);
    this.backward = this.backward.bind(this);
    this.hasAwait = this.hasAwait.bind(this);
    this.cacheHistory = this.cacheHistory.bind(this);
    this.updateHistory = this.updateHistory.bind(this);
    this.applyHistoryRender = this.applyHistoryRender.bind(this);
    this.whetherUpdateHistory = this.whetherUpdateHistory.bind(this);

    this.agent = new Agent({
      self: window,
      handler: (message: any, sendResponse: (data?: any) => void) => {
        const { command, data } = message;
        switch (command) {
          case "showTranslation":
            sendResponse()
            document.documentElement.style.cssText = `
              opacity:0.6;
            `
            this.delayed(() => {
              this.showTranslation(data,() => {
                document.documentElement.style.cssText = ""
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
      this.postMessage("showTranslated", text);
    });
  }

  render() {
    const {
      status,
      error,
      wordData,
      sentenceData,
      phraseData,
      addWordState,
      addPhraseState,
      addSentenceState,
      addButtonStates,
    } = this.state;
    return (
      <>
        {status && (
          <>
            <p className="showError" hidden={status !== 1}>
              {error}
            </p>
            <AudioContext.Provider value={this.audio}>
              {wordData && ( //无数据时不进行任何渲染
                <WordCard
                  {...wordData}
                  hidden={status !== 2} //避免缓存的数据结构显示,最大程度复用已有结构
                  addButtonState={addWordState as AddButtonState}
                  addNote={this.addWordNote}
                  addNote_easy = {this.addWordNote_easy}
                  addButtonStates={addButtonStates}
                  addAllNotes={this.addAllWordsNotes}
                />
              )}
              {phraseData && ( //无数据时不进行渲染
                <PhraseCard
                  {...phraseData}
                  hidden={status !== 3}
                  addNote={this.addPhraseNote}
                  addButtonState={addPhraseState}
                />
              )}
              {sentenceData && (
                <SentenceCard
                  {...sentenceData}
                  hidden={status !== 4}
                  addButtonState={addSentenceState}
                  addNote={this.addSentenceNote}
                />
              )}
            </AudioContext.Provider>
          </>
        )}
        <footer className="history_nav">
          <div className="history_bar">
            <button className="button left" onClick={this.backward}>
              {"<"}
            </button>
            <button className="button right" onClick={this.forward}>
              {">"}
            </button>
          </div>
        </footer>
      </>
    );
  }

  componentDidMount() {
    this.agent.onMessage();
    this.selectionWatcher.install();
  }
  componentWillUnmount() {
    this.agent.offMessage();
    this.selectionWatcher.uninstall();
  }

  componentDidUpdate(prevProps: object, prevState: State) {
    //只有在数据更新时，修正滚动条位置
    const { wordData, phraseData, sentenceData } = this.state;
    const {
      wordData: _wordData,
      phraseData: _phraseData,
      sentenceData: _sentenceData,
    } = prevState;
    if (
      wordData !== _wordData ||
      phraseData !== _phraseData ||
      sentenceData !== _sentenceData
    ) {
      document.documentElement.scrollTop = this.scrollTop;
    }
  }

  go(index: number) {
    if (this.hasAwait()) return;
    //到达边界
    if (index < this.history.head || index > this.history.tail) return;
    //更新history,仅当当前数据并非错误时，
    if (this.whetherUpdateHistory()) this.updateHistory();
    this.index = index;
    this.applyHistoryRender(this.index);
  }

  forward() {
    this.go(this.index + 1);
  }
  backward() {
    this.go(this.index - 1);
  }

  whetherUpdateHistory() {
    const { status } = this.state;
    if (status === 1) return false;
    if (status === 0) return false;
    if (this.index === -1) return false;
    return true;
  }

  /**
   * 更新当前的历史,两种情况更新1.向前后，2.新数据到来更新旧数据的变动
   */
  updateHistory() {
    const { addPhraseNoteFlag, addSentenceNoteFlag, addAllWordsNotesFlag } =
      this;
    const scrollTop = document.documentElement.scrollTop;
    const addWordNoteFlags = this.addWordNoteFlags.slice();
    this.history.set(this.index, {
      scrollTop,
      ...this.state,
      addWordNoteFlags,
      addPhraseNoteFlag,
      addSentenceNoteFlag,
      addAllWordsNotesFlag,
    });
  }

  applyHistoryRender(index: number, callback?: () => void) {
    const historyCache = this.history.get(index);
    if (!historyCache) return;
    const {
      addWordNoteFlags,
      addPhraseNoteFlag,
      addSentenceNoteFlag,
      addAllWordsNotesFlag,
      scrollTop,
      ...state
    } = historyCache;
    this.addWordNoteFlags = addWordNoteFlags;
    this.addPhraseNoteFlag = addPhraseNoteFlag;
    this.addSentenceNoteFlag = addSentenceNoteFlag;
    this.addAllWordsNotesFlag = addAllWordsNotesFlag;
    this.scrollTop = scrollTop;
    this.setState(state, callback);
  }

  cacheHistory(state: State) {
    const addWordNoteFlags = this.addWordNoteFlags.slice();
    const {
      addPhraseNoteFlag,
      addSentenceNoteFlag,
      addAllWordsNotesFlag,
      scrollTop,
    } = this;
    this.index += 1;
    this.history.set(this.index, {
      scrollTop,
      ...state,
      addWordNoteFlags,
      addPhraseNoteFlag,
      addSentenceNoteFlag,
      addAllWordsNotesFlag,
    });
  }
  /**
   * 该函数用于判断是否存在异步操作处于 ... 状态之中
   */
  hasAwait() {
    const {
      status,
      addWordState,
      addPhraseState,
      addButtonStates,
      addSentenceState,
    } = this.state;
    let hasAwait; //判断是否有未完成请求的标识
    if (status === 0) return false; //初始状态
    if (status === 1) return false; //错误状态
    if (status === 2)
      hasAwait = addButtonStates?.some(({ status }) => status === -1);
    //只要有一个为真就返回
    if (hasAwait) return true;
    hasAwait = addWordState?.status === -1;
    if (status === 3) hasAwait = addPhraseState?.status === -1;
    if (status === 4) hasAwait = addSentenceState?.status === -1;
    if (hasAwait) return true;
    return false;
  }

  delayed(callback: (...args: any[]) => void) {
    loopJudgment({
      predicate: (count) => {
        let hasAwait = this.hasAwait()
        if (count > 50) return true;
        return !hasAwait;
      },
      callback,
      time: 1000,
      firstRun: true,
    });
  }

  pauseAudio() {
    this.audio.pause();
  }
  //该值应当在与wordData绑定
  addWordNoteFlags: boolean[] = [];
  addWordNote(index: number) {
    if (this.addWordNoteFlags[index]) return;
    this.addWordNoteFlags[index] = true;
    const { wordData, addButtonStates } = this.state;
    //避免ts报错
    if (!wordData || !addButtonStates) return;
    this.setState((state) => {
      let { addButtonStates } = state;
      //避免ts报错
      if (!addButtonStates) return {};

      const originState = addButtonStates[index];
      addButtonStates = addButtonStates.slice();
      addButtonStates[index] = {
        //避免覆盖cardIds
        ...originState,
        ...{
          status: -1,
          statusText: "...",
        },
      };
      return {
        addButtonStates,
      };
    });
    const { cardIds } = addButtonStates[index];
    if (cardIds) {
      return this.postMessage("relearnNote", cardIds, (data: AnkiResponse) => {
        const { status } = data;
        this.setState((state) => {
          let { addButtonStates } = state;
          //避免ts报错
          if (!addButtonStates) return {};
          const originState = addButtonStates[index];
          addButtonStates = addButtonStates.slice();
          addButtonStates[index] = {
            ...originState,//避免覆盖cardIds
            ...data,
          };
          return {
            addButtonStates,
          };
        });
        if (status === 2 || status === 3) {
          this.addWordNoteFlags[index] = false;
        }
      });
    }
    //整理出目标数据
    const noteWordData = getNoteWordData(wordData, index);
    //避免ts报错，其必定有值
    if (!noteWordData) return
    this.postMessage("addNote", noteWordData, (data: AnkiResponse) => {
      const { status } = data;
      this.setState((state) => {
        let { addButtonStates } = state;
        if (!addButtonStates) return {};
        const originState = addButtonStates[index];
        addButtonStates = addButtonStates.slice();
        addButtonStates[index] = {
          ...data,
        };
        return {
          addButtonStates,
        };
      });
      if (status === 2 || status === 3 || status === 4) {
        this.addWordNoteFlags[index] = false;
      }
      //如果已经添加成功，则不改变this.addSentenceNoteFlag的值，避免多次添加
    });
  }

  //没有定义时的单词添加版本
  addWordNote_easy () {
    if (this.addAllWordsNotesFlag) return;
    this.addAllWordsNotesFlag = true;
    const { wordData, addWordState } = this.state;
    if (!wordData || !addWordState) return;
    this.setState((state) => {
      const { addWordState } = state;
      //避免cardIds被覆盖
      return {
        addWordState: {
          ...addWordState,
          ...{
            status: -1,
            statusText: "...",
          },
        },
      };
    });
    //["➕", "✔", "✖","✄", "↻", ]
    //处理重置学习进度的逻辑
    const {cardIds } = addWordState;
    if (cardIds) {
      return this.postMessage("relearnNote", cardIds, (data: AnkiResponse) => {
        const { status } = data;
        this.setState((state) => {
          const { addWordState } = state;
          return { addWordState: { ...addWordState, ...data } };
        });
        if (status === 2 || status === 3) {
          this.addAllWordsNotesFlag = false;
        }
        //如果已经添加成功，则不改变this.addAllWordsNotesFlag的值，避免多次添加
      });
    }
    const data = getNoteWordData_easy(wordData)
    //添加卡片的逻辑
    this.postMessage("addNote", data, (data: AnkiResponse) => {
      const { status } = data;
      this.setState((state) => {
        const { addWordState } = state;
        return { addWordState: data  };
      });
      if (status === 2 || status === 3 || status === 4) {
        this.addAllWordsNotesFlag = false;
      }
      //如果已经添加成功，则不改变this.addAllWordsNotesFlag的值，避免多次添加
    });
  }

  addAllWordsNotesFlag = false;
  addAllWordsNotes() {
    if (this.addAllWordsNotesFlag) return;
    this.addAllWordsNotesFlag = true;
    //该按钮通过触发addWordNote实现批量添加
    const { addButtonStates } = this.state;
    if (!addButtonStates) return;
    addButtonStates.forEach((_, index) => {
      this.addWordNote(index);
    });
    //... ["➕","✔","!"]
    this.setState({
      addWordState: {
        status: -1,
        statusText: "...",
      },
    });
    loopJudgment({
      predicate: (count) => {
        //只要有一个为 ... 状态，则其保持 ... 状态
        const { addButtonStates } = this.state;
        if (!addButtonStates) return true
        const { length } = addButtonStates;
        const hasAwait = addButtonStates.some(({ status }) => status === -1);
        if (!hasAwait) return true;
        if (count > length * 2) return true;
        return false;
      },
      callback: () => {
        this.addAllWordsNotesFlag = false;
        const { addButtonStates } = this.state;
        const allSuccess = addButtonStates?.every(({ status }) => status === 1);
        if (allSuccess)
          return this.setState({
            addWordState: {
              status: 1,
              statusText: "所有操作都成功完成",
            },
          });
        this.setState({
          addWordState: {
            status: 2,
            statusText: "部分操作存在问题，请逐一查看确认",
          },
        });
      },
      time: 2000,
    });
  }

  addSentenceNoteFlag = false;
  addSentenceNote() {
    if (this.addSentenceNoteFlag) return;
    this.addSentenceNoteFlag = true;
    const { sentenceData, addSentenceState } = this.state;
    if (!sentenceData || !addSentenceState) return;
    this.setState((state) => {
      const { addSentenceState } = state;
      //避免cardIds被覆盖
      return {
        addSentenceState: {
          ...addSentenceState,
          ...{
            status: -1,
            statusText: "...",
          },
        },
      };
    });
    //["➕", "✔", "✖","✄", "↻", ]
    //处理重置学习进度的逻辑
    const {cardIds } = addSentenceState;
    if (cardIds) {
      return this.postMessage("relearnNote", cardIds, (data: AnkiResponse) => {
        const { status } = data;
        this.setState((state) => {
          const { addSentenceState } = state;
          return { addSentenceState: { ...addSentenceState, ...data } };
        });
        if (status === 2 || status === 3) {
          this.addSentenceNoteFlag = false;
        }
        //如果已经添加成功，则不改变this.addSentenceNoteFlag的值，避免多次添加
      });
    }
    //添加卡片的逻辑
    this.postMessage("addNote", sentenceData, (data: AnkiResponse) => {
      const { status } = data;
      this.setState((state) => {
        const { addSentenceState } = state;
        return { addSentenceState: data  };
      });
      if (status === 2 || status === 3 || status === 4) {
        this.addSentenceNoteFlag = false;
      }
      //如果已经添加成功，则不改变this.addSentenceNoteFlag的值，避免多次添加
    });
  }

  addPhraseNoteFlag = false;
  addPhraseNote() {
    if (this.addPhraseNoteFlag) return;
    this.addPhraseNoteFlag = true;
    const { phraseData, addPhraseState } = this.state;
    if (!phraseData || !addPhraseState) return;
    this.setState((state) => {
      const { addPhraseState } = state;
      //避免cardIds被覆盖
      return {
        addPhraseState: {
          ...addPhraseState,
          ...{
            status: -1,
            statusText: "...",
          },
        },
      };
    });
    const { cardIds } = addPhraseState;
    if (cardIds) {
      return this.postMessage("relearnNote", cardIds, (data: AnkiResponse) => {
        const { status } = data;
        this.setState((state) => {
          const { addPhraseState } = state;
          return { addPhraseState: { ...addPhraseState, ...data } };
        });
        if (status === 2 || status === 3) {
          this.addPhraseNoteFlag = false;
        }
        //如果已经添加成功，则不改变this.addSentenceNoteFlag的值，避免多次添加
      });
    }

    this.postMessage("addNote", phraseData, (data: AnkiResponse) => {
      const { status } = data;
      this.setState((state) => {
        const { addPhraseState } = state;
        return { addPhraseState: data };
      });
      if (status === 2 || status === 3 || status === 4) {
        this.addPhraseNoteFlag = false;
      }
      //如果已经添加成功，则不改变this.addSentenceNoteFlag的值，避免多次添加
    });
  }

  showTranslation(data: TranslationResult, callback: () => void) {
    if (this.whetherUpdateHistory()) this.updateHistory();

    if (typeof data === "string") {
      return this.setState({ status: 1, error: data }, callback);
    }
    //重置scrollTop
    this.scrollTop = 0;
    if ("word" in data) return this.renderWordCard(data, callback);
    if ("phrase" in data) {
      this.addPhraseNoteFlag = false;
      //必须位于this.addPhraseNoteFlag等实例属性更新之后，因为该函数需要获取更新后的值
      this.cacheHistory({
        status: 3,
        phraseData: data,
        addPhraseState: {
          status: 0,
          statusText: "添加到Anki",
        },
      });
      return this.applyHistoryRender(this.index, callback);
    }
    if ("sentence" in data) {
      this.addSentenceNoteFlag = false;
      this.cacheHistory({
        status: 4,
        sentenceData: data,
        addSentenceState: {
          status: 0,
          statusText: "添加到Anki",
        },
      });
      return this.applyHistoryRender(this.index, callback);
    }
  }
  renderWordCard(data: WordData, callback: () => void) {
    //有多少个独立的翻译短语，就有多少个添加按钮
    const addButtonStates = data.translationUnits?.map(() => {
      return {
        status: 0,
        statusText: "添加到Anki",
      };
    });
    const addWordState = addButtonStates ? {
      status: 0,
      statusText: "一键触发所有添加",
    } : {
      status:0,
      statusText:"添加到Anki"
    }
    //更新附带的状态
    this.addWordNoteFlags = [];
    this.addAllWordsNotesFlag = false
    this.cacheHistory({
      status: 2,
      wordData: data,
      addWordState,
      addButtonStates,
    });
    this.applyHistoryRender(this.index, callback);
  }
}

/**
 * 纯函数，用于处理数据，适配器模式
 * @param wordData WordData
 * @param index number
 * @returns NoteWordData
 */
function getNoteWordData(wordData: WordData, index: number) {
  const { starAmount, translationUnits, phonetic } = wordData;
  const { am, en, am_audio, en_audio } = phonetic;
  if (!translationUnits) return
  const {
    part_of_speech,
    translation,
    word,
    definition,
    definition_audio,
    exampleSentences,
  } = (translationUnits)[index];
  let example_audio, example_sentence, example_sentence_translation;
  if (exampleSentences) {
    example_audio = exampleSentences[0].example_audio;
    example_sentence = exampleSentences[0].example_sentence;
    example_sentence_translation =
      exampleSentences[0].example_sentence_translation;
  }
  const noteWordData: NoteWordData = {
    word,
    starAmount: "★".repeat(starAmount),
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
function getNoteWordData_easy(wordData: WordData):NoteWordData {
  const { starAmount, phonetic,word,translations} = wordData;
  const { am, en, am_audio, en_audio } = phonetic;
  const translation = translations?.reduce((acc,cur,index) => {
    if (index === 0) {
      acc += cur 
    } else {
      acc += `<br />${cur}`
    }
    return acc
  },"") || ""
  const noteWordData: NoteWordData = {
    word,
    starAmount: "★".repeat(starAmount),
    translation,
    am,
    en,
    am_audio,
    en_audio,
  };
  return noteWordData
}

//避免内部滚动条影响到外部滚动条，只能够减低灵敏度，实际上还是会影响到
document.addEventListener("scroll",function (event) {
  event.stopPropagation()
})
const root = document.getElementById("root");
ReactDOM.render(<Shower />, root);
