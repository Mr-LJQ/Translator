import React from "react";
import "./index.less";

import {translateBTag} from "../utils/index"
import AddButton from "../components/AddButton/index";
import { AddButtonState, AnkiCallback } from "../../../types/index";

interface Props {
  addNote: () => void;
  translation: string;
  definition: string;
  part_of_speech: string;
  addButtonState:AddButtonState
}

export default function Explanation(props: Props) {
  const { part_of_speech, definition, translation,addButtonState, addNote } = props;
  return (
    <p>
      <span className="word_part_of_speech">{part_of_speech}</span>

      <AddButton 
        {...addButtonState}
        onClick={addNote}
      />

      {translateBTag(definition)}
      <span className="word_blue_color">{translation}</span>
    </p>
  );
}

