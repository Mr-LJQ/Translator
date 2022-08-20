/**
 * 实现播放音频功能的按钮
 */
import React, { useRef, useCallback, useImperativeHandle } from "react";
import classJoin from "classnames";
import { useAudio } from "../hooks";

interface Props {
  audioURL: string;
  className: string;
}

export const AudioButton = React.forwardRef<{ playAudio: () => void }, Props>(
  function AudioButton(props, ref) {
    const { audioURL, className } = props;
    const audioElement = useAudio();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const playAudio = useCallback(() => {
      try {
        if (!audioURL) return;
        buttonRef.current?.focus();
        //避免重复加载
        if (audioElement.src !== audioURL) {
          audioElement.src = audioURL;
        }
        //重头开始播放
        audioElement.currentTime = 0;
        audioElement.play();
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }, [audioElement, audioURL]);
    useImperativeHandle(
      ref,
      () => {
        return {
          playAudio,
        };
      },
      [playAudio]
    );
    return (
      <button
        className={classJoin(
          `
          h-12
          text-[0px]
          align-text-top
          audio
          focus-visible:underline
          focus-visible:underline-offset-4
          hover:play-audio
          focus:outline-none
          select-none
          cursor-pointer
          `,
          className
        )}
        type="button"
        ref={buttonRef}
        hidden={!audioURL}
        onClick={playAudio}
      >
        播放音频
      </button>
    );
  }
);
