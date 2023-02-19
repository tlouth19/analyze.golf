import { useState } from "react";
import classNames from "classnames";
import * as Separator from "@radix-ui/react-separator";

import PlayPause from "./video/PlayPause";
import Close from "./video/Close";
import Muted from "./video/Mute";
import Flip from "./video/Flip";
import Skip from "./video/Skip";
import Progress from "./video/Progress";
import Speed from "./video/Speed";
import Draw from "./draw/Draw";

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
        <Separator.Root
          orientation="horizontal"
          className="w-full h-[1px] my-1 bg-transparent"
        />
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
      <Draw isDrawing={isDrawing} setIsDrawing={setIsDrawing} />
    </>
  );
}
