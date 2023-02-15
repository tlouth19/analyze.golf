import { useEffect, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import * as Tooltip from "@radix-ui/react-tooltip";

import { usePlayer } from "./Analyzer";

export default function Progress() {
  const player = usePlayer();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
   
      player.onloadeddata = function (e: Event) {
        const currentTarget = e.currentTarget as HTMLVideoElement;
        setDuration(currentTarget.duration);
      };
      player.ondurationchange = function (e: Event) {
        const currentTarget = e.currentTarget as HTMLVideoElement;
        setDuration(currentTarget.duration);
      };
      player.ontimeupdate = function (e: Event) {
        const currentTarget = e.currentTarget as HTMLVideoElement;
        setCurrentTime(currentTarget.currentTime);
        setDuration(currentTarget.duration);
      };
  }, [player]);

  function handleChange(values: Array<number>) {
   
      player.pause();
      player.currentTime = values[0];

  }

  function handleCommit() {
   
      player.play();

  }

  return (
    <div className="px-4 w-full">

        <Slider.Root
          className="relative select-none touch-none w-full h-8 flex items-center rounded"
          value={[currentTime]}
          step={0.01}
          min={0}
          max={duration}
          aria-label="Video playback time"
          onValueChange={handleChange}
          onValueCommit={handleCommit}
        >
          <Slider.Track className="bg-white relative grow rounded w-full h-3">
            <Slider.Range className="absolute bg-brand-blue bg-opacity-80  rounded h-full" />
          </Slider.Track>
          <Tooltip.Provider>
            <Tooltip.Root open>
              <Tooltip.Trigger asChild>
                <Slider.Thumb className="block w-6 border border-blue-800 h-6 shadow rounded-full focus:shadow-lg bg-brand-blue " />
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content className="bg-black rounded text-white p-1 text-xs z-[100]">
                  <Tooltip.Arrow />
                  {currentTime.toFixed(2)}
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>
          </Tooltip.Provider>
        </Slider.Root>
      
    </div>
  );
}
