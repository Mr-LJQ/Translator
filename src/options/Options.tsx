import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "./features/hooks";
import { setStorage, onStorageChange } from "../utils/extensions-api";
import { fetchAnki } from "./features/ankiSlice";

import {
  updateWordConfig,
  updateBasisConfig,
  updatePhraseConfig,
  updateActiveTabPane,
  updateSentenceConfig,
} from "./features/storageSlice";

//组件
import Button from "./components/Button";
import AnkiConfig from "./components/AnkiConfig";
import BasisConfig from "./components/BasisConfig";
import Tabs, { TabPane } from "./components/Tabs";

//映射数据
import {
  WORD_FIELDS,
  PHRASE_FIELDS,
  SENTENCE_FIELDS,
  CARD_INFO_FIELDS,
  ANKI_CONNECTION_FIELDS,
} from "./field";

import { TabPaneKey } from "../utils/extensions-api";

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//类型
import type {
  WordConfig,
  PhraseConfig,
  SentenceConfig,
} from "../utils/extensions-api";
import type { WordFields, PhraseFields, SentenceFields } from "./field";
//魔法字符串
enum Label {
  SuccessLabel = "√",
  LoadingLabel = "...",
  RefreshLabel = "⟳",
}

function Options() {
  const storage = useSelector((state) => state.storage);
  const anki = useSelector((state) => state.anki);
  const dispatch = useDispatch();

  const wordModel = storage.wordConfig?.modelName || "";
  const phraseModel = storage.phraseConfig?.modelName || "";
  const sentenceModel = storage.sentenceConfig?.modelName || "";
  const activeTabPane: TabPaneKey = storage.activeTabPane || TabPaneKey.Home;

  const deckNames = anki.deckNames;
  const modelNames = anki.modelNames;
  const modelFieldNames = anki.modelFieldNames;

  useEffect(() => {
    return onStorageChange({
      activeTabPane(_, newVal) {
        dispatch(updateActiveTabPane(newVal!));
      },
    });
  }, [dispatch]);

  //处理连接
  const connected = anki.ankiConnectionVersion !== null;

  //刷新操作
  const [refreshLabel, setRefreshLabel] = useState("");
  const refresh = useCallback(() => {
    if (refreshLabel === Label.RefreshLabel) return;
    setRefreshLabel(Label.RefreshLabel);
    setTimeout(() => {
      setRefreshLabel("");
    }, 3000);
    dispatch(fetchAnki());
  },[refreshLabel,dispatch]);

  //处理保存
  const [saveLabel, setSaveLabel] = useState("");
  const saveOptions = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (saveLabel !== "") return;
    setSaveLabel(Label.LoadingLabel);
    setStorage(storage, () => {
      setSaveLabel(Label.SuccessLabel);
      setTimeout(() => {
        setSaveLabel("");
      }, 3000);
    });
  },[storage,saveLabel]);

  return (
    <form action="#" className="flex flex-col h-full" onSubmit={saveOptions}>
      <Tabs
        activeKey={activeTabPane}
        changeActiveKey={(key) => {
          setStorage({activeTabPane:key})
        }}
      >
        <TabPane tabItem="基础配置" key={TabPaneKey.Home}>
          <BasisConfig
            title="基础配置"
            config={ANKI_CONNECTION_FIELDS}
            disabled={!connected}
            fields={ANKI_CONNECTION_FIELDS}
            updateConfig={(name, value: string) => {
              dispatch(updateBasisConfig({ name, value }));
            }}
          />
        </TabPane>
        <TabPane tabItem="单词配置" key={TabPaneKey.Word}>
          <AnkiConfig<WordConfig, Required<WordFields>>
            title="单词配置"
            config={storage.wordConfig || {}}
            disabled={!connected}
            deckNames={deckNames}
            modelNames={modelNames}
            modelFieldNames={modelFieldNames[wordModel] || []}
            fields={WORD_FIELDS}
            CardInfoFields={CARD_INFO_FIELDS}
            updateConfig={(name, value: string) => {
              dispatch(updateWordConfig({ name, value }));
            }}
          />
        </TabPane>
        <TabPane tabItem="短语配置" key={TabPaneKey.Phrase}>
          <AnkiConfig<PhraseConfig, Required<PhraseFields>>
            title="短语配置"
            deckNames={deckNames}
            modelNames={modelNames}
            modelFieldNames={modelFieldNames[phraseModel] || []}
            config={storage.phraseConfig || {}}
            disabled={!connected}
            CardInfoFields={CARD_INFO_FIELDS}
            fields={PHRASE_FIELDS}
            updateConfig={(name, value: string) => {
              dispatch(updatePhraseConfig({ name, value }));
            }}
          />
        </TabPane>
        <TabPane tabItem="句子配置" key={TabPaneKey.Sentence}>
          <AnkiConfig<SentenceConfig, Required<SentenceFields>>
            title="句子配置"
            deckNames={deckNames}
            modelNames={modelNames}
            modelFieldNames={modelFieldNames[sentenceModel] || []}
            disabled={!connected}
            config={storage.sentenceConfig || {}}
            CardInfoFields={CARD_INFO_FIELDS}
            fields={SENTENCE_FIELDS}
            updateConfig={(name, value) => {
              dispatch(updateSentenceConfig({ name, value }));
            }}
          />
        </TabPane>
      </Tabs>
      <footer className="mt-1 border-t border-dashed border-gray-600 overflow-hidden">
        <Button
          type="button"
          title="如果anki的配置发生改变,则可以按下该按钮进行刷新，以同步anki更改"
          onClick={refresh}
        >
          刷新 {refreshLabel}
        </Button>
        <p className="inline-block p-1 mr-1 text-sm ">
          连接状态：
          {connected ? "已连接" : <span className="text-red-500">未连接</span>}
        </p>
        <Button type="button" className="float-right" onClick={window.close}>
          退出
        </Button>
        <Button className="float-right">保存 {saveLabel}</Button>
      </footer>
    </form>
  );
}

export { Options };
