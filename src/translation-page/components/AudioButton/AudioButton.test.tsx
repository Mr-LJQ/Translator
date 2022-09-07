import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AudioButton } from ".";
import { AudioContext } from "../Context";

const mockPlay = jest.fn();
HTMLAudioElement.prototype.play = mockPlay;

afterEach(() => {
  mockPlay.mockClear()
})
test("单击音频按钮播放音频", async () => {
  const user = userEvent.setup();
  const audioElement = document.createElement("audio");
  render(
    <AudioContext.Provider value={audioElement}>
      <AudioButton audioURL="https://dict.youdao.com/dictvoice?audio=word&type=2" />
    </AudioContext.Provider>
  );
  const audioButton = screen.getByRole("button");
  audioElement.currentTime = 10;
  expect(audioElement.currentTime).toBe(10);
  await user.click(audioButton);
  expect(audioButton).toHaveFocus();
  expect(audioElement.currentTime).toBe(0);
  expect(mockPlay).toBeCalled();
});
