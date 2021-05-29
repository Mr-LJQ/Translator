import React from "react";
import "./index.less";

import { AddButtonState, PhraseData } from "../../../types/index";

import AudioContext from "../Context/AudioContext";
import AddButton from "../components/AddButton/index";
import AudioButton from "../components/AudioButton";
import { translateBTag } from "../utils/index";

interface Props extends PhraseData {
  addNote: () => void;
  hidden: boolean;
  addButtonState?: AddButtonState;
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
      addButtonState,
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
            {addButtonState && (
              <AddButton
                key={phrase}
                {...addButtonState}
                onClick={addNote}
              />
            )}
          </div>
          <ul>
            {translations.reduce((acc, cur) => {
              return acc + " ; " + cur;
            })}
          </ul>
        </header>
        {exampleSentences && (
          <ul className="phrase_example_container">
            {exampleSentences.map((item, index) => {
              return (
                <li key={index} className="phrase_example">
                  <AudioButton
                    audio={audio}
                    audioURL={item.example_audio}
                    className="phrase_audioButton"
                  />
                  <p>{translateBTag(item.example_sentence)}</p>
                  <p className="phrase_example_sentence_translation">
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
