import { BsArrowLeftRight } from "react-icons/bs";
import { track } from "@vercel/analytics";

import useAppSelector from "@hooks/useAppSelector";
import useAppDispatch from "@hooks/useAppDispatch";
import { setFlipped } from "@redux/slices/video";

const label = "Flip video horizontally";

const Flip = () => {
  const dispatch = useAppDispatch();
  const { isFlipped } = useAppSelector((state) => state.video);

  const handleFlip = () => {
    dispatch(setFlipped(!isFlipped));
    track("Flip video");
  };

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
};

export default Flip;
