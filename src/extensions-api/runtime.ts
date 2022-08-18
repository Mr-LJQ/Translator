import { Command } from "@/configuration";
import { ShowData, Point } from "@/types";
import { NoteData } from "@/translation-page";
import {
  AddNoteReturnType,
  GetVersionReturnType,
  RelearnCardsReturnType,
  GetDeckNamesReturnType,
  GetModelNamesReturnType,
  GetModelFieldNamesReturnType,
} from "@/anki";
import { TranslationResult } from "@/dictionary";
export function getURL(name: string) {
  return chrome.runtime.getURL(name);
}

export function openOptionsPage() {
  chrome.runtime.openOptionsPage();
}

export type SendResponse = Parameters<
  Parameters<typeof chrome.runtime.onMessage.addListener>["0"]
>["2"];

//向后端发送消息的函数
export async function postBackend(
  command: Command.GetDeckNames
): Promise<GetDeckNamesReturnType>;
export async function postBackend(
  command: Command.GetModelNames
): Promise<GetModelNamesReturnType>;
export async function postBackend(
  command: Command.GetVersion
): Promise<GetVersionReturnType>;
export async function postBackend(
  command: Command.GetModelFieldNames,
  data: string
): Promise<GetModelFieldNamesReturnType>;
export async function postBackend(
  command: Command.AddNote,
  data: NoteData
): Promise<AddNoteReturnType>;
export async function postBackend(
  command: Command.RelearnNote,
  data: number[]
): Promise<RelearnCardsReturnType>;
export async function postBackend(
  command: Command.TranslateText,
  data: string
): Promise<TranslationResult>;
export async function postBackend(
  command: Command.TranslateInjectText,
  data: { text: string; point: Point }
): Promise<void>;
export async function postBackend(command: Command, data?: any): Promise<any> {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ command, data }, function (response) {
      resolve(response);
    });
  });
}

interface Handler {
  (args: {
    command: Command.ShowInjectTranslation;
    data: ShowData;
    sendResponse: () => void;
  }): Promise<void>;
  (args: {
    command: Command.TranslateInjectText;
    data: { text: string; point: Point };
    sendResponse: () => void;
  }): Promise<void>;
  (args: {
    command: Command.OpenSearchBar;
    data: undefined;
    sendResponse: () => void;
  }): Promise<void>;
  (args: {
    command: Command.ShowIframe;
    data: undefined;
    sendResponse: () => void;
  }): Promise<void>;
  (args: {
    command: Command.GetVersion;
    data: undefined;
    sendResponse: (data: GetVersionReturnType) => void;
  }): Promise<void>;
  (args: {
    command: Command.GetDeckNames;
    data: undefined;
    sendResponse: (data: GetDeckNamesReturnType) => void;
  }): Promise<void>;
  (args: {
    command: Command.GetModelNames;
    data: undefined;
    sendResponse: (data: GetModelNamesReturnType) => void;
  }): Promise<void>;
  (args: {
    command: Command.GetModelFieldNames;
    data: string;
    sendResponse: (data: GetModelFieldNamesReturnType) => void;
  }): Promise<void>;
  (args: {
    command: Command.AddNote;
    data: NoteData;
    sendResponse: (data: AddNoteReturnType) => void;
  }): Promise<void>;
  (args: {
    command: Command.RelearnNote;
    data: number[];
    sendResponse: (data: RelearnCardsReturnType) => void;
  }): Promise<void>;
  (args: {
    command: Command.TranslateText;
    data: string;
    sendResponse: (data: TranslationResult) => void;
  }): Promise<void>;
}
//监听拓展不同模块间消息传递的函数
export function onMessage(handler: Handler) {
  chrome.runtime.onMessage.addListener(function (
    message,
    sender,
    _sendResponse
  ) {
    //主要用于消除因为 return true,但却没有调用 sendResponse 而造成的报错。
    let called = false;
    handler({
      ...message,
      sendResponse(...args: any[]) {
        called = true;
        return _sendResponse(...args);
      },
    }).then(function () {
      if (called) return;

      _sendResponse();
    });
    return true; //为了使sendResponse可以异步调用，这是必须的
  });
}
