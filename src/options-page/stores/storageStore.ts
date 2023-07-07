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
