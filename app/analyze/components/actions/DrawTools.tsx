"use client";

import { useState } from "react";
import { TbWaveSine } from "react-icons/tb";
import {
  BsFillPencilFill,
  BsSlashLg,
  BsCircle,
  BsArrowCounterclockwise,
  BsEraser,
} from "react-icons/bs";
import * as Separator from "@radix-ui/react-separator";
import * as Popover from "@radix-ui/react-popover";

import { DrawTypeEnum, DrawColorEnum } from "@/enums";
import classNames from "classnames";
import { useAnalyzer } from "app/context";

import Draw from "./Draw";

export interface Shape {
  key: string;
  drawColor: DrawColorEnum;
  drawType: DrawTypeEnum;
  points: number[];
  width?: number;
  height?: number;
}

const drawTypes = [
  { type: DrawTypeEnum.LINE, icon: <BsSlashLg /> },
  { type: DrawTypeEnum.CIRCLE, icon: <BsCircle /> },
  { type: DrawTypeEnum.FREE, icon: <TbWaveSine /> },
];

const drawColors = [
  DrawColorEnum.WHITE,
  DrawColorEnum.GREEN,
  DrawColorEnum.RED,
  DrawColorEnum.BLUE,
  DrawColorEnum.ORANGE,
];

export default function DrawTools() {
  const { isDrawing } = useAnalyzer();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [drawType, setDrawType] = useState<DrawTypeEnum>(DrawTypeEnum.LINE);
  const [drawColor, setDrawColor] = useState<DrawColorEnum>(
    DrawColorEnum.WHITE
  );

  function handleChangeDrawType(newDrawType: DrawTypeEnum) {
    setDrawType(newDrawType);
  }

  function handleChangeDrawColor(newDrawColor: DrawColorEnum) {
    setDrawColor(newDrawColor);
  }

  function handleOpenChange(open: boolean) {
    setIsOpen(open);
  }

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
          "absolute top-0 right-0 grid gap-1 p-2 z-[2]  opacity-100 transition-opacity",
          { "!opacity-0 pointer-events-none": isDrawing }
        )}
      >
        <Popover.Root onOpenChange={handleOpenChange} open={isOpen}>
          <Popover.Trigger asChild>
            <button
              type="button"
              className="btn-action"
              aria-label="Select draw tools"
            >
              <BsFillPencilFill />
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content className="py-2 bg-black shadow rounded duration-300 ease-in-out will-change-auto grid gap-2">
              {drawTypes.map((type) => (
                <button
                  key={type.type}
                  type="button"
                  onClick={() => handleChangeDrawType(type.type)}
                  aria-label={`Draw with ${type.type}`}
                  className={`block text-center py-2 px-4 ${
                    drawType === type.type ? "text-brand-blue bg-white" : ""
                  }`}
                >
                  {type.icon}
                </button>
              ))}
              <Separator.Root className="h-[1px] w-full my-1 bg-current" />
              {drawColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleChangeDrawColor(color)}
                  aria-label={`Draw with ${color}`}
                  className={`block text-center py-2 px-4 ${
                    drawColor === color ? "text-brand-blue bg-white" : ""
                  }`}
                >
                  <div
                    className={`h-4 w-4 border border-black `}
                    style={{ backgroundColor: color }}
                  />
                </button>
              ))}
              {shapes.length > 0 && (
                <>
                  <Separator.Root className="h-[1px] w-full my-1 bg-current" />
                  <button
                    type="button"
                    onClick={handleUndo}
                    aria-label={`Erase last drawn shape`}
                    className="block text-center py-2 px-4"
                  >
                    <BsArrowCounterclockwise />
                  </button>
                  <button
                    type="button"
                    onClick={handleErase}
                    aria-label="Erase all shapes`"
                    className="block text-center py-2 px-4"
                  >
                    <BsEraser />
                  </button>
                </>
              )}
              <Popover.Arrow className="fill-black" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
      <Draw
        drawColor={drawColor}
        drawType={drawType}
        shapes={shapes}
        setShapes={setShapes}
      />
    </>
  );
}
