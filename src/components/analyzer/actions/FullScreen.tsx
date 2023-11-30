import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { useFullscreen } from "rooks";
import { track } from "@vercel/analytics";

const enterLabel = "Enter full screen mode";
const exitLabel = "Exit full screen mode";

const FullScreen = () => {
  const { isFullscreenAvailable, isFullscreenEnabled, toggleFullscreen } =
    useFullscreen();

  const handleToggle = () => {
    void toggleFullscreen();
    track("Toggle full screen");
  };

  if (!isFullscreenAvailable) {
    return null;
  }

  if (isFullscreenEnabled) {
    return (
      <button
        type="button"
        className="btn-action"
        onClick={handleToggle}
        aria-label={exitLabel}
        title={exitLabel}
      >
        <BsFullscreenExit />
      </button>
    );
  }

  return (
    <button
      type="button"
      className="btn-action"
      onClick={handleToggle}
      aria-label={enterLabel}
      title={enterLabel}
    >
      <BsFullscreen />
    </button>
  );
};

export default FullScreen;
