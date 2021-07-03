import React, {
  Ref,
  useContext,
  useImperativeHandle,
} from "react";
import classnames from "classnames";

import AudioContext from "../Context/AudioContext";

interface Props {
  audioURL?: string;
  className?: string;
}

function AudioButton(props: Props, ref: Ref<{ playAudio: () => void }>) {
  const { audioURL, className } = props;
  const audioElement = useContext(AudioContext);
  const playAudio = () => {
    try {
    if (!audioURL) return;
    //避免重复加载
    if (audioElement.src !== audioURL) {
      audioElement.src = audioURL;
    }
      //重头开始播放
      audioElement.currentTime = 0;
      audioElement.play();
    } catch (e) {
      console.warn(e);
    }
  };

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
    <span
      hidden={!audioURL}
      onClick={playAudio}
      className={classnames(
        className,
        "audio hover:audio cursor-pointer select-none text-4xl"
      )}
    ></span>
  );
}

export default React.forwardRef(AudioButton);
