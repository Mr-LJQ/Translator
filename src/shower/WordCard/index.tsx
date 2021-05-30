import React, { RefObject } from "react";
import "./index.less";

import AudioContext from "../Context/AudioContext";
import Explanation from "./Explanation";
import ExampleSentences from "./Examples";
import AddButton from "../components/AddButton/index";
import AudioButton from "../components/AudioButton";
import Translations from "../components/Translations";

import { AddButtonState, WordData } from "../../../types/index";

interface Props extends WordData {
  addAllNotes: () => void;
  addNote: (index: number) => void;
  addNote_easy: () => void;
  hidden: boolean;
  addButtonState: AddButtonState;
  addButtonStates?: AddButtonState[];
}

export default class WordCard extends React.PureComponent<Props> {
  am_playAudio: () => void;
  en_playAudio: () => void;
  am_ref: RefObject<AudioButton>;
  en_ref: RefObject<AudioButton>;
  constructor(props: Props) {
    super(props);
    this.en_ref = React.createRef();
    this.am_ref = React.createRef();
    this.am_playAudio = this.playAudio.bind(this, this.am_ref);
    this.en_playAudio = this.playAudio.bind(this, this.en_ref);
  }
  static contextType = AudioContext;
  render() {
    const {
      word,
      hidden,
      phonetic,
      starAmount,
      translations,
      addButtonState,
      addButtonStates,
      translationUnits,
      addNote,
      addAllNotes,
      addNote_easy,
    } = this.props;
    const audio = this.context;
    return (
      <div id="word_card" hidden={hidden}>
        <header className="word_cardHeader">
          <div className="word_flex">
            <h1 className="word">{word}</h1>
            <div className="word_star">{"★".repeat(starAmount)}</div>
            {addButtonStates ? (
              <AddButton
                {...addButtonState}
                onClick={addAllNotes}
                statusIcons={["➕", "✔", "!"]}
              />
            ) : (
              <AddButton {...addButtonState} onClick={addNote_easy} />
            )}
          </div>
          <div className="word_flex flex_wrap">
            <p
              hidden={phonetic.en === undefined}
              className="word_phonetic"
              onClick={this.en_playAudio}
            >
              {phonetic.en}
            </p>
            <AudioButton
              ref={this.en_ref}
              audio={audio}
              audioURL={phonetic.en_audio}
              className="word_audioButton"
            />
            <p
              hidden={phonetic.am === undefined}
              className="word_phonetic"
              onClick={this.am_playAudio}
            >
              {phonetic.am}
            </p>
            <AudioButton
              ref={this.am_ref}
              audio={audio}
              audioURL={phonetic.am_audio}
              className="word_audioButton"
            />
          </div>
          {translations && (
            <Translations initTranslations={translations} key={word} />
          )}
        </header>
        <ul className="margin_top_10">
          {translationUnits &&
            translationUnits.map((unit, index) => {
              const { exampleSentences, ...other } = unit;
              return (
                <li className="word_translationUnit" key={index}>
                  <Explanation
                    {...other}
                    key={index}
                    addNote={() => addNote(index)}
                    addButtonState={
                      (addButtonStates as AddButtonState[])[index]
                    }
                  />
                  {exampleSentences && (
                    <ExampleSentences examples={exampleSentences} />
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
  playAudio(ref: RefObject<AudioButton>) {
    const audioButton = ref.current;
    if (audioButton) audioButton.playAudio();
  }
}
