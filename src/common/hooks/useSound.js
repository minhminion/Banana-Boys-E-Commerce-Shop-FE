import { useState, useEffect } from "react";

export function useSound (url){
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false)

  const play = () => {
    audio.play()
    setPlaying(true)
  }

  const pause = () => {
    // audio.pause()
    setPlaying(false)
  }

  return [playing, play, pause];
};