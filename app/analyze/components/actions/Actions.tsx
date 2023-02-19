import { useState } from "react";
import classNames from "classnames";

import PlayPause from "./PlayPause";
import Close from "./Close";
import Muted from "./Mute";
import Flip from "./Flip";
import Skip from "./Skip";
import Progress from "./Progress";
import Speed from "./Speed";
import DrawTools from "./DrawTools";

interface Props {
  player: HTMLVideoElement;
}

export default function Actions(props: Props) {
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  return (
    <>
      <div
        className={classNames(
          "absolute top-0 left-0 grid gap-1 p-2 z-[2] opacity-100 transition-opacity ",
          { "!opacity-0 pointer-events-none": isDrawing }
        )}
      >
        <Close />
        <Muted player={props.player} />
        <Flip player={props.player} />
      </div>
      <div
        className={classNames(
          "absolute bottom-0 left-0 right-0  p-2 flex items-center gap-1 z-[2] opacity-100 transition-opacity",
          { "!opacity-0 pointer-events-none": isDrawing }
        )}
      >
        <PlayPause player={props.player} />
        <Progress player={props.player} isDrawing={isDrawing} />
        <Skip player={props.player} />
        <Speed player={props.player} />
      </div>
      <DrawTools isDrawing={isDrawing} setIsDrawing={setIsDrawing} />
    </>
  );
}
