import React, { useCallback, useRef } from "react";

import AudioButton from "../components/AudioButton"

interface Props {
  symbols?:string
  audioURL?:string
}

function Phonetic(props: Props) {
  const {symbols,audioURL} = props
  const ref = useRef({playAudio:() => undefined})
  const playAudio = useCallback(() => {
    const {playAudio} = ref.current
    playAudio()
  },[ref])
  return (
    <div className="group flex items-center" hidden={symbols === undefined && audioURL === undefined}>
      <p
        hidden={symbols === undefined}
        className="cursor-pointer pr-1.5 text-black text-lg"
        onClick={playAudio}
      >
        {symbols}
      </p>
      <AudioButton
        ref={ref}
        audioURL={audioURL}
        className="group-hover:audio"
      />
    </div>
  );
}

export default Phonetic;
