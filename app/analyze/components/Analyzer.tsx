"use client";

import { useSearchParams, redirect } from "next/navigation";
import { useCallback, useState } from "react";
import dynamic from "next/dynamic";

const Actions = dynamic(() => import("./video/Actions"), {
  ssr: false,
});

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

      {player && <Actions player={player} />}
    </>
  );
}
