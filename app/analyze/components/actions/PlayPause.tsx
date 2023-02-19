"use client";

import { useEffect, useState } from "react";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

const playLabel = "Play video";
const pauseLabel = "Pause video";

interface Props {
  player: HTMLVideoElement;
}

export default function PlayPause(props: Props) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    props.player.onplay = () => setIsPlaying(true);
    props.player.onpause = () => setIsPlaying(false);
  }, [props.player]);

  function handlePause() {
    props.player.pause();
  }

  async function handlePlay() {
    props.player.play();
  }

  if (isPlaying) {
    return (
      <button
        type="button"
        className="btn-action"
        onClick={handlePause}
        aria-label={pauseLabel}
        title={pauseLabel}
      >
        <BsFillPauseFill />
      </button>
    );
  }

  return (
    <button
      type="button"
      className="btn-action"
      onClick={handlePlay}
      aria-label={playLabel}
      title={playLabel}
    >
      <BsFillPlayFill />
    </button>
  );
}
