import { BsFillVolumeMuteFill, BsFillVolumeDownFill } from "react-icons/bs";
import { getPlayer } from "@helpers";
import { track } from "@vercel/analytics";

import useAppSelector from "@hooks/useAppSelector";

const mutedLabel = "Unmute video";
const label = "Mute video";

const Muted = () => {
  const { isMuted } = useAppSelector((state) => state.video);

  const handleMute = () => {
    getPlayer().muted = true;
    track("Mute video");
  };

  const handleVolume = () => {
    getPlayer().muted = false;
    track("Unmute video");
  };

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
};

export default Muted;
