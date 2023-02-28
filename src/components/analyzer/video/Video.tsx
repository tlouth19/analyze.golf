import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  setPlayback,
  setDuration,
  setCurrentTime,
  setSpeed,
  setMuted,
} from "../../../redux/slices/video";

const Video = () => {
  const blob = useAppSelector((state) => state.video.blob);
  const isFlipped = useAppSelector((state) => state.video.isFlipped);
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
    />
  );
};

export default Video;
