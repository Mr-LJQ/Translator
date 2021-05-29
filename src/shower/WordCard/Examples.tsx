import React from "react";
import "./index.less";
import { ExampleSentence } from "../../../types/Translation";

interface Props {
  examples: ExampleSentence[];
}

export default function Examples(props: Props) {
  return (
    <ul>
      {props.examples.map((example, index) => {
        const { example_sentence, example_sentence_translation } = example;
        return (
          <li className="word_example" key={index}>
            <p>{example_sentence}</p>
            <p className="word_blue_color">{example_sentence_translation}</p>
          </li>
        );
      })}
    </ul>
  );
}
