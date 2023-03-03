import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { DrawColorEnum, DrawTypeEnum } from "@enums";

interface Shape {
  key: string;
  color: DrawColorEnum;
  type: DrawTypeEnum;
  points: number[];
  width?: number;
  height?: number;
}

interface DrawState {
  isDrawing: boolean;
  type: DrawTypeEnum;
  color: DrawColorEnum;
  shapes: Shape[];
}

const initialState: DrawState = {
  isDrawing: false,
  type: DrawTypeEnum.LINE,
  color: DrawColorEnum.WHITE,
  shapes: [],
};

export const drawSlice = createSlice({
  name: "draw",
  initialState,
  reducers: {
    reset: () => initialState,
    setIsDrawing: (state, action: PayloadAction<boolean>) => {
      state.isDrawing = action.payload;
    },
    setDrawType: (state, action: PayloadAction<DrawTypeEnum>) => {
      state.type = action.payload;
    },
    setDrawColor: (state, action: PayloadAction<DrawColorEnum>) => {
      state.color = action.payload;
    },
    setShapes: (state, action: PayloadAction<Shape[]>) => {
      state.shapes = [...action.payload];
    },
    undoShape: (state) => {
      const oldShapes = [...state.shapes];
      oldShapes.pop();
      state.shapes = [...oldShapes];
    },
    eraseShapes: (state) => {
      state.shapes = [];
    },
  },
});

export const {
  reset,
  setIsDrawing,
  setDrawType,
  setDrawColor,
  setShapes,
  undoShape,
  eraseShapes,
} = drawSlice.actions;

export default drawSlice.reducer;
