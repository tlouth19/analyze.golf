"use client";

import { useEffect, useState } from "react";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

const playLabel = "Play video";
const pauseLabel = "Pause video";

interface Props {
  player: HTMLVideoElement;
}

export default function PlayPause(props: Props) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    props.player.addEventListener("play", handleIsPlaying);
    props.player.addEventListener("playing", handleIsPlaying);
    props.player.addEventListener("pause", handleIsPaused);
    return () => {
      props.player.removeEventListener("play", handleIsPlaying);
      props.player.removeEventListener("playing", handleIsPlaying);
      props.player.removeEventListener("pause", handleIsPaused);
    };
  }, [props.player]);

  function handleIsPlaying() {
    setIsPlaying(true);
  }

  function handleIsPaused() {
    setIsPlaying(false);
  }

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
