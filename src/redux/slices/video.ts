import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface VideoState {
  blob: string | undefined;
  isPlaying: boolean;
  isMuted: boolean;
  isFlipped: boolean;
  currentTime: number;
  duration: number;
  speed: number;
}

const initialState: VideoState = {
  blob: undefined,
  isPlaying: false,
  isMuted: true,
  isFlipped: false,
  currentTime: 0,
  duration: 0,
  speed: 1,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    reset: () => initialState,
    setBlob: (state, action: PayloadAction<string>) => {
      state.blob = action.payload;
    },
    setPlayback: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setMuted: (state, action: PayloadAction<boolean>) => {
      state.isMuted = action.payload;
    },
    setFlipped: (state, action: PayloadAction<boolean>) => {
      state.isFlipped = action.payload;
    },
    setCurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    setSpeed: (state, action: PayloadAction<number>) => {
      state.speed = action.payload;
    },
  },
});

export const {
  reset,
  setBlob,
  setPlayback,
  setMuted,
  setFlipped,
  setCurrentTime,
  setDuration,
  setSpeed,
} = videoSlice.actions;

export default videoSlice.reducer;
