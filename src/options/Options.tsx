//依赖
import React, { useState } from "react";
import { useSelector, useDispatch } from "./features/hooks";
import { setStorage } from "../extensions_API/index";
import { pick } from "../utils";
import { fetchAnki } from "./features/ankiSlice";
import {
  updateWordConfig,
  updateBasisConfig,
  updatePhraseConfig,
  updateSentenceConfig,
} from "./features/storageSlice";

//组件
import Button from "./components/Button";
import AnkiConfig from "./features/AnkiConfig";
import BasisConfig from "./features/BasisConfig";
import Tabs, { TabPane } from "./components/Tabs";

//数据
import {
  wordMappingTable,
  otherMappingTable,
  basisMappingTable,
  phraseMappingTable,
  sentenceMappingTable,
} from "./mappingTable";

//魔法字符串
const SUCCESS_LABEL = "√";
const LOADING_LABEL = "...";
const REFRESH_LABEL = "⟳";
function Options() {
  const storage = useSelector((state) => state.storage);
  const anki = useSelector((state) => state.anki);
  const dispatch = useDispatch();

  const activeTabPane = storage.activeTabPane || "basis";
  const wordModel = storage.wordConfig?.modelName || "";
  const phraseModel = storage.phraseConfig?.modelName || "";
  const sentenceModel = storage.sentenceConfig?.modelName || "";

  const deckNames = anki.deckNames;
  const modelNames = anki.modelNames;
  const modelFieldNames = anki.modelFieldNames;

  //处理连接
  const connected = anki.ankiConnectionVersion !== null;

  //刷新操作
  const [refreshLabel, setRefreshLabel] = useState("");
  const refresh = () => {
    if (refreshLabel === REFRESH_LABEL) return;
    setRefreshLabel(REFRESH_LABEL);
    setTimeout(() => {
      setRefreshLabel("");
    }, 3000);
    dispatch(fetchAnki());
  };

  //处理保存
  const [saveLabel, setSaveLabel] = useState("");
  const saveOptions = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (saveLabel !== "") return;
    setSaveLabel(LOADING_LABEL);
    setStorage(storage, () => {
      setSaveLabel(SUCCESS_LABEL);
      setTimeout(() => {
        setSaveLabel("");
      }, 3000);
    });
  };

  const basisConfig = pick(storage, [
    "ankiConnectionURL",
    "ankiConnectionMethod",
  ]);

  const tabPanes = [
    <TabPane tabItem="基础配置" key="basis">
      <BasisConfig
        title="基础配置"
        config={basisConfig}
        disabled={!connected}
        mappingTable={basisMappingTable}
        updateConfig={(name, value: string) => {
          dispatch(updateBasisConfig({ name, value }));
        }}
      />
    </TabPane>,
    <TabPane tabItem="单词配置" key="word">
      <AnkiConfig
        title="单词配置"
        config={storage.wordConfig || {}}
        disabled={!connected}
        deckNames={deckNames}
        modelNames={modelNames}
        modelFieldNames={modelFieldNames[wordModel] || []}
        fieldMappingTable={wordMappingTable}
        otherMappingTable={otherMappingTable}
        updateConfig={(name, value: string) => {
          dispatch(updateWordConfig({ name, value }));
        }}
      />
    </TabPane>,
    <TabPane tabItem="短语配置" key="phrase">
      <AnkiConfig
        title="短语配置"
        deckNames={deckNames}
        modelNames={modelNames}
        modelFieldNames={modelFieldNames[phraseModel] || []}
        config={storage.phraseConfig || {}}
        disabled={!connected}
        otherMappingTable={otherMappingTable}
        fieldMappingTable={phraseMappingTable}
        updateConfig={(name, value: string) => {
          dispatch(updatePhraseConfig({ name, value }));
        }}
      />
    </TabPane>,
    <TabPane tabItem="句子配置" key="sentence">
      <AnkiConfig
        title="句子配置"
        deckNames={deckNames}
        modelNames={modelNames}
        modelFieldNames={modelFieldNames[sentenceModel] || []}
        disabled={!connected}
        config={storage.sentenceConfig || {}}
        otherMappingTable={otherMappingTable}
        fieldMappingTable={sentenceMappingTable}
        updateConfig={(name, value: string) => {
          dispatch(updateSentenceConfig({ name, value }));
        }}
      />
    </TabPane>,
  ];

  return (
    <form action="#" className="flex flex-col h-full" onSubmit={saveOptions}>
      <Tabs activeTabPane={activeTabPane}>{tabPanes}</Tabs>
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
