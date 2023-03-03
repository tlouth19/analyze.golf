import { BsEraser } from "react-icons/bs";

import useAppSelector from "@hooks/useAppSelector";
import useAppDispatch from "@hooks/useAppDispatch";
import { eraseShapes } from "@redux/slices/draw";

const Erase = () => {
  const { shapes } = useAppSelector((state) => state.draw);
  const dispatch = useAppDispatch();

  const handleErase = () => {
    dispatch(eraseShapes());
  };

  if (shapes.length === 0) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleErase}
      aria-label="Erase all shapes`"
      className="btn-action"
    >
      <BsEraser />
    </button>
  );
};

export default Erase;
