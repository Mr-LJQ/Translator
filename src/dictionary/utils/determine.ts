import {
  WordData,
  ErrorData,
  PhraseData,
  SentenceData,
  TranslationResult,
} from "../types";

type ExtractType<T extends TranslationResult> = T["type"] 

function typeOf(
  thing: TranslationResult,
  type: ExtractType<TranslationResult>
) {
  return (
    Object.prototype.hasOwnProperty.call(thing, "type") && thing.type === type
  );
}

export function isErrorData(thing: TranslationResult): thing is ErrorData {
  return typeOf(thing, "ERROR");
}

export function isWordData(thing: TranslationResult): thing is WordData {
  return typeOf(thing, "WORD");
}

export function isPhraseData(thing: TranslationResult): thing is PhraseData {
  return typeOf(thing, "PHRASE");
}

export function isSentenceData(
  thing: TranslationResult
): thing is SentenceData {
  return typeOf(thing, "SENTENCE");
}
