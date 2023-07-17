import { ShowData } from "@/types";
import { Command } from "@/configuration";

//向前端发送消息的函数
export async function postFrontend(command: Command.ShowIframe): Promise<void>;
export async function postFrontend(
  command: Command.OpenSearchBox
): Promise<void>;
export async function postFrontend(
  command: Command.ShowInjectTranslation,
  data: Required<ShowData>
): Promise<void>;
export async function postFrontend(
  command: Command,
  data?: any
): Promise<void> {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true }, function (tabs) {
      tabs.forEach((tab) => {
        if (!tab.id) return;
        chrome.tabs.sendMessage(tab.id, { command, data }, function (response) {
          resolve(response);
        });
      });
    });
  });
}
