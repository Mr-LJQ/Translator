import { SentenceData } from "@/dictionary";

export interface WordNoteData {
  word: string;
  star_amount: string;
  translation: string;
  part_of_speech: string;

  am?: string;
  en?: string;
  am_audio?: string;
  en_audio?: string;
  definition?: string;
  example_audio?: string;
  example_sentence?: string;
  definition_audio?: string;
  example_sentence_translation?: string;
}

export interface PhraseNoteData {
  phrase: string;
  phrase_audio: string;
  translations: string;

  example_sentence_1?: string;
  example_sentence_translation_1?: string;
  example_audio_1?: string;
  example_sentence_2?: string;
  example_sentence_translation_2?: string;
  example_audio_2?: string;
  example_sentence_3?: string;
  example_sentence_translation_3?: string;
  example_audio_3?: string;
}

export type SentenceNoteData = SentenceData;

export type NoteData = WordNoteData | PhraseNoteData | SentenceNoteData;
