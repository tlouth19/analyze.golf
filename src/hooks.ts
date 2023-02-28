import { useEffect } from "react";
import { useWindowSize } from "rooks";
import type Konva from "konva";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

import type { RootState, AppDispatch } from "./redux/store";
import { setIsDrawing, setShapes } from "./redux/slices/draw";
import { DrawTypeEnum } from "./enums";

// This component fixes issues settings 100vh on mobile devices (especially ios safari)
export const useVhHeight = () => {
  const { innerHeight } = useWindowSize();

  useEffect(() => {
    if (innerHeight != null) {
      const doc = document.documentElement;
      doc.style.setProperty("--doc-height", `${innerHeight}px`);
    }
  }, [innerHeight]);
};

export const useCanvasEvents = () => {
  const dispatch = useAppDispatch();
  const drawType = useAppSelector((state) => state.draw.type);
  const drawColor = useAppSelector((state) => state.draw.color);
  const isDrawing = useAppSelector((state) => state.draw.isDrawing);
  const shapes = useAppSelector((state) => state.draw.shapes);

  const handleMouseOrTouchDown = (
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    dispatch(setIsDrawing(true));

    switch (drawType) {
      case DrawTypeEnum.FREE: {
        handleFreeDown(event);
        return;
      }
      case DrawTypeEnum.LINE: {
        handleLineDown(event);
        return;
      }
      case DrawTypeEnum.CIRCLE: {
        handleCircleDown(event);
        return;
      }
      default:
        throw Error("Invalid draw type");
    }
  };

  const handleMouseOrTouchMove = (
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    if (!isDrawing) {
      return;
    }

    switch (drawType) {
      case DrawTypeEnum.FREE: {
        handleFreeMove(event);
        return;
      }
      case DrawTypeEnum.LINE: {
        handleLineMove(event);
        return;
      }
      case DrawTypeEnum.CIRCLE: {
        handleCircleMove(event);
        return;
      }
      default:
        throw Error("Invalid draw type");
    }
  };

  const handleMouseOrTouchUp = () => {
    dispatch(setIsDrawing(false));
  };

  const handleFreeDown = (
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    const stage = event.target.getStage();
    if (stage != null) {
      const pointerPosition = stage.getPointerPosition();
      if (pointerPosition != null) {
        dispatch(
          setShapes([
            ...shapes,
            {
              key: String(shapes.length + 1),
              drawType: DrawTypeEnum.FREE,
              drawColor,
              points: [pointerPosition.x, pointerPosition.y],
            },
          ])
        );
      }
    }
  };

  const handleFreeMove = (
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    const stage = event.target.getStage();
    if (stage != null) {
      const pointerPosition = stage.getPointerPosition();
      if (pointerPosition != null) {
        const lastLine = { ...shapes[shapes.length - 1] };
        lastLine.points = lastLine.points.concat([
          pointerPosition.x,
          pointerPosition.y,
        ]);

        const newShapes = [...shapes];
        newShapes.splice(newShapes.length - 1, 1, lastLine);
        dispatch(setShapes(newShapes.concat()));
      }
    }
  };

  const handleLineDown = (
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    const stage = event.target.getStage();
    if (stage != null) {
      const pointerPosition = stage.getPointerPosition();
      if (pointerPosition != null) {
        dispatch(
          setShapes([
            ...shapes,
            {
              key: String(shapes.length + 1),
              drawType: DrawTypeEnum.LINE,
              drawColor,
              points: [pointerPosition.x, pointerPosition.y],
            },
          ])
        );
      }
    }
  };

  const handleLineMove = (
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    const stage = event.target.getStage();
    if (stage != null) {
      const pointerPosition = stage.getPointerPosition();
      if (pointerPosition != null) {
        const lastLine = { ...shapes[shapes.length - 1] };
        lastLine.points = [
          lastLine.points[0],
          lastLine.points[1],
          pointerPosition.x,
          pointerPosition.y,
        ];
        const newShapes = [...shapes];
        newShapes.splice(newShapes.length - 1, 1, lastLine);
        dispatch(setShapes(newShapes.concat()));
      }
    }
  };

  const handleCircleDown = (
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    const stage = event.target.getStage();
    if (stage != null) {
      const pointerPosition = stage.getPointerPosition();
      if (pointerPosition != null) {
        dispatch(
          setShapes([
            ...shapes,
            {
              key: String(shapes.length + 1),
              drawType: DrawTypeEnum.CIRCLE,
              drawColor,
              points: [pointerPosition.x, pointerPosition.y],
              width: 1,
              height: 1,
            },
          ])
        );
      }
    }
  };

  const handleCircleMove = (
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    const stage = event.target.getStage();
    if (stage != null) {
      const pointerPosition = stage.getPointerPosition();
      if (pointerPosition != null) {
        const lastLine = { ...shapes[shapes.length - 1] };
        const sx = lastLine.points[0];
        const sy = lastLine.points[1];

        lastLine.points = lastLine.points.concat([
          pointerPosition.x,
          pointerPosition.y,
        ]);
        const width = pointerPosition.x - sx;
        const height = pointerPosition.y - sy;

        lastLine.width = width > 0 ? width : lastLine.width;
        lastLine.height = height > 0 ? height : lastLine.height;

        const newShapes = [...shapes];
        newShapes.splice(newShapes.length - 1, 1, lastLine);
        dispatch(setShapes(newShapes.concat()));
      }
    }
  };

  return {
    onMouseDown: handleMouseOrTouchDown,
    onMouseUp: handleMouseOrTouchUp,
    onMouseMove: handleMouseOrTouchMove,
    onTouchStart: handleMouseOrTouchDown,
    onTouchMove: handleMouseOrTouchMove,
    onTouchEnd: handleMouseOrTouchUp,
  };
};

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
