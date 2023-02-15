import { useEffect, useState } from "react";
import { BsFillVolumeMuteFill, BsFillVolumeDownFill } from "react-icons/bs";

import { usePlayer } from "./Analyzer";

const mutedLabel = "Unmute video";
const label = "Mute video";

export default function Muted() {
  const player = usePlayer();
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
   
      player.onvolumechange = (e) => {
        const currentTarget = e.currentTarget as HTMLVideoElement;
        setIsMuted(currentTarget.muted);
      };

  }, [player]);

  function handleMute() {
   
      player.muted = true;
  
  }

  function handleVolume() {
   
      player.muted = false;
  
  }

  if (isMuted) {
    return (
      <button
        type="button"
        className="btn-action"
        onClick={handleVolume}
        aria-label={mutedLabel}
        title={mutedLabel}
        disabled={!player}
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
      disabled={!player}
    >
      <BsFillVolumeDownFill />
    </button>
  );
}
