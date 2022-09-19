import create from "zustand";
import { FieldNamesObject } from "../types";
import { Command } from "@/configuration";
import { isAnkiResponseError } from "@/anki";
import { postBackend } from "@/extensions-api";

interface State {
  version?: number;
  deckNames: string[];
  modelNames: string[];
  alertMessages: string[];
  fieldNamesObject: FieldNamesObject;
  fetchAnki: () => Promise<void>;
}

export const useAnkiStore = create<State>((set) => ({
  deckNames: [],
  modelNames: [],
  alertMessages: [],
  version: undefined,
  fieldNamesObject: {},
  async fetchAnki() {
    //每次刷新都初始化,以避免上次的状态遗留影响本次的状态
    const result: Omit<State, "fetchAnki"> = {
      deckNames: [],
      modelNames: [],
      alertMessages: [],
      version: undefined,
      fieldNamesObject: {},
    };
    const response = await postBackend(Command.GetVersion);
    if (isAnkiResponseError(response)) {
      result.alertMessages.push(response.message);
      return set(result);
    } else {
      result.version = response.data;
    }

    const [getDeckNamesResponse, getModelNamesResponse] = await Promise.all([
      //注意顺序问题
      postBackend(Command.GetDeckNames),
      postBackend(Command.GetModelNames),
    ]);

    if (isAnkiResponseError(getDeckNamesResponse)) {
      result.alertMessages.push(getDeckNamesResponse.message);
    } else {
      result.deckNames = getDeckNamesResponse.data;
    }

    if (isAnkiResponseError(getModelNamesResponse)) {
      result.alertMessages.push(getModelNamesResponse.message);
      return set(result);
    }
    const modelNames = getModelNamesResponse.data;
    result.modelNames = modelNames;
    const fieldNamesObject: FieldNamesObject = {};
    const promiseArray = modelNames!.map((modelName) => {
      return postBackend(Command.GetModelFieldNames, modelName);
    });
    const responses = await Promise.all(promiseArray);
    responses.forEach((item, idx) => {
      const modelName = modelNames![idx]!;
      if (isAnkiResponseError(item)) {
        result.alertMessages.push(item.message);
      } else {
        fieldNamesObject[modelName] = item.data;
      }
    });
    result.fieldNamesObject = fieldNamesObject;

    return set(result);
  },
}));

export const ankiStoreSubscribe = useAnkiStore.subscribe;
