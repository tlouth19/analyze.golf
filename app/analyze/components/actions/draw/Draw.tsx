"use client";
import { useState } from "react";
import Konva from "konva";
import { Stage, Layer, Circle, Line } from "react-konva";
import { useBoundingclientrectRef, useWindowSize } from "rooks";

import { DrawTypeEnum, DrawColorEnum } from "@/enums";
import { Shape } from "./DrawTools";
import { useEffect, useRef } from "react";

interface DrawProps {
  drawColor: DrawColorEnum;
  drawType: DrawTypeEnum;
  shapes: Shape[];
  setShapes: Function;
  isDrawing: boolean;
  setIsDrawing: Function;
}

export default function Draw(props: DrawProps) {
  const windowSize = useWindowSize();
  const [containerRef, clientRect, updateClientRect] =
    useBoundingclientrectRef();
  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    updateClientRect();
  }, [windowSize, updateClientRect]);

  useEffect(() => {
    if (clientRect) {
      const containerWidth = clientRect.width;
      // const scale =
    }
  }, [clientRect, containerRef]);

  function handleMouseOrTouchDown(
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) {
    props.setIsDrawing(true);

    switch (props.drawType) {
      case DrawTypeEnum.FREE:
        return handleFreeDown(event);
      case DrawTypeEnum.LINE:
        return handleLineDown(event);
      case DrawTypeEnum.CIRCLE:
        return handleCircleDown(event);
      default:
        throw Error("Invalid draw type");
    }
  }

  function handleMouseOrTouchMove(
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) {
    if (!props.isDrawing) {
      return;
    }

    switch (props.drawType) {
      case DrawTypeEnum.FREE:
        return handleFreeMove(event);
      case DrawTypeEnum.LINE:
        return handleLineMove(event);
      case DrawTypeEnum.CIRCLE:
        return handleCircleMove(event);
      default:
        throw Error("Invalid draw type");
    }
  }

  function handleMouseOrTouchUp() {
    props.setIsDrawing(false);
  }

  function handleFreeDown(
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) {
    const stage = event.target.getStage();
    if (stage) {
      const pointerPosition = stage.getPointerPosition();
      if (pointerPosition) {
        props.setShapes([
          ...props.shapes,
          {
            key: String(props.shapes.length + 1),
            drawType: DrawTypeEnum.FREE,
            drawColor: props.drawColor,
            points: [pointerPosition.x, pointerPosition.y],
          },
        ]);
      }
    }
  }

  function handleFreeMove(
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) {
    const stage = event.target.getStage();
    if (stage) {
      const pointerPosition = stage.getPointerPosition();
      if (pointerPosition) {
        let lastLine = props.shapes[props.shapes.length - 1];
        lastLine.points = lastLine.points.concat([
          pointerPosition.x,
          pointerPosition.y,
        ]);
        props.shapes.splice(props.shapes.length - 1, 1, lastLine);
        props.setShapes(props.shapes.concat());
      }
    }
  }

  function handleLineDown(
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) {
    const stage = event.target.getStage();
    if (stage) {
      const pointerPosition = stage.getPointerPosition();
      if (pointerPosition) {
        props.setShapes([
          ...props.shapes,
          {
            key: String(props.shapes.length + 1),
            drawType: DrawTypeEnum.LINE,
            drawColor: props.drawColor,
            points: [pointerPosition.x, pointerPosition.y],
          },
        ]);
      }
    }
  }

  function handleLineMove(
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) {
    const stage = event.target.getStage();
    if (stage) {
      const pointerPosition = stage.getPointerPosition();
      if (pointerPosition) {
        let lastLine = props.shapes[props.shapes.length - 1];
        lastLine.points = [
          lastLine.points[0],
          lastLine.points[1],
          pointerPosition.x,
          pointerPosition.y,
        ];
        props.shapes.splice(props.shapes.length - 1, 1, lastLine);
        props.setShapes(props.shapes.concat());
      }
    }
  }

  function handleCircleDown(
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) {
    const stage = event.target.getStage();
    if (stage) {
      const pointerPosition = stage.getPointerPosition();
      if (pointerPosition) {
        props.setShapes([
          ...props.shapes,
          {
            key: String(props.shapes.length + 1),
            drawType: DrawTypeEnum.CIRCLE,
            drawColor: props.drawColor,
            points: [pointerPosition.x, pointerPosition.y],
            width: 1,
            height: 1,
          },
        ]);
      }
    }
  }

  function handleCircleMove(
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) {
    const stage = event.target.getStage();
    if (stage) {
      const pointerPosition = stage.getPointerPosition();
      if (pointerPosition) {
        let lastLine = props.shapes[props.shapes.length - 1];
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

        props.shapes.splice(props.shapes.length - 1, 1, lastLine);
        props.setShapes(props.shapes.concat());
      }
    }
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
        width={clientRect?.width || 0}
        height={clientRect?.height || 0}
        className="absolute inset-0"
        scale={{ x: scale, y: scale }}
      >
        <Layer>
          {props.shapes.map((shape) => {
            switch (shape.drawType) {
              case DrawTypeEnum.FREE:
              case DrawTypeEnum.LINE:
                return (
                  <Line
                    key={shape.key}
                    points={shape.points}
                    stroke={shape.drawColor}
                    strokeWidth={5}
                    tension={0.5}
                  />
                );
              case DrawTypeEnum.CIRCLE:
                return (
                  <Circle
                    key={shape.key}
                    x={shape.points[0]}
                    y={shape.points[1]}
                    width={shape.width}
                    height={shape.height}
                    stroke={shape.drawColor}
                    strokeWidth={5}
                    tension={0.5}
                    radius={50}
                  />
                );
              default:
                throw Error("Invalid draw type");
            }
          })}
        </Layer>
      </Stage>
    </div>
  );
}
