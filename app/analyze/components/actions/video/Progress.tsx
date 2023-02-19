import { useEffect, useState, useRef } from "react";
import * as Slider from "@radix-ui/react-slider";
import * as Tooltip from "@radix-ui/react-tooltip";
import classNames from "classnames";

interface Props {
  player: HTMLVideoElement;
  isDrawing: boolean;
}

export default function Progress(props: Props) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const isPlayingAtStartOfSliderChange = useRef<boolean>(false);
  const isDragging = useRef<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  useEffect(() => {
    props.player.addEventListener("play", handleIsPlaying);
    props.player.addEventListener("playing", handleIsPlaying);
    props.player.addEventListener("pause", handleIsPaused);
    props.player.addEventListener("loadeddata", handleLoadedData);
    props.player.addEventListener("durationchange", handleDurationChange);
    props.player.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      props.player.removeEventListener("play", handleIsPlaying);
      props.player.removeEventListener("playing", handleIsPlaying);
      props.player.removeEventListener("pause", handleIsPaused);
      props.player.removeEventListener("loadeddata", handleLoadedData);
      props.player.removeEventListener("durationchange", handleDurationChange);
      props.player.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [props.player]);

  function handleIsPlaying() {
    setIsPlaying(true);
  }

  function handleIsPaused() {
    setIsPlaying(false);
  }

  function handleLoadedData(e: Event) {
    const currentTarget = e.currentTarget as HTMLVideoElement;
    setDuration(currentTarget.duration);
  }

  function handleDurationChange(e: Event) {
    const currentTarget = e.currentTarget as HTMLVideoElement;
    setDuration(currentTarget.duration);
  }

  function handleTimeUpdate(e: Event) {
    const currentTarget = e.currentTarget as HTMLVideoElement;
    setCurrentTime(currentTarget.currentTime);
    setDuration(currentTarget.duration);
  }

  function handleChange(values: Array<number>) {
    if (!isDragging.current) {
      isPlayingAtStartOfSliderChange.current = isPlaying;
    }

    isDragging.current = true;

    if (isPlaying) {
      props.player.pause();
    }
    props.player.currentTime = values[0];
  }

  function handleCommit() {
    if (isPlayingAtStartOfSliderChange.current) {
      props.player.play();
    }
    isDragging.current = false;
  }

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
        <Slider.Track className="bg-white relative grow rounded w-full h-full overflow-hidden bg-opacity-70">
          <Slider.Range className="absolute bg-brand-blue bg-opacity-70 h-full" />
        </Slider.Track>
        <Tooltip.Provider>
          <Tooltip.Root open>
            <Tooltip.Trigger asChild>
              <Slider.Thumb className="block w-3 border border-blue-800 h-[42px] sm:h-[48px] shadow rounded-full focus:shadow-lg bg-brand-blue " />
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className={classNames(
                  "bg-black rounded  p-1 text-xs z-[100] text-white",
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
