"use client";

import { useEffect, useState } from "react";
import { BsSpeedometer } from "react-icons/bs";
import * as Popover from "@radix-ui/react-popover";

import { useAnalyzer } from "app/context";

const enum SpeedEnum {
  SLOW4 = 0.1,
  SLOW3 = 0.25,
  SLOW2 = 0.5,
  SLOW1 = 0.75,
  NORMAL = 1.0,
  FAST1 = 1.5,
  FAST2 = 2.0,
}

const playbackRates = [
  SpeedEnum.SLOW4,
  SpeedEnum.SLOW3,
  SpeedEnum.SLOW2,
  SpeedEnum.SLOW1,
  SpeedEnum.NORMAL,
  SpeedEnum.FAST1,
  SpeedEnum.FAST2,
];

export default function Speed() {
  const { player } = useAnalyzer();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [speed, setSpeed] = useState<SpeedEnum>(SpeedEnum.NORMAL);

  useEffect(() => {
    player.onratechange = (e: Event) => {
      const currentTarget = e.currentTarget as HTMLVideoElement;
      setSpeed(currentTarget.playbackRate);
    };
  }, [player]);

  function handleChangePlaybackRate(speed: SpeedEnum) {
    player.playbackRate = speed;
    setIsOpen(false);
  }

  function handleOpenChange(open: boolean) {
    setIsOpen(open);
  }

  return (
    <Popover.Root onOpenChange={handleOpenChange} open={isOpen}>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="btn-action"
          aria-label="Change video playback rate"
        >
          <BsSpeedometer />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="py-2 bg-black shadow rounded duration-300 ease-in-out will-change-auto grid gap-2">
          {playbackRates.map((rate) => (
            <button
              key={rate}
              type="button"
              onClick={() => handleChangePlaybackRate(rate)}
              className={`block text-center py-1 px-4 ${
                rate === speed ? "text-brand-blue bg-white" : ""
              }`}
            >
              {rate}x
            </button>
          ))}

          <Popover.Arrow className="fill-black" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
