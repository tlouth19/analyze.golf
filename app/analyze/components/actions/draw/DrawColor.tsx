"use client";

import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";

import classNames from "classnames";
import { DrawColorEnum } from "@/enums";

interface Props {
  drawColor: DrawColorEnum;
  setDrawColor: Function;
  isDrawing: boolean;
}

const drawColors = [
  DrawColorEnum.WHITE,
  DrawColorEnum.GREEN,
  DrawColorEnum.RED,
  DrawColorEnum.BLUE,
  DrawColorEnum.ORANGE,
];

export default function DrawColor(props: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleChange(newDrawColor: DrawColorEnum) {
    props.setDrawColor(newDrawColor);
  }

  function handleOpenChange(open: boolean) {
    setIsOpen(open);
  }

  return (
    <Popover.Root
      onOpenChange={handleOpenChange}
      open={isOpen && !props.isDrawing}
    >
      <Popover.Trigger asChild>
        <button
          type="button"
          className="btn-action"
          aria-label="Select draw color"
        >
          <div
            className={`h-4 w-4 border border-white rounded-full`}
            style={{
              backgroundColor: drawColors.find((c) => c === props.drawColor),
            }}
          />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="left"
          className="p-1 shadow rounded duration-300 ease-in-out will-change-auto flex bg-black  gap-2 text-white"
        >
          {drawColors.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => handleChange(color)}
              aria-label={`Draw with ${color}`}
              className={classNames("block text-center py-2 px-4 rounded", {
                "text-brand-blue bg-white": props.drawColor === color,
              })}
            >
              <div
                className={classNames(
                  "h-4 w-4 border border-white rounded-full",
                  { "!border-black": props.drawColor === color }
                )}
                style={{ backgroundColor: color }}
              />
            </button>
          ))}
          <Popover.Arrow className="fill-black" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
