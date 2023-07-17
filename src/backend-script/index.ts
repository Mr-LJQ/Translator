import { AnkiConnection, AnkiConfig } from "@/anki";
import { Command } from "@/configuration";
import { Dictionary } from "@/dictionary";
import { switchBadgeText } from "./utils";
import {
  onCommand,
  onMessage,
  setStorage,
  postFrontend,
  executeScript,
  openOptionsPage,
  onStorageChange,
  getStorageByObject,
  createMenuItem,
  onContextMenuClick,
  getStorageByArray,
  getSessionStorage,
  setSessionStorage,
  onInstalled,
  removeSessionStorage,
} from "@/extensions-api";

//初始化isOpen标识文本
getStorageByObject({
  switchHotkeyAndSelectionListener(value) {
    switchBadgeText(value);
  },
});

//监听所有发送到后端的请求，并进行处理
onMessage(async ({ command, data, sendResponse }) => {
  switch (command) {
    case Command.TranslateText: {
      const dictionary = new Dictionary();
      const response = await dictionary.translate(data);
      sendResponse(response);
      return;
    }
    case Command.TranslateInjectText: {
      const dictionary = new Dictionary();
      const response = await dictionary.translate(data.text);
      postFrontend(Command.ShowInjectTranslation, {
        translatedData: response,
        point: data.point,
      });
      return;
    }
    case Command.OpenOptionsPage: {
      setStorage({ checkedTabPanel: data }, () => {
        openOptionsPage();
      });
      return;
    }
  }

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
    async (config) => {
      anki.updateAnkiConfig<AnkiConfig>(config); //初始化时，必须包括所有的 AnkiConfig 配置
      switch (command) {
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
        default:
          throw new Error(`存在未处理的指令:${Command[command]},这是一个BUG`);
      }
    }
  );
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

//在鼠标右键菜单中添加一项 “注入翻译助手” 的选项
onInstalled(() => {
  createMenuItem(
    {
      id: "inject-translation-js", //用于区分多个项的唯一ID,其作用是让点击监听可以通过该ID区分是谁触发
      contexts: ["frame"], //仅在鼠标位于 iframe 之上点击右键才会显示该项
      title: "注入翻译助手", //按钮的文本
    },
    () => {
      if (chrome.runtime.lastError) {
        throw new Error(chrome.runtime.lastError.message);
      }
    }
  );
});

//监听"注入翻译助手"按钮的单击，点击后注入脚本以处理 iframe 内的翻译需求
onContextMenuClick(async function (info, tab) {
  const frameId = info.frameId;
  const tabId = tab?.id;
  if (!frameId || !tabId) {
    throw new Error(
      "frameId 或 tabId 值为falsy,这是一个意料之外的情况,请提供可供复现该情况的信息以让作者修复该BUG"
    );
  }
  //单例模式，避免重复添加
  const singleId = `${tabId}-${frameId}`;
  const cacheObject = await getSessionStorage({
    injectScriptOnceObject: {},
  });
  const onceObject = cacheObject.injectScriptOnceObject || {};
  if (onceObject[singleId]) return;
  executeScript(
    {
      target: {
        frameIds: [frameId],
        tabId: tabId,
      },
      files: ["/injectScript.js"],
    },
    async () => {
      if (chrome.runtime.lastError) {
        throw new Error(chrome.runtime.lastError.message);
      }
      onceObject[singleId] = true;
      try {
        await setSessionStorage({
          injectScriptOnceObject: onceObject,
        });
      } catch (e) {
        await removeSessionStorage("translationCachedObject");
        setSessionStorage({
          injectScriptOnceObject: onceObject,
        });
      }
    }
  );
});
