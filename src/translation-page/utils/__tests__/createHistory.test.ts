import { createHistory } from "../createHistory";
import { wordData, phraseData, sentenceData } from "@/test";
import { __main__ } from "../";

test("正确处理单词数据", () => {
  const { data, ankiButtonInfoObject, scrollTop } = createHistory(wordData);
  expect(scrollTop).toBe(0);
  expect(data).toBe(wordData);
  expect(ankiButtonInfoObject).toEqual({
    "": [
      {
        message: "添加到Anki",
        status: 0,
      },
    ],
    "int.": [
      {
        message: "添加到Anki",
        status: 0,
      },
    ],
    "n.": [
      {
        message: "添加到Anki",
        status: 0,
      },
      {
        message: "添加到Anki",
        status: 0,
      },
      {
        message: "添加到Anki",
        status: 0,
      },
      {
        message: "添加到Anki",
        status: 0,
      },
    ],
    "v.": [
      {
        message: "添加到Anki",
        status: 0,
      },
    ],
    [__main__]: [
      {
        message: "添加到Anki",
        status: 0,
      },
      {
        message: "添加到Anki",
        status: 0,
      },
      {
        message: "添加到Anki",
        status: 0,
      },
    ],
  });
});

test("正确处理短语数据", () => {
  const { data, ankiButtonInfoObject, scrollTop } = createHistory(phraseData);
  expect(scrollTop).toBe(0);
  expect(data).toBe(phraseData);
  expect(ankiButtonInfoObject).toEqual({
    [__main__]: [
      {
        message: "添加到Anki",
        status: 0,
      },
    ],
  });
});

test("正确处理句子数据", () => {
  const { data, ankiButtonInfoObject, scrollTop } = createHistory(sentenceData);
  expect(scrollTop).toBe(0);
  expect(data).toBe(sentenceData);
  expect(ankiButtonInfoObject).toEqual({
    [__main__]: [
      {
        message: "添加到Anki",
        status: 0,
      },
    ],
  });
});
