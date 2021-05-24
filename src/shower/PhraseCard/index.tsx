import React, { ReactNode } from "react";
import "./index.less";

import { AnkiCallback, PhraseData } from "../../../types/index";

import AudioContext from "../AudioContext";
import AddButton from "../components/AddButton";
import AudioButton from "../components/AudioButton";

interface Props extends PhraseData {
  addNote: (callback:AnkiCallback) => void;
  hidden: boolean;
}

export default class PhraseCard extends React.PureComponent<Props> {
  static contextType = AudioContext;
  constructor(props: Props) {
    super(props);
  }

  render() {
    const audio = this.context;
    const {
      hidden,
      phrase,
      translations,
      phrase_audio,
      exampleSentences,
      addNote,
    } = this.props;
    return (
      <div hidden={hidden} id="phrase_card">
        <header className="phrase_cardHeader">
          <div className="phrase_flex">
            <h1 className="phrase">{phrase}</h1>
            <AudioButton
              className="phrase_audioButton"
              audio={audio}
              audioURL={phrase_audio}
            />
            <AddButton key={phrase} initStatusText="添加到Anki." onClick={addNote} />
          </div>
          <ul>
            {translations.reduce((acc, cur) => {
              return acc + " ; " + cur;
            })}
          </ul>
        </header>
        {exampleSentences && (
          <ul className="margin_top_10">
            {exampleSentences.map((item, index) => {
              return (
                <li key={index} className="phrase_example">
                  <AudioButton
                    audio={audio}
                    audioURL={item.example_audio}
                    className="float_right phrase_audioButton"
                  />
                  <p>{translateBTag(item.example_sentence)}</p>
                  <p className="blue_color">
                    {item.example_sentence_translation}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}

function translateBTag(text:string):ReactNode[] {
  const reg = new RegExp(`(<b>.+?)</b>`,"gi")
  const textArr = text.split(reg)
  return textArr.reduce((result,text,index) => {
    let reactNode:ReactNode = text
    if (text.includes("<b>")) reactNode = <b key={index}>{text.slice(3)}</b>
    result.push(reactNode)
    return result
  },[] as ReactNode[])
}