import React from "react";
import "./index.less";

import { postBackend } from "../utils/messager";
import { Dispatch, getDeckAndModels, tabPaneDataFactory } from "./utils/index";

import BasisConfig from "./BasisConfig";
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
} from "../../types/index";

interface State {
  deckAndModels: DeckAndModels;
  connectedAnki: boolean;
  savaTip:string;
  reconnectTip:string
}

interface Props {
  defaultActiveIndex?: string;
  connectedAnki: boolean;
  cachedConfigs: {
    wordConfig: WordConfig & Dispatch;
    phraseConfig: PhraseConfig & Dispatch;
    sentenceConfig: SentenceConfig & Dispatch;
  };
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
  };
  constructor(props: Props) {
    super(props);

    this.savaConfig = this.savaConfig.bind(this);
    this.closeOptions = this.closeOptions.bind(this);
    this.setDeckAndModels = this.setDeckAndModels.bind(this);
    this.reconnectAnkiConnect = this.reconnectAnkiConnect.bind(this);
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
    const version = await postBackend("getVersion");
    if (!version) {
      setTimeout(() => {
        this.setState({reconnectTip:""})
      }, 1000);
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
    //去除dispatch
    let {
      wordConfig: { dispatch: W, ...wordConfig },
      phraseConfig: { dispatch: P, ...phraseConfig },
      sentenceConfig: { dispatch: S, ...sentenceConfig },
    } = configs;
    const cached: Partial<CachedOptions> = {
      wordConfig,
      phraseConfig,
      sentenceConfig,
    };
    chrome.storage.local.set(cached,() => {
      this.setState({savaTip:"✔"})
      setTimeout(() => {
        this.setState({savaTip:""})
      }, 1000);
    });
  }

  render() {
    const { reconnectAnkiConnect } = this;
    const { defaultActiveIndex = "0", cachedConfigs } = this.props;
    const { deckAndModels, connectedAnki, savaTip ,reconnectTip} = this.state;

    const configs = cachedConfigs;
    const tabPanes = [
      tabPaneDataFactory("基础配置", <BasisConfig />),
      tabPaneDataFactory(
        "单词配置",
        <AnkiConfig
          headerTitle="单词配置"
          connectedAnki={connectedAnki}
          deckAndModels={deckAndModels}
          cachedConfig={configs.wordConfig}
          mappingTable={this.wordMappingTable}
          BasisAnkiMappingTable={this.BasisAnkiMappingTable}
        />
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
        />
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
        />
      ),
    ];

    return (
      <>
        <Tab tabsContainerClass="tabMenu" initActiveKey={defaultActiveIndex}>
          {tabPanes.map((tabPane, index) => {
            return (
              <TabPane tabItem={tabPane.tabItem} key={index}>
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
