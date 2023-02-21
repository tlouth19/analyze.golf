"use client";

import { useSearchParams, redirect } from "next/navigation";
import { useCallback, useState } from "react";

import Actions from "./actions/Actions";
import PlayerError from "./playerError/PlayerError";

export default function Analyzer() {
  const params = useSearchParams();
  const [player, setPlayer] = useState<HTMLVideoElement>();
  const videoRef = useCallback((node: HTMLVideoElement) => {
    if (node) {
      setPlayer(node);
    }
  }, []);

  const blob = params.get("blob");

  if (!blob) {
    redirect("/");
  }

  return (
    <>
      <video
        ref={videoRef}
        src={blob}
        loop
        muted={true}
        autoPlay
        playsInline
        data-flipped="false"
        className="block max-h-full max-w-full h-full mx-auto pointer-events-none"
      />

      {player && (
        <>
          <Actions player={player} />
          <PlayerError player={player} />
        </>
      )}
    </>
  );
}
