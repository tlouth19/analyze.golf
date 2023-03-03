import { useState } from "react";
import { createPortal } from "react-dom";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import FocusLock from "react-focus-lock";

import useAppSelector from "@hooks/useAppSelector";
import useAppDispatch from "@hooks/useAppDispatch";
import {
  setPlayback,
  setDuration,
  setCurrentTime,
  setSpeed,
  setMuted,
  reset,
} from "@redux/slices/video";

const Video = () => {
  const { blob, isFlipped } = useAppSelector((state) => state.video);
  const [playbackError, setPlaybackError] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const onPlay = () => {
    dispatch(setPlayback(true));
  };

  const onPause = () => {
    dispatch(setPlayback(false));
  };

  const onDurationChange = (e: React.SyntheticEvent) => {
    const currentTarget = e.currentTarget as HTMLVideoElement;
    dispatch(setDuration(currentTarget.duration));
  };

  const onTimeUpdate = (e: React.SyntheticEvent) => {
    const currentTarget = e.currentTarget as HTMLVideoElement;
    dispatch(setCurrentTime(currentTarget.currentTime));
    dispatch(setDuration(currentTarget.duration));
  };

  const onRateChange = (e: React.SyntheticEvent) => {
    const currentTarget = e.currentTarget as HTMLVideoElement;
    dispatch(setSpeed(currentTarget.playbackRate));
  };

  const onVolumeChange = (e: React.SyntheticEvent) => {
    const currentTarget = e.currentTarget as HTMLVideoElement;
    dispatch(setMuted(currentTarget.muted));
  };

  const handleReset = () => {
    dispatch(reset());
  };

  const onError = () => {
    setPlaybackError(true);
  };

  if (playbackError) {
    return createPortal(
      <FocusLock>
        <div className="fixed inset-0 flex items-center justify-center z-[100000] bg-white dark:bg-black bg-opacity-90">
          <div className="text-center">
            <BsFillExclamationCircleFill className="text-4xl mb-2 mx-auto" />
            <h2 className="text-lg uppercase font-bold mb-4">
              A Playback Error Occurred
            </h2>
            <button
              type="button"
              className="uppercase text-brand-blue font-semibold"
              onClick={handleReset}
            >
              Return Home
            </button>
          </div>
        </div>
      </FocusLock>,
      document.body
    );
  }

  return (
    <video
      src={blob}
      loop
      muted
      autoPlay
      playsInline
      data-flipped="false"
      className={`block max-h-full max-w-full h-full mx-auto pointer-events-none ${
        isFlipped ? "-scale-x-100" : "scale-x-100"
      }`}
      onPlay={onPlay}
      onPlaying={onPlay}
      onPause={onPause}
      onLoadedData={onDurationChange}
      onDurationChange={onDurationChange}
      onTimeUpdate={onTimeUpdate}
      onRateChange={onRateChange}
      onVolumeChange={onVolumeChange}
      onError={onError}
    />
  );
};

export default Video;
