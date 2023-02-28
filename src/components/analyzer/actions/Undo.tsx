import { BsArrowCounterclockwise } from "react-icons/bs";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import { undoShape } from "../../../redux/slices/draw";

const Undo = () => {
  const shapes = useAppSelector((state) => state.draw.shapes);
  const dispatch = useAppDispatch();

  const handleUndo = () => {
    dispatch(undoShape());
  };

  if (shapes.length === 0) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleUndo}
      aria-label={"Erase last drawn shape"}
      className="btn-action"
    >
      <BsArrowCounterclockwise />
    </button>
  );
};

export default Undo;
