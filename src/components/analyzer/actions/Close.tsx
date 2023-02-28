import { BsFillArrowLeftCircleFill } from "react-icons/bs";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { reset } from "../../../redux/slices/video";

const label = "Close video";

const Close = () => {
  const blob = useAppSelector((state) => state.video.blob);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    if (typeof blob === "string") {
      URL.revokeObjectURL(blob);
    }
    dispatch(reset());
  };

  return (
    <button
      type="button"
      className="btn-action"
      onClick={handleClose}
      aria-label={label}
      title={label}
    >
      <BsFillArrowLeftCircleFill />
    </button>
  );
};

export default Close;
