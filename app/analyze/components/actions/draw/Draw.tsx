"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import classNames from "classnames";
import { BsArrowCounterclockwise, BsEraser } from "react-icons/bs";

import { DrawTypeEnum, DrawColorEnum } from "@/enums";

import DrawType from "./DrawType";
import DrawColor from "./DrawColor";

const Canvas = dynamic(() => import("./Canvas"), {
  ssr: false,
});

export interface Shape {
  key: string;
  drawColor: DrawColorEnum;
  drawType: DrawTypeEnum;
  points: number[];
  width?: number;
  height?: number;
}

interface Props {
  isDrawing: boolean;
  setIsDrawing: Function;
}

export default function Draw(props: Props) {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [drawType, setDrawType] = useState<DrawTypeEnum>(DrawTypeEnum.LINE);
  const [drawColor, setDrawColor] = useState<DrawColorEnum>(
    DrawColorEnum.WHITE
  );

  function handleUndo() {
    const clonedShapes = [...shapes] as Shape[];
    clonedShapes.pop();
    setShapes([...clonedShapes]);
  }

  function handleErase() {
    setShapes([]);
  }

  return (
    <>
      <div
        className={classNames(
          "absolute top-0 right-0 grid gap-1 p-2 z-[2]  opacity-100 transition-opacity ",
          { "!opacity-0 pointer-events-none": props.isDrawing }
        )}
      >
        <DrawType
          drawType={drawType}
          setDrawType={setDrawType}
          isDrawing={props.isDrawing}
        />
        <DrawColor
          drawColor={drawColor}
          setDrawColor={setDrawColor}
          isDrawing={props.isDrawing}
        />
        {shapes.length > 0 && (
          <>
            <button
              type="button"
              onClick={handleUndo}
              aria-label={`Erase last drawn shape`}
              className="btn-action"
            >
              <BsArrowCounterclockwise />
            </button>
            <button
              type="button"
              onClick={handleErase}
              aria-label="Erase all shapes`"
              className="btn-action"
            >
              <BsEraser />
            </button>
          </>
        )}
      </div>
      <Canvas
        drawColor={drawColor}
        drawType={drawType}
        shapes={shapes}
        setShapes={setShapes}
        isDrawing={props.isDrawing}
        setIsDrawing={props.setIsDrawing}
      />
    </>
  );
}
