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

interface AnalyzerProps {
  blob: string
}

export default function Analyzer(props: AnalyzerProps) {
  const [player, setPlayer] = useState<HTMLVideoElement>();
  const videoRef = useCallback((node: HTMLVideoElement) => {
    if (node) {
      setPlayer(node);
    }
  }, []);


  return (
    <>
      <div className="h-full relative flex items-stretch justify-center">
        <div className="absolute top-0 left-0 grid gap-1 p-2 z-[2]">
          {player && (
            <VideoContext.Provider value={{ player }}>
              <Close />
              <Muted />
              <Flip />
            </VideoContext.Provider>
          )}
        </div>
        {player && <DrawTools />}
        <video
          ref={videoRef}
          src={props.blob}
          loop
          muted={true}
          autoPlay
          playsInline
          data-flipped="false"
          className="block max-h-full max-w-full h-full mx-auto"
        />
        <div className="absolute bottom-0 left-0 right-0 text-white p-2 flex items-center gap-1 z-[2]">
          {player && (
            <VideoContext.Provider value={{ player }}>
              <PlayPause />
              <Progress />
              <Skip />
              <Speed />
            </VideoContext.Provider>
          )}
        </div>
      </div>
    </>
  );
}
