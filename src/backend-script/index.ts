import { AnkiConnection, AnkiConfig } from "@/anki";
import { Command } from "@/configuration";
import { Dictionary } from "@/dictionary";
import {
  onCommand,
  onMessage,
  setStorage,
  postFrontend,
  setBadgeText,
  executeScript,
  openOptionsPage,
  onStorageChange,
  getStorageByObject,
  addContextMenuItem,
  onContextMenuClick,
  getStorageByArray,
} from "@/extensions-api";
//获取词典
const dictionary = new Dictionary();
//获取anki
const anki = new AnkiConnection();

//初始化AnkiConfig
//值是必定存在的，因为 getStorage 内部会保证在没值的时候使用默认值，而默认值设定了相应的值
getStorageByArray(
  [
    "wordConfig",
    "phraseConfig",
    "sentenceConfig",
    "ankiConnectionURL",
    "checkWordDuplicate",
    "checkPhraseDuplicate",
    "checkSentenceDuplicate",
  ],
  (config) => {
    anki.updateAnkiConfig<AnkiConfig>(config); //初始化时，必须包括所有的 AnkiConfig 配置
  }
);
//监听用户配置更新
onStorageChange({
  wordConfig: (_, wordConfig) => anki.updateAnkiConfig({ wordConfig }),
  phraseConfig: (_, phraseConfig) => anki.updateAnkiConfig({ phraseConfig }),
  sentenceConfig: (_, sentenceConfig) =>
    anki.updateAnkiConfig({ sentenceConfig }),
  ankiConnectionURL: (_, ankiConnectionURL) =>
    anki.updateAnkiConfig({ ankiConnectionURL }),
  checkPhraseDuplicate: (_, checkPhraseDuplicate) =>
    anki.updateAnkiConfig({ checkPhraseDuplicate }),
  checkSentenceDuplicate: (_, checkSentenceDuplicate) =>
    anki.updateAnkiConfig({ checkSentenceDuplicate }),
  checkWordDuplicate: (_, checkWordDuplicate) =>
    anki.updateAnkiConfig({ checkWordDuplicate }),
});

//初始化isOpen标识文本
getStorageByObject({
  switchHotkeyAndSelectionListener(value) {
    switchBadgeText(value);
  },
});
onStorageChange({
  switchHotkeyAndSelectionListener(_, value) {
    return switchBadgeText(value);
  },
});

//监听用户快捷键，用于开关拓展
onCommand({
  switch_hotkey_and_selection_listener() {
    getStorageByObject({
      switchHotkeyAndSelectionListener(_isOpen) {
        return setStorage({
          switchHotkeyAndSelectionListener: !_isOpen,
        });
      },
    });
  },
  show_translation_page() {
    postFrontend(Command.ShowIframe);
  },
  open_search_box() {
    return postFrontend(Command.OpenSearchBox);
  },
});

//在鼠标右键菜单中添加一项 “注入翻译助手” 的选项，
//并在其点击后注入相应脚本，使其能够通过划词进行翻译
addContextMenuItem(
  {
    contexts: ["frame"],
    title: "注入翻译助手",
  },
  function () {
    //避免重复注入脚本
    const injectedFrames: number[] = [];
    //监听注入划词助手栏目的点击
    onContextMenuClick(function (info) {
      const frameId = info.frameId;
      if (!frameId) {
        throw new Error("info.frameId is undefined");
      }
      if (injectedFrames.includes(frameId)) return;
      injectedFrames.push(frameId);
      executeScript({
        frameId: info.frameId,
        file: "/injectScript.js",
      });
    });
  }
);
//监听所有发送到后端的请求，并进行处理
onMessage(async ({ command, data, sendResponse }) => {
  switch (command) {
    case Command.TranslateText: {
      const response = await dictionary.translate(data);
      sendResponse(response);
      break;
    }
    case Command.TranslateInjectText: {
      const response = await dictionary.translate(data.text);
      postFrontend(Command.ShowInjectTranslation, {
        translatedData: response,
        point: data.point,
      });
      break;
    }
    case Command.AddNote: {
      const response = await anki.addNote(data);
      sendResponse(response);
      break;
    }
    case Command.RelearnNote: {
      const response = await anki.relearnCards(data);
      sendResponse(response);
      break;
    }
    case Command.GetDeckNames: {
      const response = await anki.getDeckNames();
      sendResponse(response);
      break;
    }
    case Command.GetModelNames: {
      const response = await anki.getModelNames();
      sendResponse(response);
      break;
    }
    case Command.GetVersion: {
      const response = await anki.getVersion();
      sendResponse(response);
      break;
    }
    case Command.GetModelFieldNames: {
      const response = await anki.getModelFieldNames(data);
      sendResponse(response);
      break;
    }
    case Command.OpenOptionsPage: {
      setStorage({ checkedTabPanel: data }, () => {
        openOptionsPage();
      });
      break;
    }
    default:
      throw new Error("存在未处理的指令:" + Command[command]);
  }
});

function switchBadgeText(isOpen: boolean) {
  isOpen
    ? setBadgeText({
        text: "",
      })
    : setBadgeText({
        text: "off",
      });
}
