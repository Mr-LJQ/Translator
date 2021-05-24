import React, { ReactNode } from "react";
import "./index.less";

import AddButton from "../components/AddButton";
import { AnkiCallback } from "../../../types/index";

interface Props {
  addNote: (callback: AnkiCallback) => void;
  translation: string;
  definition: string;
  part_of_speech: string;
}

export default function Explanation(props: Props) {
  const { part_of_speech, definition, translation, addNote } = props;
  return (
    <p>
      <span className="word_part_of_speech">{part_of_speech}</span>

      <AddButton initStatusText="添加到Anki!" onClick={addNote} key={definition+translation}/>

      {translateBTag(definition)}
      <span className="blue_color">{translation}</span>
    </p>
  );
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