import { useEffect } from "react";
import { Stage } from "react-konva";
import type Konva from "konva";
import { useBoundingclientrectRef, useWindowSize } from "rooks";
import { useAppDispatch, useAppSelector } from "../../../hooks";

import { setIsDrawing, setShapes } from "../../../redux/slices/draw";

import { DrawTypeEnum } from "../../../enums";
import Shapes from "./Shapes";

const Canvas = () => {
  const windowSize = useWindowSize();
  const dispatch = useAppDispatch();
  const drawType = useAppSelector((state) => state.draw.type);
  const drawColor = useAppSelector((state) => state.draw.color);
  const isDrawing = useAppSelector((state) => state.draw.isDrawing);
  const shapes = useAppSelector((state) => state.draw.shapes);
  const [containerRef, clientRect, updateClientRect] =
    useBoundingclientrectRef();

  useEffect(() => {
    updateClientRect();
  }, [windowSize, updateClientRect]);

  function handleMouseOrTouchDown(
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) {
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
  }

  function handleMouseOrTouchMove(
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) {
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
  }

  function handleMouseOrTouchUp() {
    dispatch(setIsDrawing(false));
  }

  function handleFreeDown(
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) {
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
  }

  function handleFreeMove(
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) {
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
  }

  function handleLineDown(
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) {
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
  }

  function handleLineMove(
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) {
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
  }

  function handleCircleDown(
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) {
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
  }

  function handleCircleMove(
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) {
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
  }

  let width = 0;
  let height = 0;
  if (clientRect !== null) {
    width = clientRect.width;
    height = clientRect.height;
  }

  return (
    <div className="absolute inset-0" ref={containerRef}>
      <Stage
        onMouseDown={handleMouseOrTouchDown}
        onMouseUp={handleMouseOrTouchUp}
        onMouseMove={handleMouseOrTouchMove}
        onTouchStart={handleMouseOrTouchDown}
        onTouchMove={handleMouseOrTouchMove}
        onTouchEnd={handleMouseOrTouchUp}
        width={width}
        height={height}
        className="absolute inset-0"
        //   scale={{ x: scale, y: scale }}
      >
        <Shapes />
      </Stage>
    </div>
  );
};

export default Canvas;
