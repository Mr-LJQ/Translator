import create from "zustand";
import { FieldNamesObject } from "../types";
import { Command } from "@/configuration";
import { AnkiResponseStatus } from "@/anki";
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

    const {
      data: version,
      status: status0,
      message: message0,
    } = await postBackend(Command.GetVersion);
    if (status0 !== AnkiResponseStatus.Success) {
      result.alertMessages.push(message0);
      return set(result);
    } else {
      result.version = version;
    }

    const [getDeckNamesResponse, getModelNamesResponse] = await Promise.all([
      //注意顺序问题
      postBackend(Command.GetDeckNames),
      postBackend(Command.GetModelNames),
    ]);

    const {
      data: deckNames,
      status: status1,
      message: message1,
    } = getDeckNamesResponse;
    if (status1 !== AnkiResponseStatus.Success) {
      result.alertMessages.push(message1);
    } else {
      result.deckNames = deckNames!;
    }

    const {
      data: modelNames,
      status: status2,
      message: message2,
    } = getModelNamesResponse;
    if (status2 !== AnkiResponseStatus.Success) {
      result.alertMessages.push(message2);
      return set(result);
    }
    result.modelNames = modelNames!;

    const fieldNamesObject: FieldNamesObject = {};
    const promiseArray = modelNames!.map((modelName) => {
      return postBackend(Command.GetModelFieldNames, modelName);
    });
    const responses = await Promise.all(promiseArray);
    responses.forEach((item, idx) => {
      const modelName = modelNames![idx]!;
      const { status, message, data } = item;
      if (status !== AnkiResponseStatus.Success) {
        result.alertMessages.push(message);
      } else {
        fieldNamesObject[modelName] = data!;
      }
    });
    result.fieldNamesObject = fieldNamesObject;

    return set(result);
  },
}));

export const ankiStoreSubscribe = useAnkiStore.subscribe;
