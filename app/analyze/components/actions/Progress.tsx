import { useEffect, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import * as Tooltip from "@radix-ui/react-tooltip";
import classNames from "classnames";

interface Props {
  player: HTMLVideoElement;
  isDrawing: boolean;
}

export default function Progress(props: Props) {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    props.player.onloadeddata = function (e: Event) {
      const currentTarget = e.currentTarget as HTMLVideoElement;
      setDuration(currentTarget.duration);
    };
    props.player.ondurationchange = function (e: Event) {
      const currentTarget = e.currentTarget as HTMLVideoElement;
      setDuration(currentTarget.duration);
    };
    props.player.ontimeupdate = function (e: Event) {
      const currentTarget = e.currentTarget as HTMLVideoElement;
      setCurrentTime(currentTarget.currentTime);
      setDuration(currentTarget.duration);
    };
  }, [props.player]);

  function handleChange(values: Array<number>) {
    props.player.pause();
    props.player.currentTime = values[0];
  }

  function handleCommit() {
    props.player.play();
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
              <Tooltip.Content
                className={classNames(
                  "bg-black rounded text-white p-1 text-xs z-[100]",
                  { "opacity-0": props.isDrawing }
                )}
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
}
