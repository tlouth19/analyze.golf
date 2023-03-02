import { useState } from "react";
import { TbWaveSine } from "react-icons/tb";
import { BsSlashLg, BsCircle } from "react-icons/bs";
import * as Popover from "@radix-ui/react-popover";

import { DrawTypeEnum } from "../../../enums";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setDrawType } from "../../../redux/slices/draw";

const drawTypes = [
  { type: DrawTypeEnum.LINE, icon: <BsSlashLg className="stroke-current" /> },
  { type: DrawTypeEnum.CIRCLE, icon: <BsCircle className="stroke-current" /> },
  { type: DrawTypeEnum.FREE, icon: <TbWaveSine className="stroke-current" /> },
];

const DrawType = () => {
  const dispatch = useAppDispatch();
  const drawType = useAppSelector((state) => state.draw.type);
  const isDrawing = useAppSelector((state) => state.draw.isDrawing);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleChange = (newDrawType: DrawTypeEnum) => {
    dispatch(setDrawType(newDrawType));
  };

  return (
    <Popover.Root onOpenChange={handleOpenChange} open={isOpen && !isDrawing}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="btn-action"
          aria-label="Select draw tool"
        >
          {drawTypes.find((t) => t.type === drawType)?.icon}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="left"
          className="p-1 shadow rounded duration-300 ease-in-out will-change-auto flex bg-white dark:bg-black gap-2 text-white border border-black dark:border-white"
        >
          {drawTypes.map((type) => (
            <button
              key={type.type}
              type="button"
              onClick={() => {
                handleChange(type.type);
              }}
              aria-label={`Draw with ${type.type}`}
              className={`block text-center p-2 rounded ${
                drawType === type.type
                  ? "text-white bg-brand-blue"
                  : "text-black dark:text-white"
              }`}
            >
              {type.icon}
            </button>
          ))}
          <Popover.Arrow className="fill-black dark:fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default DrawType;
