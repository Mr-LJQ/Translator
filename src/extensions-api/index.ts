export {
  getStorageByArray,
  getStorageByObject,
  setStorage,
  onStorageChange,
} from "./storage";

export { onCommand } from "./commands";
export { postBackend, onMessage, getURL, openOptionsPage } from "./runtime";
export { executeScript, postFrontend } from "./tabs";
export { setBadgeText } from "./browserAction";
export { addContextMenuItem, onContextMenuClick } from "./contextMenus";
export {
  CommonConfig,
  WordFields,
  PhraseFields,
  SentenceFields,
  Storage,
  ModelFields,
  TabPanelName,
  WordConfig,
  PhraseConfig,
  SentenceConfig,
  ConfigKeys,
  CheckWordDuplicate,
  CheckPhraseDuplicate,
  CheckSentenceDuplicate,
  DuplicateConfigKeys,
} from "./types";
