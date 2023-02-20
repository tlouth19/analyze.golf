import { useEffect, useState } from "react";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";

const enterLabel = "Enter full screen mode";
const exitLabel = "Exit full screen mode";

interface Props {
  player: HTMLVideoElement;
}

export default function FullScreen(props: Props) {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isFullScreenPossible, setIsFullScreenPossible] =
    useState<boolean>(false);

  // Some ios devices don't allow full screen
  useEffect(() => {
    const el = props.player.parentElement;
    if (el && typeof el.requestFullscreen !== "undefined") {
      setIsFullScreenPossible(true);
    }
  }, [props.player]);

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  function handleFullScreenChange(e: Event) {
    setIsFullScreen(!!document.fullscreenElement);
  }

  async function handleFullScreen() {
    const el = props.player.parentElement;
    if (el) {
      try {
        el.requestFullscreen();
      } catch (err) {
        alert;
        alert(err);
      }
    }
  }

  function handleExitFullScreen() {
    document.exitFullscreen();
  }

  if (!isFullScreenPossible) {
    return null;
  }

  if (isFullScreen) {
    return (
      <button
        type="button"
        className="btn-action"
        onClick={handleExitFullScreen}
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
      onClick={handleFullScreen}
      aria-label={enterLabel}
      title={enterLabel}
    >
      <BsFullscreen />
    </button>
  );
}
