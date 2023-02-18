"use client";

import { createContext, useContext } from "react";

interface VideoContextType {
  player: HTMLVideoElement;
  isDrawing: boolean;
  setIsDrawing: Function;
}

export const VideoContext = createContext<VideoContextType>({
  player: document.createElement("video"),
  isDrawing: false,
  setIsDrawing: () => null,
});

export function useAnalyzer() {
  const videoContext = useContext(VideoContext) as VideoContextType;
  return videoContext;
}
