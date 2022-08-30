import {
  isPhraseData,
  isSentenceData,
  isWordData,
  TranslationResult,
} from "@/dictionary";
import { __main__ } from ".";
import { AnkiButtonInfoObject, Status } from "../types";

/**
 * 纯函数，用于根据 data 创建 AnkiButtonInfoObject 数据
 */
export function createHistory(data: TranslationResult) {
  const ankiButtonInfoObject: AnkiButtonInfoObject = { [__main__]: [] };
  //if (data.type === "ERROR") {}
  if (isPhraseData(data) || isSentenceData(data)) {
    ankiButtonInfoObject[__main__]!.push({
      status: Status.Add,
      message: "添加到Anki",
    });
  }
  if (isWordData(data)) {
    data.translationList?.forEach(() => {
      ankiButtonInfoObject[__main__]!.push({
        status: Status.Add,
        message: "添加到Anki",
      });
    });
    //有多少个独立的翻译短语，就有多少个添加按钮
    if (data.translations) {
      Object.entries(data.translations).forEach(([key, value]) => {
        ankiButtonInfoObject[key] = value.map(() => {
          return {
            status: Status.Add,
            message: "添加到Anki",
          };
        });
      });
    }
  }

  return {
    data,
    scrollTop: 0,
    ankiButtonInfoObject,
  };
}
