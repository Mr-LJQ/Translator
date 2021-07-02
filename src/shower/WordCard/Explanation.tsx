import React from "react";

import { translateBTag } from "../utils/index";
import AddButton from "../components/AddButton/index";
import { AddButtonState } from "../../../types/index";

interface Props {
  addNote: () => void;
  translation: string;
  definition: string;
  part_of_speech: string;
  addButtonState: AddButtonState;
}

export default function Explanation(props: Props) {
  const { part_of_speech, definition, translation, addButtonState, addNote } =
    props;
  return (
    <p>
      <span className="bg-blue-800 font-bold mr-1 px-3 py-0.5 text-base text-white">
        {part_of_speech}
      </span>
      <AddButton {...addButtonState} onClick={addNote} />
      {translateBTag(definition)}
      <span className="text-blue-800">{translation}</span>
    </p>
  );
}
