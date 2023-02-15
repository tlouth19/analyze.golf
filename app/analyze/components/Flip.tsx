import { BsArrowLeftRight } from "react-icons/bs";
import { usePlayer } from "./Analyzer";

const label = "Flip video horizontally";

export default function Flip() {
  const player = usePlayer();

  function handleFlip() {
    const isFlipped = player.getAttribute("data-flipped");

    if (isFlipped === "false") {
      player.classList.remove("scale-x-100");
      player.classList.add("-scale-x-100");
      player.setAttribute("data-flipped", "true");
    } else {
      player.classList.remove("-scale-x-100");
      player.classList.add("scale-x-100");
      player.setAttribute("data-flipped", "false");
    }
  }

  return (
    <button
      type="button"
      className="btn-action"
      onClick={handleFlip}
      aria-label={label}
      title={label}
    >
      <BsArrowLeftRight />
    </button>
  );
}
