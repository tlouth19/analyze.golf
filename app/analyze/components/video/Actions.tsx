import { useState } from "react";
import classNames from "classnames";

import { VideoContext } from "app/context";

import PlayPause from "./PlayPause";
import Close from "./Close";
import Muted from "./Mute";
import Flip from "./Flip";
import Skip from "./Skip";
import Progress from "./Progress";
import Speed from "./Speed";
import DrawTools from "./analyze/DrawTools";

interface ActionsProps {
  player: HTMLVideoElement;
}

export default function Actions(props: ActionsProps) {
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  return (
    <VideoContext.Provider
      value={{ player: props.player, isDrawing, setIsDrawing }}
    >
      <div
        className={classNames(
          "absolute top-0 left-0 grid gap-1 p-2 z-[2] opacity-100 transition-opacity",
          { "!opacity-0 pointer-events-none": isDrawing }
        )}
      >
        <Close />
        <Muted />
        <Flip />
      </div>
      <div
        className={classNames(
          "absolute bottom-0 left-0 right-0 text-white p-2 flex items-center gap-1 z-[2] opacity-100 transition-opacity",
          { "!opacity-0 pointer-events-none": isDrawing }
        )}
      >
        <PlayPause />
        <Progress />
        <Skip />
        <Speed />
      </div>
      <DrawTools />
    </VideoContext.Provider>
  );
}
