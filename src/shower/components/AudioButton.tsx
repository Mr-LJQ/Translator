import React from "react"
interface Props{
  audioURL?:string
  className?:string
  audio:HTMLAudioElement
}

export default class AudioButton extends React.Component<Props> {
  constructor(props:Props) {
    super(props)
    this.playAudio = this.playAudio.bind(this);
  }

  playAudio() {
    const {audioURL,audio} = this.props
    if (!audioURL) return
    //避免重复加载
    if (audio.src !== audioURL) {
      audio.src = audioURL;
    }
    //重头开始播放
    audio.currentTime = 0;
    audio.play();
  }

  render () {
    const {audioURL,className} = this.props
    return (
      <span
        hidden={!audioURL}
        onClick={this.playAudio}
        className={className}
      >
        📣
      </span>
    )
  }
}