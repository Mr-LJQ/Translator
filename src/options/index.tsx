import React from "react";
import ReactDOM from "react-dom";
import "./index.less";

import Options from "./Options";
import {dispatch} from "./utils/index"
import { postBackend } from "../utils/messager";

import {
  WordConfig,
  PhraseConfig,
  SentenceConfig,
  CachedOptions,
} from "../../types/index";

render();

async function render() {
  const [version, cachedOptions] = await Promise.all([
    postBackend("getVersion"),
    getCachedOptions(),
  ]);
  let {
    defaultActiveIndex,
    ankiConnectionURL,
    wordConfig: _wordConfig,
    phraseConfig: _phraseConfig,
    sentenceConfig: _sentenceConfig,
  } = cachedOptions;

  let wordConfig = { ..._wordConfig as Required<WordConfig>, dispatch };
  let phraseConfig = { ..._phraseConfig as Required<PhraseConfig>, dispatch };
  let sentenceConfig = { ..._sentenceConfig as Required<SentenceConfig>, dispatch };

  //绑定this
  wordConfig.dispatch = dispatch.bind(wordConfig);
  phraseConfig.dispatch = dispatch.bind(phraseConfig);
  sentenceConfig.dispatch = dispatch.bind(sentenceConfig);
  
  ReactDOM.render(
    <Options
      cachedConfigs={{wordConfig,phraseConfig,sentenceConfig}}
      defaultActiveIndex={defaultActiveIndex}
      connectedAnki={version !== null}
      ankiConnectionURL={ankiConnectionURL as string}//因为存在默认值，所以必定不会为undefined
    />,
    document.getElementById("root")
  );
}

//从本地存储中获取用户上次保持的设定
async function getCachedOptions(): Promise<Partial<CachedOptions>> {
  //默认值
  return new Promise((resolve) => {
    const wordConfig: Required<WordConfig> = {
      matchedFields: {
        word: "",
        translation: "",
        part_of_speech: "",
        definition: "",
        definition_audio: "",
        am: "",
        en: "",
        am_audio: "",
        en_audio: "",
        starAmount: "",
        example_audio: "",
        example_sentence: "",
        example_sentence_translation: "",
      },
      deckName: "",
      modelName: "",
      tags: "",
    };
    const phraseConfig: Required<PhraseConfig> = {
      matchedFields: {
        phrase: "",
        phrase_audio: "",
        translations: "",
        example_audio_1: "",
        example_audio_2: "",
        example_audio_3: "",
        example_sentence_1: "",
        example_sentence_2: "",
        example_sentence_3: "",
        example_sentence_translation_1: "",
        example_sentence_translation_2: "",
        example_sentence_translation_3: "",
      },
      deckName: "",
      modelName: "",
      tags: "",
    };
    const sentenceConfig:Required<SentenceConfig> = {
      matchedFields: {
        sentence: "",
        sentence_audio: "",
        sentenceTranslation: "",
      },
      deckName: "",
      modelName: "",
      tags: "",
    };
    const cachedOptions: Partial<CachedOptions> = {
      wordConfig,
      phraseConfig,
      sentenceConfig,
      defaultActiveIndex: "basis",
      ankiConnectionURL:"http://127.0.0.1:8765",
    };
    chrome.storage.local.get(
      cachedOptions,
      (initData: Partial<CachedOptions>) => {
        resolve(initData);
      }
    );
  });
}
