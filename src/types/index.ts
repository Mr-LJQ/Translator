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
