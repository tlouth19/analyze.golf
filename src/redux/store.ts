import { configureStore } from "@reduxjs/toolkit";

import videoSlice from "./slices/video";
import drawSlice from "./slices/draw";

export const store = configureStore({
  reducer: {
    video: videoSlice,
    draw: drawSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
