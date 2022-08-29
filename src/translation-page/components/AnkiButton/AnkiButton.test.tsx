import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AnkiButton } from ".";
import { Status } from "../../types";

test("当处于 Status.Duplicate 状态时，单击按钮可以将查询字符串添加到剪切板", async () => {
  const mockFn = jest.fn();
  const user = userEvent.setup();

  render(
    <AnkiButton
      {...{
        status: Status.Duplicate,
        message: "Duplicate",
        cardIds: [123, 456, 789],
        updateAnki: mockFn,
      }}
    />
  );
  await user.click(screen.getByRole("button"));
  expect(mockFn).toBeCalledTimes(1);
  expect(await navigator.clipboard.readText()).toBe(
    "cid:123 OR cid:456 OR cid:789"
  );
});
