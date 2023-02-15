"use client";

import { useEffect, useState } from "react";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { usePlayer } from "./Analyzer";

const playLabel = "Play video";
const pauseLabel = "Pause video";

export default function PlayPause() {
  const player = usePlayer();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    player.onplay = () => setIsPlaying(true);
    player.onpause = () => setIsPlaying(false);
  }, [player]);

  function handlePause() {
    player.pause();
  }

  async function handlePlay() {
    player.play();
  }

  if (isPlaying) {
    return (
      <button
        type="button"
        className="btn-action"
        onClick={handlePause}
        aria-label={pauseLabel}
        title={pauseLabel}
        disabled={!player}
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
      disabled={!player}
    >
      <BsFillPlayFill />
    </button>
  );
}
