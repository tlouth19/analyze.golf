import { BsFillSkipForwardFill, BsFillSkipBackwardFill } from "react-icons/bs";
import { usePlayer } from "./Analyzer";

const skipBackLabel = "Skip back";
const skipForwardLabel = "Skip forward";

export default function Skip() {
  const player = usePlayer();

  function handleSkipForward() {
    player.currentTime += 0.05;
  }

  function handleSkipBackward() {
    player.currentTime -= 0.05;
  }

  return (
    <>
      <button
        type="button"
        className="btn-action"
        onClick={handleSkipBackward}
        aria-label={skipBackLabel}
        title={skipBackLabel}
        disabled={!player}
      >
        <BsFillSkipBackwardFill />
      </button>
      <button
        type="button"
        className="btn-action"
        onClick={handleSkipForward}
        aria-label={skipForwardLabel}
        title={skipForwardLabel}
        disabled={!player}
      >
        <BsFillSkipForwardFill />
      </button>
    </>
  );
}
