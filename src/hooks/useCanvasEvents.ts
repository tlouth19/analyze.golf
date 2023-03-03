import type Konva from "konva";

import { setIsDrawing, setShapes } from "@redux/slices/draw";
import { DrawTypeEnum } from "@enums";
import useAppDispatch from "@hooks/useAppDispatch";
import useAppSelector from "@hooks/useAppSelector";

const useCanvasEvents = () => {
  const dispatch = useAppDispatch();
  const { type, color, isDrawing, shapes } = useAppSelector(
    (state) => state.draw
  );

  const handleMouseOrTouchDown = (
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    dispatch(setIsDrawing(true));

    switch (type) {
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

    switch (type) {
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
              type: DrawTypeEnum.FREE,
              color,
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
              type: DrawTypeEnum.LINE,
              color,
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
              type: DrawTypeEnum.CIRCLE,
              color,
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

export default useCanvasEvents;
