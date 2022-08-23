import create from "zustand";
import omit from "lodash.omit";
import { immer } from "zustand/middleware/immer";
import {
  Storage,
  WordConfig,
  PhraseConfig,
  CheckWordDuplicate,
  CheckPhraseDuplicate,
  CheckSentenceDuplicate,
  SentenceConfig,
  getStorageByArray,
  ConfigKeys,
  DuplicateConfigKeys,
} from "@/extensions-api";
import { DuplicateConfigName, ConfigName } from "../types";

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

type State = StorageStore & Handler;

export const useStorageStore = create<State, [["zustand/immer", never]]>(
  immer((set) => {
    function updateConfig(
      configName: "wordConfig",
      name: keyof WordConfig,
      value: string
    ): void;
    function updateConfig(
      configName: "phraseConfig",
      name: keyof PhraseConfig,
      value: string
    ): void;
    function updateConfig(
      configName: "sentenceConfig",
      name: keyof SentenceConfig,
      value: string
    ): void;
    function updateConfig(
      configName: ConfigName,
      name: ConfigKeys,
      value: string
    ): void {
      set((state) => {
        //@ts-ignore 是能够正确配对的
        state[configName][name] = value;
      });
    }

    function updateDuplicateConfig(
      configName: "checkWordDuplicate",
      name: keyof CheckWordDuplicate,
      value: boolean
    ): void;
    function updateDuplicateConfig(
      configName: "checkPhraseDuplicate",
      name: keyof CheckPhraseDuplicate,
      value: boolean
    ): void;
    function updateDuplicateConfig(
      configName: "checkSentenceDuplicate",
      name: keyof CheckSentenceDuplicate,
      value: boolean
    ): void;
    function updateDuplicateConfig(
      configName: DuplicateConfigName,
      name: DuplicateConfigKeys,
      value: boolean
    ): void {
      set((state) => {
        //@ts-ignore 是能够正确配对的
        state[configName][name] = value;
      });
    }
    return {
      fetchStorage() {
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
      },
      updateConfig,
      updateDuplicateConfig,
      updateOtherConfig<
        K extends keyof Pick<
          State,
          "ankiConnectionMethod" | "ankiConnectionURL" | "checkedTabPanel"
        >
      >(name: K, value: State[K]) {
        set((state) => {
          state[name] = value;
        });
      },
    } as unknown as State; //设计上是，必须先调用 fetchStorage获取到 相应的数据后，才能够调用其它方法的
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
