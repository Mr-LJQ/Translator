import React from "react";
import "./index.less";

import { AddButtonState, SentenceData } from "../../../types/index";

import AudioContext from "../Context/AudioContext";
import AudioButton from "../components/AudioButton";
import AddButton from "../components/AddButton/index";

interface Props extends SentenceData {
  hidden: boolean;
  addNote: () => void;
  addButtonState?:AddButtonState
}

export default class SentenceCard extends React.PureComponent<Props> {
  audioButtonRef: React.RefObject<AudioButton>;
  static contextType = AudioContext;
  constructor(props: Props) {
    super(props);
    this.audioButtonRef = React.createRef();
  }

  render() {
    const audio = this.context;
    const { hidden, sentence, sentence_audio,addButtonState, sentenceTranslation, addNote } =
      this.props;
    return (
      <div id="sentenceCard" hidden={hidden}>
        <header className="sentence_header">
          <AudioButton
            ref={this.audioButtonRef}
            className="sentence_audioButton"
            audio={audio}
            audioURL={sentence_audio}
          />
          <h1 className="sentence">{sentence}</h1>
        </header>
        <main className="sentence_translation">
          {addButtonState && <AddButton key={sentence} {...addButtonState} onClick={addNote} />}
          {sentenceTranslation}
        </main>
      </div>
    );
  }
}
