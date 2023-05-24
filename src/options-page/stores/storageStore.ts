import create from "zustand";
import omit from "lodash.omit";
import { immer } from "zustand/middleware/immer";
import { getStorageByArray, TabPanelName } from "@/extensions-api";
import type {
  ConfigKeys,
  Storage,
  DuplicateConfigKeys,
} from "@/extensions-api";
import type { DuplicateConfigName, ConfigName } from "../types";
import { DEFAULT_ANKI_CONNECTION_URL } from "@/configuration";

type State = StorageStore & Handler;
type OtherConfigKeys = keyof Pick<
  State,
  "ankiConnectionMethod" | "ankiConnectionURL" | "checkedTabPanel"
>;

type StorageStore = Pick<
  Storage,
  | "wordConfig"
  | "phraseConfig"
  | "sentenceConfig"
  | "checkWordDuplicate"
  | "checkPhraseDuplicate"
  | "checkSentenceDuplicate"
  | "checkedTabPanel"
  | "ankiConnectionURL"
  | "ankiConnectionMethod"
>;

export interface Handler {
  fetchStorage: () => void;
  updateConfig: (
    configName: ConfigName,
    name: ConfigKeys,
    value: string
  ) => void;
  updateDuplicateConfig: (
    configName: DuplicateConfigName,
    name: DuplicateConfigKeys,
    value: boolean
  ) => void;
  updateOtherConfig: <
    K extends keyof Pick<
      State,
      "ankiConnectionMethod" | "ankiConnectionURL" | "checkedTabPanel"
    >
  >(
    name: K,
    value: State[K]
  ) => void;
}

export const useStorageStore = create<State, [["zustand/immer", never]]>(
  immer((set) => {
    function updateConfig(
      configName: ConfigName | DuplicateConfigName,
      name: ConfigKeys | DuplicateConfigKeys,
      value: string | boolean
    ): void {
      set((state) => {
        const target = state[configName];
        if (!Object.prototype.hasOwnProperty.call(target, name))
          /**
           * 在设计上传入的 configName 与 name 是一一对应的。
           *  例如 configName 为 "wordConfig" 时， name 的类型应该是 keyof WordConfig
           *   因此当相应的属性不存在时，表面代码中存在BUG需要进行修复。
           */
          throw new Error(
            `传入的${configName},${name}属性并不一一对应,这是一个不符合设计的BUG.`
          );
        //@ts-ignore 是能够正确配对的
        target[name] = value;
      });
    }

    function fetchStorage() {
      getStorageByArray(
        [
          "wordConfig",
          "phraseConfig",
          "sentenceConfig",
          "checkWordDuplicate",
          "checkPhraseDuplicate",
          "checkSentenceDuplicate",
          "ankiConnectionMethod",
          "ankiConnectionURL",
          "checkedTabPanel",
        ],
        (val) => {
          set(val);
        }
      );
    }

    function updateOtherConfig<K extends OtherConfigKeys>(
      name: K,
      value: State[K]
    ) {
      set((state) => {
        state[name] = value;
      });
    }
    return {
      fetchStorage,
      updateConfig,
      updateOtherConfig,
      updateDuplicateConfig: updateConfig,
      checkedTabPanel: TabPanelName.Home,
      ankiConnectionMethod: "AnkiConnection",
      ankiConnectionURL: DEFAULT_ANKI_CONNECTION_URL,
      wordConfig: {},
      phraseConfig: {},
      sentenceConfig: {},
      checkWordDuplicate: {},
      checkPhraseDuplicate: {},
      checkSentenceDuplicate: {},
    };
  })
);

export const getStorage = function (): StorageStore {
  const state = useStorageStore.getState();
  return omit(state, [
    "fetchStorage",
    "updateConfig",
    "updateOtherConfig",
    "updateDuplicateConfig",
  ]);
};

export const fetchStorage = useStorageStore.getState().fetchStorage;

export const storageStoreSubscribe = useStorageStore.subscribe;
