import React from "react";
import { ExampleSentence } from "../../../types/Translation";

interface Props {
  exampleSentences: ExampleSentence[];
}

export default function ExampleSentences(props: Props) {
  return (
    <ul>
      {props.exampleSentences.map((exampleSentence) => {
        const { example_sentence, example_sentence_translation } = exampleSentence;
        return (
          <li
            className="border border-black px-4 py-1.5 rounded text-base my-1.5"
            key={example_sentence}
          >
            <p>{example_sentence}</p>
            <p className="text-blue-800">{example_sentence_translation}</p>
          </li>
        );
      })}
    </ul>
  );
}
