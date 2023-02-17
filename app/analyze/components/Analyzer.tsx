"use client";

import { useSearchParams, redirect } from "next/navigation";
import { createContext, useCallback, useContext, useState } from "react";

import PlayPause from "./PlayPause";
import Close from "./Close";
import Muted from "./Mute";
import Flip from "./Flip";
import Skip from "./Skip";
import Progress from "./Progress";
import Speed from "./Speed";
import DrawTools from "./DrawTools";
import classNames from "classnames";

interface VideoContextType {
  player: HTMLVideoElement;
}

export const VideoContext = createContext<VideoContextType>({
  player: document.createElement("video"),
});

export function usePlayer() {
  const videoContext = useContext(VideoContext);
  return videoContext.player;
}

export default function Analyzer() {
  const params = useSearchParams();
  const [isDrawing, setIsDrawing] = useState<boolean>(false)
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
        <VideoContext.Provider value={{ player }}>
          <div className={classNames("absolute top-0 left-0 grid gap-1 p-2 z-[2] opacity-100 transition-opacity", { '!opacity-0 pointer-events-none': isDrawing } )}>
            <Close />
            <Muted />
            <Flip />
          </div>
          <div className={classNames("absolute bottom-0 left-0 right-0 text-white p-2 flex items-center gap-1 z-[2] opacity-100 transition-opacity",  { '!opacity-0 pointer-events-none': isDrawing } )}>
            <PlayPause />
            <Progress />
            <Skip />
            <Speed />
          </div>
          <DrawTools isDrawing={isDrawing} setIsDrawing={setIsDrawing} />
        </VideoContext.Provider>
      )}
    </>
  );
}
