import { BsArrowLeftRight } from "react-icons/bs";

const label = "Flip video horizontally";

interface Props {
  player: HTMLVideoElement;
}

export default function Flip(props: Props) {
  function handleFlip() {
    const isFlipped = props.player.getAttribute("data-flipped");

    if (isFlipped === "false") {
      props.player.classList.remove("scale-x-100");
      props.player.classList.add("-scale-x-100");
      props.player.setAttribute("data-flipped", "true");
    } else {
      props.player.classList.remove("-scale-x-100");
      props.player.classList.add("scale-x-100");
      props.player.setAttribute("data-flipped", "false");
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
