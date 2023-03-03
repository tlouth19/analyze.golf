import { Layer, Circle, Line } from "react-konva";

import useAppSelector from "@hooks/useAppSelector";

import { DrawTypeEnum } from "@enums";

const Shapes = () => {
  const { shapes } = useAppSelector((state) => state.draw);

  return (
    <Layer>
      {shapes.map((shape) => {
        switch (shape.type) {
          case DrawTypeEnum.FREE:
          case DrawTypeEnum.LINE:
            return (
              <Line
                key={shape.key}
                points={shape.points}
                stroke={shape.color}
                strokeWidth={5}
                tension={0.5}
              />
            );
          case DrawTypeEnum.CIRCLE:
            return (
              <Circle
                key={shape.key}
                x={shape.points[0]}
                y={shape.points[1]}
                width={shape.width}
                height={shape.height}
                stroke={shape.color}
                strokeWidth={5}
                tension={0.5}
                radius={50}
              />
            );
          default:
            throw Error("Invalid draw type");
        }
      })}
    </Layer>
  );
};

export default Shapes;
