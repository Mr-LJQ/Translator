import React, { ReactNode } from "react";
import { WordFieldData, WordData } from "../../types/index";

export function translateBTag(text: string): ReactNode[] {
  const reg = new RegExp(`(<b>.+?)</b>`, "gi");
  const textArr = text.split(reg);
  return textArr.reduce((result, text, index) => {
    let reactNode: ReactNode = text;
    if (text.includes("<b>")) reactNode = <b key={index}>{text.slice(3)}</b>;
    result.push(reactNode);
    return result;
  }, [] as ReactNode[]);
}

/**
 * 纯函数，用于处理数据，适配器模式
 * @param wordData WordData
 * @param index number
 * @returns NoteWordData
 */
export function getNoteWordData(wordData: WordData, index: number) {
  const { starAmount, translationUnits, phonetic,word } = wordData;
  const { am, en, am_audio, en_audio } = phonetic;
  if (!translationUnits) return;
  const {
    part_of_speech,
    translation,
    definition,
    definition_audio,
    exampleSentences,
  } = translationUnits[index];
  let example_audio, example_sentence, example_sentence_translation;
  if (exampleSentences) {
    example_audio = exampleSentences[0].example_audio;
    example_sentence = exampleSentences[0].example_sentence;
    example_sentence_translation =
      exampleSentences[0].example_sentence_translation;
  }
  const noteWordData: WordFieldData = {
    word,
    starAmount: "★".repeat(starAmount),
    am,
    en,
    am_audio,
    en_audio,
    part_of_speech,
    translation,
    definition,
    definition_audio,
    example_sentence,
    example_sentence_translation,
    example_audio,
  };
  return noteWordData;
}

/**
 * 纯函数，用于处理那些没有定义的单词
 */
export function getNoteWordData_Top(wordData: WordData): WordFieldData {
  const { starAmount, phonetic, word, translations } = wordData;
  const { am, en, am_audio, en_audio } = phonetic;
  const translation =
    translations?.reduce((acc, cur, index) => {
      if (index === 0) {
        acc += cur;
      } else {
        acc += `<br />${cur}`;
      }
      return acc;
    }, "") || "";
  const noteWordData: WordFieldData = {
    word,
    starAmount: "★".repeat(starAmount),
    translation,
    am,
    en,
    am_audio,
    en_audio,
  };
  return noteWordData;
}
