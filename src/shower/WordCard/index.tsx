import React from "react";

//组件
import Phonetic from "./Phonetic";
import Explanation from "./Explanation";
import ExampleSentences from "./ExampleSentences";
import AddButton from "../components/AddButton";
import { TextClamp } from "../components/TextClamp";

//类型
import { AddButtonState, WordData } from "../../../types/index";

interface Props extends WordData {
  addNote: (index: number) => void;
  addNote_Top: () => void;
  addButtonState: AddButtonState;
  addButtonStates: AddButtonState[];
}

function WordCard(props: Props) {
  const {
    word,
    phonetic,
    starAmount,
    translations,
    addButtonState,
    addButtonStates,
    translationUnits,
    addNote,
    addNote_Top,
  } = props;
  return (
    <div>
      <header className="bg-green-150 p-2 rounded">
        <div className="flex items-center">
          <h1 className="text-4xl text-black">{word}</h1>
          <div className="leading-tight ml-4 mr-auto self-end text-lg text-yellow-600">
            {"★".repeat(starAmount)}
          </div>
          <AddButton {...addButtonState} onClick={addNote_Top} />
        </div>
        <div className="flex flex-wrap items-center">
          <Phonetic symbols={phonetic.en} audioURL={phonetic.en_audio} />
          <Phonetic symbols={phonetic.am} audioURL={phonetic.am_audio} />
        </div>
        {translations && (
          <TextClamp key={word} >
            {translations}
          </TextClamp>
        )}
      </header>
      <ul className="mt-2 rounded">
        {translationUnits &&
          translationUnits.map((unit, index) => {
            const { exampleSentences, ...other } = unit;
            return (
              <li className="bg-green-150 rounded text-base my-2" key={index}>
                <Explanation
                  {...other}
                  addNote={() => addNote(index)}
                  addButtonState={addButtonStates[index]}
                />
                {exampleSentences && (
                  <ExampleSentences exampleSentences={exampleSentences} />
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default WordCard;
