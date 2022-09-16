import {
  WordData,
  ErrorData,
  PhraseData,
  SentenceData,
  TranslationResult,
} from "../types";

type ExtractType<T extends TranslationResult> = T["type"];

function typeOf(thing: unknown, type: ExtractType<TranslationResult>) {
  //排除非引用数据类型以及函数
  if (thing === null || typeof thing !== "object") return false;
  return (
    Object.prototype.hasOwnProperty.call(thing, "type") &&
    (thing as { type: string }).type === type
  );
}

export function isErrorData(thing: unknown): thing is ErrorData {
  return typeOf(thing, "ERROR");
}

export function isWordData(thing: unknown): thing is WordData {
  return typeOf(thing, "WORD");
}

export function isPhraseData(thing: unknown): thing is PhraseData {
  return typeOf(thing, "PHRASE");
}

export function isSentenceData(thing: unknown): thing is SentenceData {
  return typeOf(thing, "SENTENCE");
}
