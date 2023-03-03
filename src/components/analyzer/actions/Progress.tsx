import { useRef } from "react";
import * as Slider from "@radix-ui/react-slider";
import * as Tooltip from "@radix-ui/react-tooltip";

import useAppSelector from "@hooks/useAppSelector";
import { getPlayer } from "@helpers";

const Progress = () => {
  const { duration, currentTime, isPlaying } = useAppSelector(
    (state) => state.video
  );
  const { isDrawing } = useAppSelector((state) => state.draw);
  const isPlayingAtStartOfSliderChange = useRef<boolean>(false);
  const isDragging = useRef<boolean>(false);

  const handleChange = (values: number[]) => {
    if (!isDragging.current) {
      isPlayingAtStartOfSliderChange.current = isPlaying;
    }

    isDragging.current = true;

    if (isPlaying) {
      getPlayer().pause();
    }
    getPlayer().currentTime = values[0];
  };

  const handleCommit = () => {
    if (isPlayingAtStartOfSliderChange.current) {
      void getPlayer().play();
    }
    isDragging.current = false;
  };

  return (
    <div className="px-2 w-full">
      <Slider.Root
        className="relative select-none touch-none w-full h-[36px] sm:h-[42px] flex items-center rounded"
        value={[currentTime]}
        step={0.01}
        min={0}
        max={duration}
        aria-label="Video playback time"
        onValueChange={handleChange}
        onValueCommit={handleCommit}
      >
        <Slider.Track className="bg-black dark:bg-white relative grow rounded w-full h-full overflow-hidden !bg-opacity-40">
          <Slider.Range className="absolute bg-brand-blue bg-opacity-70 h-full" />
        </Slider.Track>
        <Tooltip.Provider>
          <Tooltip.Root open>
            <Tooltip.Trigger asChild>
              <Slider.Thumb className="block w-3 border border-blue-800 h-[42px] sm:h-[48px] shadow rounded-full focus:shadow-lg bg-brand-blue " />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className={`bg-black rounded  p-1 text-xs z-[100] text-white ${
                  isDrawing ? "opacity-0" : ""
                }`}
              >
                <Tooltip.Arrow />
                {currentTime.toFixed(2)}
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        </Tooltip.Provider>
      </Slider.Root>
    </div>
  );
};

//

export default Progress;
