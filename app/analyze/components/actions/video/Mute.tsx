import { useEffect, useState } from "react";
import { BsFillVolumeMuteFill, BsFillVolumeDownFill } from "react-icons/bs";

const mutedLabel = "Unmute video";
const label = "Mute video";

interface Props {
  player: HTMLVideoElement;
}

export default function Mute(props: Props) {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    props.player.addEventListener("volumechange", handleVolumeChange);
    return () => {
      props.player.removeEventListener("volumechange", handleVolumeChange);
    };
  }, [props.player]);

  function handleVolumeChange(e: Event) {
    const currentTarget = e.currentTarget as HTMLVideoElement;
    setIsMuted(currentTarget.muted);
  }

  function handleMute() {
    props.player.muted = true;
  }

  function handleVolume() {
    props.player.muted = false;
  }

  if (isMuted) {
    return (
      <button
        type="button"
        className="btn-action"
        onClick={handleVolume}
        aria-label={mutedLabel}
        title={mutedLabel}
      >
        <BsFillVolumeMuteFill />
      </button>
    );
  }

  return (
    <button
      type="button"
      className="btn-action"
      onClick={handleMute}
      aria-label={label}
      title={label}
    >
      <BsFillVolumeDownFill />
    </button>
  );
}
