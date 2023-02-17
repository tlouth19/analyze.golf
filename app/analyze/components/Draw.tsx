"use client";

import Konva from "konva";
import { Stage, Layer, Circle, Line } from "react-konva";
import { useWindowSize } from "rooks";

import { DrawTypeEnum, DrawColorEnum } from "@/enums";
import { Shape } from "./DrawTools";

interface DrawProps {
  drawColor: DrawColorEnum;
  drawType: DrawTypeEnum;
  shapes: Shape[];
  setShapes: Function;
  isDrawing: boolean;
  setIsDrawing: Function
}

export default function Draw(props: DrawProps) {
  const { innerWidth, innerHeight } = useWindowSize();
  

  function handleMouseDown(event: Konva.KonvaEventObject<MouseEvent>) {
    props.setIsDrawing(true)

    switch (props.drawType) {
      case DrawTypeEnum.FREE:
        return handleFreeMouseDown(event);
      case DrawTypeEnum.LINE:
        return handleLineMouseDown(event);
      case DrawTypeEnum.CIRCLE:
        return handleCircleMouseDown(event);
      default:
        throw Error("Invalid draw type");
    }
  }

  function handleMouseMove(event: Konva.KonvaEventObject<MouseEvent>) {
    if (!props.isDrawing) {
      return;
    }

    switch (props.drawType) {
      case DrawTypeEnum.FREE:
        return handleFreeMouseMove(event);
      case DrawTypeEnum.LINE:
        return handleLineMouseMove(event);
      case DrawTypeEnum.CIRCLE:
        return handleCircleMouseMove(event);
      default:
        throw Error("Invalid draw type");
    }
  }

  function handleMouseUp() {
    props.setIsDrawing(false)
  }

  function handleFreeMouseDown(event: Konva.KonvaEventObject<MouseEvent>) {
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

  function handleFreeMouseMove(event: Konva.KonvaEventObject<MouseEvent>) {
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

  function handleLineMouseDown(event: Konva.KonvaEventObject<MouseEvent>) {
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

  function handleLineMouseMove(event: Konva.KonvaEventObject<MouseEvent>) {
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

  function handleCircleMouseDown(event: Konva.KonvaEventObject<MouseEvent>) {
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
            width: 200,
            height: 200,
          },
        ]);
      }
    }
  }

  function handleCircleMouseMove(event: Konva.KonvaEventObject<MouseEvent>) {
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
    <Stage
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      width={innerWidth || 0}
      height={innerHeight || 0}
      className="absolute inset-0 bg-red-900 bg-opacity-50"
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
                  lineCap="round"
                  lineJoin="round"
                  globalCompositeOperation="source-over"
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
                  lineCap="round"
                  lineJoin="round"
                  globalCompositeOperation="source-over"
                />
              );
            default:
              throw Error("Invalid draw type");
          }
        })}
      </Layer>
    </Stage>
  );
}
