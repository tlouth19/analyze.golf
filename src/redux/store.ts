import { configureStore } from "@reduxjs/toolkit";

import videoSlice from "./slices/video";
import drawSlice from "./slices/draw";

const store = configureStore({
  reducer: {
    video: videoSlice,
    draw: drawSlice,
  },
});

export default store;
