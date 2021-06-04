import React, { ChangeEvent } from "react";
import "./index.less";

import {postBackend} from "../extensions_API/index"
import { Dispatch, getDeckAndModels, tabPaneDataFactory } from "./utils/index";

import BasisConfig from "./components/BasisConfig/index";
import AnkiConfig from "./components/AnkiConfig/index";
import Tab, { TabPane } from "../components/Tabs/index";

import {
  BasisAnkiConfig,
  CachedOptions,
  NotePhraseData,
  NoteSentenceData,
  NoteWordData,
  PhraseConfig,
  SentenceConfig,
  WordConfig,
  DeckAndModels,
  TabPaneKey,
} from "../../types/index";

interface State {
  deckAndModels: DeckAndModels;
  connectedAnki: boolean;
  savaTip:string;
  reconnectTip:string
  ankiConnectionURL:string
}

interface Props {
  defaultActiveIndex?: TabPaneKey;
  connectedAnki: boolean;
  cachedConfigs: {
    wordConfig: Required<WordConfig> & Dispatch;
    phraseConfig: Required<PhraseConfig> & Dispatch;
    sentenceConfig: Required<SentenceConfig> & Dispatch;
  };
  ankiConnectionURL:string
}

export default class Options extends React.Component<Props, State> {
  wordMappingTable: Required<NoteWordData> = {
    definition: "定义",
    word: "单词",
    translation: "翻译",
    part_of_speech: "词性",
    definition_audio: "定义音频",
    am: "美国音标",
    en: "英国音标",
    am_audio: "美国音频",
    en_audio: "英国音频",
    starAmount: "出现频率",
    example_audio: "例句音频",
    example_sentence: "例句原文",
    example_sentence_translation: "例句翻译",
  };

  phraseMappingTable: Required<NotePhraseData> = {
    phrase: "短语词组",
    phrase_audio: "短语音频",
    translations: "短语翻译",
    example_audio_1: "例句1音频",
    example_audio_2: "例句2音频",
    example_audio_3: "例句3音频",
    example_sentence_1: "例句1原文",
    example_sentence_2: "例句2原文",
    example_sentence_3: "例句3原文",
    example_sentence_translation_1: "例句1翻译",
    example_sentence_translation_2: "例句2翻译",
    example_sentence_translation_3: "例句3翻译",
  };

  sentenceMappingTable: Required<NoteSentenceData> = {
    sentence: "句子原文",
    sentenceTranslation: "句子翻译",
    sentence_audio: "句子音频",
  };

  BasisAnkiMappingTable: Required<BasisAnkiConfig> = {
    deckName: "牌组名称",
    modelName: "模型名称",
    tags: "卡片标签",
  };

  state: State = {
    deckAndModels: { deckNames: [], modelNames: [] },
    connectedAnki: this.props.connectedAnki,
    savaTip:"",
    reconnectTip:"",
    ankiConnectionURL:this.props.ankiConnectionURL
  };
  reconnectFlag = false
  saveConfigFlag = false
  constructor(props: Props) {
    super(props);

    this.savaConfig = this.savaConfig.bind(this);
    this.closeOptions = this.closeOptions.bind(this);
    this.setDeckAndModels = this.setDeckAndModels.bind(this);
    this.reconnectAnkiConnect = this.reconnectAnkiConnect.bind(this);
    this.updateAnkiConnectionURL = this.updateAnkiConnectionURL.bind(this);
  }

  componentDidMount() {
    if (this.state.connectedAnki) this.setDeckAndModels();
  }

  private setDeckAndModels() {
    getDeckAndModels().then((deckAndModels) => {
      this.setState({
        deckAndModels,
      });
    });
  }

  private async reconnectAnkiConnect() {
    if (this.reconnectFlag) return
    this.reconnectFlag = true
    const version = await postBackend("getVersion");
    if (!version) {
      setTimeout(() => {
        this.reconnectFlag = false
        this.setState({reconnectTip:""})
      }, 500);
      return this.setState({reconnectTip:"✖"})
    }
    this.setState({ connectedAnki: true });
    this.setDeckAndModels();
  }

