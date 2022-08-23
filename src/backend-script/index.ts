import { AnkiConnection } from "@/anki";
import { Command } from "@/configuration";
import { Collins_en_cn } from "@/dictionary";
import {
  onCommand,
  onMessage,
  setStorage,
  postFrontend,
  setBadgeText,
  executeScript,
  onStorageChange,
  getStorageByObject,
  addContextMenuItem,
  onContextMenuClick,
} from "@/extensions-api";
//获取词典
const collins = new Collins_en_cn();
//获取anki
const anki = new AnkiConnection();

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
        console.error(new Error("info.frameId is undefined"));
        return;
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
      const response = await collins.translate(data);
      sendResponse(response);
      break;
    }
    case Command.TranslateInjectText: {
      const response = await collins.translate(data.text);
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
    default:
      throw new Error("存在未处理的指令:" + command);
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
