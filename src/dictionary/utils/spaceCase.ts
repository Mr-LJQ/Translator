import words from "lodash.words";
export function spaceCase(text: string) {
  return words(`${text}`.replace(/['\u2019]/g, "")).reduce(
    (result, word, index) => result + (index ? " " : "") + word,
    ""
  );
}
