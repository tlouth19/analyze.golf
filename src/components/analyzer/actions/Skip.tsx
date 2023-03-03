import { BsFillSkipForwardFill, BsFillSkipBackwardFill } from "react-icons/bs";
import { getPlayer } from "@helpers";

const skipBackLabel = "Skip back";
const skipForwardLabel = "Skip forward";

const Skip = () => {
  const handleSkipForward = () => {
    getPlayer().currentTime += 0.05;
  };

  const handleSkipBackward = () => {
    getPlayer().currentTime -= 0.05;
  };

  return (
    <>
      <button
        type="button"
        className="btn-action"
        onClick={handleSkipBackward}
        aria-label={skipBackLabel}
        title={skipBackLabel}
      >
        <BsFillSkipBackwardFill />
      </button>
      <button
        type="button"
        className="btn-action"
        onClick={handleSkipForward}
        aria-label={skipForwardLabel}
        title={skipForwardLabel}
      >
        <BsFillSkipForwardFill />
      </button>
    </>
  );
};

export default Skip;
