import React from "react";
import "./index.less";

import { AnkiCallback, SentenceData } from "../../../types/index";

import AudioContext from "../AudioContext";
import AudioButton from "../components/AudioButton";
import AddButton from "../components/AddButton";

interface Props extends SentenceData {
  hidden: boolean;
  addNote: (callback: AnkiCallback) => void;
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
    const { hidden, sentence, sentence_audio, sentenceTranslation, addNote } =
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
          <AddButton initStatusText="添加到Anki" onClick={addNote} />
          {sentenceTranslation}
        </main>
      </div>
    );
  }
}
