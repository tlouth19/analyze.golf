import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

import useAppSelector from "@hooks/useAppSelector";
import { getPlayer } from "@helpers";

const playLabel = "Play video";
const pauseLabel = "Pause video";

const PlayPause = () => {
  const { isPlaying } = useAppSelector((state) => state.video);

  const handlePause = () => {
    getPlayer().pause();
  };

  const handlePlay = () => {
    void getPlayer().play();
  };

  if (isPlaying) {
    return (
      <button
        type="button"
        className="btn-action"
        onClick={handlePause}
        aria-label={pauseLabel}
        title={pauseLabel}
      >
        <BsFillPauseFill />
      </button>
    );
  }

  return (
    <button
      type="button"
      className="btn-action"
      onClick={handlePlay}
      aria-label={playLabel}
      title={playLabel}
    >
      <BsFillPlayFill />
    </button>
  );
};

export default PlayPause;
