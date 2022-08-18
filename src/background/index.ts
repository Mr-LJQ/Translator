import { AnkiConnection } from "../anki/index";
import Collins_en_cn from "../dictionary/index";

import {
  onMessage,
  onCommand,
  setStorage,
  getStorage,
  postFrontend,
  setBadgeText,
  executeScript,
  onStorageChange,
  addContextMenuItem,
  onContextMenuClick,
} from "../utils/extensions-api";
import { Command } from "../utils/command";

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//声明引入
import type { SendResponse } from "../utils/extensions-api";

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////

//获取翻译词典
const collins = new Collins_en_cn();

//获取anki
const anki = new AnkiConnection();

//初始化AnkiConfig
getStorage(
  ["wordConfig", "phraseConfig", "sentenceConfig", "ankiConnectionURL"],
  (config) => {
    anki.updateAnkiConfig(config);
  }
);

//初始化isOpen标识文本
getStorage({
  isOpen(value) {
    switchBadgeText(!!value);
  },
});

//监听用户配置更新
onStorageChange({
  isOpen: (_, value) => switchBadgeText(!!value),
  wordConfig: (_, wordConfig) => anki.updateAnkiConfig({ wordConfig }),
  phraseConfig: (_, phraseConfig) => anki.updateAnkiConfig({ phraseConfig }),
  sentenceConfig: (_, sentenceConfig) =>
    anki.updateAnkiConfig({ sentenceConfig }),
  ankiConnectionURL: (_, ankiConnectionURL) =>
    anki.updateAnkiConfig({ ankiConnectionURL }),
});

//监听用户快捷键，用于开关拓展
onCommand({
  enabled: () => {
    getStorage({
      isOpen: (isOpen) => setStorage({ isOpen: !isOpen }),
    });
  },
  show_shower: () => {
    postFrontend(Command.ShowIframe);
  },
  search_bar: () => postFrontend(Command.SwitchSearchBar),
});

//在鼠标右键菜单中添加一项 “注入划词助手” 的选项，
//并在其点击后注入相应脚本，使其能够通过划词进行翻译
addContextMenuItem(
  {
    contexts: ["frame"],
    title: "注入划词助手",
  },
  () => {
    //避免重复注入脚本
    const injectedFrames: number[] = [];
    //监听注入划词助手栏目的点击
    onContextMenuClick((info, tab) => {
      const { frameId } = info;
      if (!frameId) throw new Error("info.frameId is undefined");
      if (injectedFrames.includes(frameId)) return;
      injectedFrames.push(frameId);
      executeScript({
        frameId: info.frameId,
        file: "/injectScript.js",
      });
    });
  }
);

//监听所有发生到后端的请求，并进行处理
onMessage(async ({ command, data }, sendResponse: (response?: any) => void) => {
  let response;
  switch (command) {
    case Command.TranslateText:
      response = await collins.translate(data);
      sendResponse(response);
      break;
    case Command.TranslateInjectText:
      response = await collins.translate(data.text);
      postFrontend(Command.ShowInjectTranslation, {
        translatedData: response,
        point: data.point,
      });
      break;
    case Command.AddNote:
      response = await anki.addNote(data);
      sendResponse(response);
      break;
    case Command.RelearnNote:
      response = await anki.relearnCards(data);
      sendResponse(response);
      break;
    case Command.GetDeckNames:
      response = await anki.getDeckNames();
      sendResponse(response);
      break;
    case Command.GetModelNames:
      response = await anki.getModelNames();
      sendResponse(response);
      break;
    case Command.GetVersion:
      response = await anki.getVersion();
      sendResponse(response);
      break;
    case Command.GetModelFieldNames:
      response = await anki.getModelFieldNames(data);
      sendResponse(response);
      break;
    default:
      throw new Error("存在未处理的指令:" + command);
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//辅助函数
function switchBadgeText(isOpen: boolean) {
  isOpen ? setBadgeText({ text: "" }) : setBadgeText({ text: "off" });
}
