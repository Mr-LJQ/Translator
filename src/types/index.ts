import { TranslationResult } from "@/dictionary";
export interface Point {
  x: number;
  y: number;
}

export type HotKey = Extract<
  "shiftKey" | "ctrlKey" | "altKey",
  keyof KeyboardEvent
>;

export type GetPoint = () => Point;

export type TranslateAndDisplayText = (text: string) => void;

export interface ShowData {
  translatedData: TranslationResult;
  point?: Point;
}

export type extractPromiseType<T extends Promise<any>> = T extends Promise<
  infer R
>
  ? R
  : never;

export type FunctionAny = (...args: any[]) => void;

export type ReturnPromiseType<T extends (...args: any[]) => Promise<any>> =
  T extends (...args: any[]) => Promise<infer R> ? R : never;

export type PartialOptional<T, K extends keyof T> = Omit<T, K> &
  Partial<Pick<T, K>>;
