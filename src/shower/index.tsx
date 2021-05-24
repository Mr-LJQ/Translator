import React from "react";
import ReactDOM from "react-dom";
import "./index.less";

import AudioContext from "./AudioContext";
import PhraseCard from "./PhraseCard/index";
import WordCard from "./WordCard/index";
import SentenceCard from "./SentenceCard/index";

import { agent,PostMessage } from "../utils/index";
import { SelectionWatcher } from "../watcher/SelectionWatcher";

import {
  NoteWordData,
  WordData,
  SentenceData,
  TranslationUnit,
  PhraseData,
  TranslationResult,
  AnkiCallback,
} from "../../types/index";

interface State {
  wordData: WordData | null;
  sentenceData: SentenceData | null;
  phraseData: PhraseData | null;
  error: string | null;
  status: 0 | 1 | 2 | 3 | 4;
}

class Shower extends React.Component {
  postMessage:PostMessage;
  audio: HTMLAudioElement;

  state: State = {
    wordData: null,
    sentenceData: null,
    phraseData: null,
    error: null,
    //0表示无内容渲染(初始状态)，1表示渲染word，2表示渲染sentence，3表示渲染错误 ,4表示渲染词组
    status: 0,
  };

  constructor(props: object) {
    super(props);

    this.audio = document.createElement("audio");

    this.pauseAudio = this.pauseAudio.bind(this);
    this.addWordNote = this.addWordNote.bind(this);
    this.addPhraseNote = this.addPhraseNote.bind(this);
    this.addSentenceNote = this.addSentenceNote.bind(this);
    this.addAllWordsNotes = this.addAllWordsNotes.bind(this);

    this.postMessage = agent({
      self: window,
      handler: (message: any, sendResponse: ((data?:any)=>void)) => {
        const {command,data} = message
        switch (command) {
          case "showTranslation":
            this.showTranslation(data, sendResponse);
            break;
          case "pauseAudio":
            this.pauseAudio();
            break;
          default:
            throw new Error("存在未处理的指令:" + command)
        }
      },
    });

    //可以通过选中iframe内部单词来再次查询翻译
    const selectionWatcher = new SelectionWatcher((text: string) => {
      this.postMessage("showTranslated", text);
    });
    selectionWatcher.install();
  }

  render() {
    const { status, error, wordData, sentenceData, phraseData } = this.state;
    //清除上次查询遗留的滚动条位置
    document.documentElement.scrollTop = 0;
    return (
      <>
        {status && (
          <>
            <p className="showError" hidden={status !== 3}>
              {error}
            </p>
            <AudioContext.Provider value={this.audio}>
              {sentenceData && (
                <SentenceCard
                  {...sentenceData}
                  hidden={status !== 2}
                  addNote={this.addSentenceNote}
                />
              )}
              {wordData && ( //无数据时不进行任何渲染
                <WordCard
                  {...wordData}
                  hidden={status !== 1} //避免缓存的数据结构显示,最大程度复用已有结构
                  addNote={this.addWordNote}
                  addAllNotes={this.addAllWordsNotes}
                />
              )}
              {phraseData && ( //无数据时不进行渲染
                <PhraseCard
                  {...phraseData}
                  hidden={status !== 4}
                  addNote={this.addPhraseNote}
                />
              )}
            </AudioContext.Provider>
          </>
        )}
      </>
    );
  }

  pauseAudio() {
    this.audio.pause();
  }
  addWordNote(index: number, callback: AnkiCallback) {
    const { wordData } = this.state;
    if (!wordData) return 
    //整理出目标数据
    const { starAmount, translationUnits, phonetic } = wordData;
    const { am, en, am_audio, en_audio } = phonetic;
    const { part_of_speech, translation, word ,definition,definition_audio, exampleSentences } = (
      translationUnits as TranslationUnit[]
    )[index];
    let example_audio, example_sentence, example_sentence_translation;
    if (exampleSentences) {
      example_audio = exampleSentences[0].example_audio;
      example_sentence = exampleSentences[0].example_sentence;
      example_sentence_translation =
        exampleSentences[0].example_sentence_translation;
    }
    const noteWordData: NoteWordData = {
      word,
      starAmount:"★".repeat(starAmount),
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
    //发送添加Anki的请求
    this.postMessage("addWordNote", noteWordData, callback);
  }
  addAllWordsNotes(callback: AnkiCallback) {
    const { wordData } = this.state;
    if (!wordData) return
    this.postMessage("addAllWordsNotes", wordData, callback);
  }
  addSentenceNote(callback:AnkiCallback) {
    const { sentenceData } = this.state;
    if (!sentenceData) return
    this.postMessage("addSentenceNote", sentenceData, callback);
  }
  addPhraseNote(callback:AnkiCallback) {
    const { phraseData } = this.state;
    if (!phraseData) return
    this.postMessage("addPhraseNote", phraseData, callback);
  }
  showTranslation(data: TranslationResult, callback: () => void) {
    if (typeof data === "string") {
      this.setState({ status: 3, error: data }, callback);
      return;
    }
    switch (true) {
      case "word" in data:
        this.setState({ status: 1, wordData: data }, callback);
        break;
      case "phrase" in data:
        this.setState({ status: 4, phraseData: data }, callback);
        break;
      case "sentence" in data:
        this.setState({ status: 2, sentenceData: data }, callback);
        break;
    }
  }
}

const root = document.getElementById("root");
ReactDOM.render(<Shower />, root);
