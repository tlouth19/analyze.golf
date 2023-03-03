import { useRef } from "react";
import { Stage } from "react-konva";

import { useWindowSize } from "rooks";
import useCanvasEvents from "@hooks/useCanvasEvents";

import Shapes from "./Shapes";

const Canvas = () => {
  const { innerHeight, innerWidth } = useWindowSize();
  const canvasEvents = useCanvasEvents();
  const initialCanvasWidthRef = useRef<number>(
    innerWidth !== null ? innerWidth : 0
  );

  const width = innerWidth !== null ? innerWidth : 0;
  const height = innerHeight !== null ? innerHeight : 0;

  const scale = width / initialCanvasWidthRef.current;

  return (
    <Stage
      {...canvasEvents}
      width={width}
      height={height}
      className="absolute inset-0"
      scaleX={scale}
      scaleY={scale}
    >
      <Shapes />
    </Stage>
  );
};

export default Canvas;
