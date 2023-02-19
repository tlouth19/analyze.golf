"use client";

import { useState } from "react";
import classNames from "classnames";
import { TbWaveSine } from "react-icons/tb";
import { BsSlashLg, BsCircle } from "react-icons/bs";
import * as Popover from "@radix-ui/react-popover";

import { DrawTypeEnum } from "@/enums";

const drawTypes = [
  { type: DrawTypeEnum.LINE, icon: <BsSlashLg /> },
  { type: DrawTypeEnum.CIRCLE, icon: <BsCircle /> },
  { type: DrawTypeEnum.FREE, icon: <TbWaveSine /> },
];

interface Props {
  drawType: DrawTypeEnum;
  setDrawType: Function;
  isDrawing: boolean;
}

export default function DrawType(props: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleChange(newDrawType: DrawTypeEnum) {
    props.setDrawType(newDrawType);
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
          aria-label="Select draw tool"
        >
          {drawTypes.find((t) => t.type === props.drawType)?.icon}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="left"
          className="p-1 shadow rounded duration-300 ease-in-out will-change-auto flex bg-black  gap-2 text-white"
        >
          {drawTypes.map((type) => (
            <button
              key={type.type}
              type="button"
              onClick={() => handleChange(type.type)}
              aria-label={`Draw with ${type.type}`}
              className={classNames("block text-center py-2 px-4 rounded", {
                "text-brand-blue bg-white": props.drawType === type.type,
              })}
            >
              {type.icon}
            </button>
          ))}
          <Popover.Arrow className="fill-black" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
