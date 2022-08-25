import React from "react";
import { render, screen } from "@testing-library/react";
import { decodeBTag } from "../decodeBTag";

test("正确解码<b>标签", () => {
  const text = `这是一段话的<b>加粗部分</b><b>加粗部分</b><b>加粗部分</b>`;
  render(<>{decodeBTag(text)}</>);
  expect(
    screen.getAllByText("加粗部分").every((item) => item.tagName === "B")
  ).toBeTruthy();
  expect(screen.getAllByText("加粗部分")).toHaveLength(3);
});
