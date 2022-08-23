export {
  getStorageByArray,
  getStorageByObject,
  setStorage,
  onStorageChange,
} from "./storage";

export { onCommand } from "./commands";
export { setBadgeText } from "./browserAction";
export { executeScript, postFrontend } from "./tabs";
export { addContextMenuItem, onContextMenuClick } from "./contextMenus";
export { postBackend, onMessage, getURL, openOptionsPage } from "./runtime";
export { TabPanelName } from "./types";
export type {
  Storage,
  WordFields,
  ModelFields,
  PhraseFields,
  SentenceFields,
  WordConfig,
  PhraseConfig,
  CommonConfig,
  SentenceConfig,
  CheckWordDuplicate,
  CheckPhraseDuplicate,
  CheckSentenceDuplicate,
  ConfigKeys,
  DuplicateConfigKeys,
} from "./types";