  private closeOptions() {
    window.close();
  }

  private savaConfig() {
    const configs = this.props.cachedConfigs;
    const {ankiConnectionURL} = this.state
    //去除dispatch
    let {
      wordConfig: { dispatch: D1, ...wordConfig },
      phraseConfig: { dispatch: D2, ...phraseConfig },
      sentenceConfig: { dispatch: D3, ...sentenceConfig },
    } = configs;
    const cached: Partial<CachedOptions> = {
      wordConfig,
      phraseConfig,
      sentenceConfig,
      ankiConnectionURL,
    };
    chrome.storage.local.set(cached,() => {
      this.setState({savaTip:"✔"})
      if (this.saveConfigFlag) return
      this.saveConfigFlag = true
      setTimeout(() => {
        this.saveConfigFlag = false
        this.setState({savaTip:""})
      }, 1000);
    });
  }

  /**
   * 用于更新ankiConnection的函数
   * @param event 如果值不存在，则使用默认值
   */
  updateAnkiConnectionURL (event?:ChangeEvent<HTMLInputElement>) {
    const ankiConnectionURL = event?.target.value || "http://127.0.0.1:8765"
    this.setState({
      ankiConnectionURL,
    })
  }

  render() {
    const { reconnectAnkiConnect,updateAnkiConnectionURL } = this;
    const { defaultActiveIndex = "basis", cachedConfigs,} = this.props;
    const { deckAndModels, connectedAnki, savaTip ,reconnectTip,ankiConnectionURL} = this.state;

    const configs = cachedConfigs;
    const tabPanes = [
      tabPaneDataFactory("基础配置", <BasisConfig ankiConnectionURL={ankiConnectionURL} updateAnkiConnectionURL={updateAnkiConnectionURL}/>,"basis"),
      tabPaneDataFactory(
        "单词配置",
        <AnkiConfig
          headerTitle="单词配置"
          connectedAnki={connectedAnki}
          deckAndModels={deckAndModels}
          cachedConfig={configs.wordConfig}
          mappingTable={this.wordMappingTable}
          BasisAnkiMappingTable={this.BasisAnkiMappingTable}
        />,
        "word",
      ),
      tabPaneDataFactory(
        "短语配置",
        <AnkiConfig
          headerTitle="短语配置"
          connectedAnki={connectedAnki}
          deckAndModels={deckAndModels}
          cachedConfig={configs.phraseConfig}
          mappingTable={this.phraseMappingTable}
          BasisAnkiMappingTable={this.BasisAnkiMappingTable}
        />,
        "phrase",
      ),
      tabPaneDataFactory(
        "句子配置",
        <AnkiConfig
          headerTitle="句子配置"
          connectedAnki={connectedAnki}
          deckAndModels={deckAndModels}
          cachedConfig={configs.sentenceConfig}
          mappingTable={this.sentenceMappingTable}
          BasisAnkiMappingTable={this.BasisAnkiMappingTable}
        />,
        "sentence",
      ),
    ];

    return (
      <>
        <Tab tabsContainerClass="tabMenu" activeTabPane={defaultActiveIndex}>
          {tabPanes.map((tabPane) => {
            return (
              <TabPane tabItem={tabPane.tabItem} key={tabPane.key}>
                {tabPane.children}
              </TabPane>
            );
          })}
        </Tab>
        {
          <footer className="footer">
            {!connectedAnki && (
              <button
                title="尝试重新连接到Anki"
                className="button warn"
                onClick={reconnectAnkiConnect}
              >
                重连 {reconnectTip}
              </button>
            )}
            <button className="button right" onClick={this.closeOptions}>
              退出
            </button>
            <button className="button right" onClick={this.savaConfig}>
              保存 {savaTip}
            </button>
          </footer>
        }
      </>
    );
  }
}
