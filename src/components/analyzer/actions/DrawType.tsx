import { useState } from "react";
import { TbWaveSine } from "react-icons/tb";
import { BsSlashLg, BsCircle } from "react-icons/bs";
import * as Popover from "@radix-ui/react-popover";

import { DrawTypeEnum } from "@enums";
import useAppSelector from "@hooks/useAppSelector";
import useAppDispatch from "@hooks/useAppDispatch";
import { setDrawType } from "@redux/slices/draw";

const drawTypes = [
  { type: DrawTypeEnum.LINE, icon: <BsSlashLg className="stroke-current" /> },
  { type: DrawTypeEnum.CIRCLE, icon: <BsCircle className="stroke-current" /> },
  { type: DrawTypeEnum.FREE, icon: <TbWaveSine className="stroke-current" /> },
];

const DrawType = () => {
  const dispatch = useAppDispatch();
  const { type, isDrawing } = useAppSelector((state) => state.draw);
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
          {drawTypes.find((t) => t.type === type)?.icon}
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="left"
          className="p-1 shadow rounded duration-300 ease-in-out will-change-auto flex bg-white dark:bg-black gap-2 text-white border border-black dark:border-white"
        >
          {drawTypes.map((drawType) => (
            <button
              key={drawType.type}
              type="button"
              onClick={() => {
                handleChange(drawType.type);
              }}
              aria-label={`Draw with ${drawType.type}`}
              className={`block text-center p-2 rounded ${
                type === drawType.type
                  ? "text-white bg-brand-blue"
                  : "text-black dark:text-white"
              }`}
            >
              {drawType.icon}
            </button>
          ))}
          <Popover.Arrow className="fill-black dark:fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default DrawType;
