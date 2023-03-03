import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";

import { DrawColorEnum } from "@enums";
import useAppSelector from "@hooks/useAppSelector";
import useAppDispatch from "@hooks/useAppDispatch";
import { setDrawColor } from "@redux/slices/draw";

const drawColors = [
  DrawColorEnum.WHITE,
  DrawColorEnum.GREEN,
  DrawColorEnum.RED,
  DrawColorEnum.BLUE,
  DrawColorEnum.ORANGE,
  DrawColorEnum.BLACK,
];

const DrawColor = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isDrawing, color } = useAppSelector((state) => state.draw);
  const dispatch = useAppDispatch();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleChange = (newDrawColor: DrawColorEnum) => {
    dispatch(setDrawColor(newDrawColor));
  };

  return (
    <Popover.Root onOpenChange={handleOpenChange} open={isOpen && !isDrawing}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="btn-action"
          aria-label="Select draw color"
        >
          <div
            className={
              "h-4 w-4 border dark:border-white border-black rounded-full"
            }
            style={{
              backgroundColor: drawColors.find((c) => c === color),
            }}
          />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          side="left"
          className="p-1 shadow rounded duration-300 ease-in-out will-change-auto flex bg-white dark:bg-black gap-2 text-white border border-black dark:border-white"
        >
          {drawColors.map((drawColor) => (
            <button
              key={drawColor}
              type="button"
              onClick={() => {
                handleChange(drawColor);
              }}
              aria-label={`Draw with ${drawColor}`}
              className={`block text-center p-2 rounded ${
                drawColor === color
                  ? "text-white bg-brand-blue"
                  : "text-black dark:text-white"
              }`}
            >
              <div
                className={`h-4 w-4 border dark:border-white border-black rounded-full ${
                  drawColor === color ? "!border-black" : ""
                } `}
                style={{ backgroundColor: drawColor }}
              />
            </button>
          ))}
          <Popover.Arrow className="fill-black dark:fill-white" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default DrawColor;
