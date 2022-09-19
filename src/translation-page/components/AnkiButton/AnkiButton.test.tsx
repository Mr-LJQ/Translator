import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AnkiButton } from ".";
import { Status } from "../../types";

test("当处于 Status.Loading/Success 状态时，单击按钮什么都不会发生", async () => {
  const mockFn = jest.fn();
  const user = userEvent.setup();

  const ables = [
    Status.Add,
    Status.Error,
    Status.LearnNow,
    Status.Forgotten,
    Status.Disconnect,
    Status.ConfigError,
  ];

  const view = render(
    <AnkiButton
      {...{
        message: "",
        updateAnki: mockFn,
        status: Status.Loading,
      }}
    />
  );
  await user.click(screen.getByRole("button"));
  expect(mockFn).toBeCalledTimes(0);

  view.rerender(
    <AnkiButton
      {...{
        message: "",
        updateAnki: mockFn,
        status: Status.Success,
      }}
    />
  );
  await user.click(screen.getByRole("button"));
  expect(mockFn).toBeCalledTimes(0);

  for (const [i, status] of ables.entries()) {
    view.rerender(
      <AnkiButton
        {...{
          message: "",
          status: status,
          updateAnki: mockFn,
        }}
      />
    );
    await user.click(screen.getByRole("button"));
    expect(mockFn).toBeCalledTimes(i + 1);
  }
});
