import { BsFillSkipForwardFill, BsFillSkipBackwardFill } from "react-icons/bs";

const skipBackLabel = "Skip back";
const skipForwardLabel = "Skip forward";

interface Props {
  player: HTMLVideoElement;
}

export default function Skip(props: Props) {
  function handleSkipForward() {
    props.player.currentTime += 0.05;
  }

  function handleSkipBackward() {
    props.player.currentTime -= 0.05;
  }

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
}
