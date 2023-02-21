"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import Link from "next/link";

interface PlayerErrorProps {
  player: HTMLVideoElement;
}

export default function PlayerError(props: PlayerErrorProps) {
  const [isError, setIsError] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const blob = searchParams.get("blob");
  const checkBlob = useCallback(async () => {
    if (blob) {
      try {
        await fetch(blob);
      } catch (err) {
        setIsError(true);
      }
    }
  }, [blob]);

  useEffect(() => {
    props.player.addEventListener("error", handleError);
    return () => {
      props.player.removeEventListener("error", handleError);
    };
  }, [props.player]);

  useEffect(() => {
    checkBlob();
  }, [blob, checkBlob]);

  function handleError(e: Event) {
    console.log(e);
  }

  if (!isError) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-[10] flex items-center justify-center bg-black bg-opacity-90">
      <div className="text-center">
        <BsFillExclamationCircleFill className="mx-auto text-3xl mb-1" />
        <h2 className="text-2xl font-bold mb-4">A Playback Error Occured</h2>
        <div className="">
          <Link
            href="/"
            className="px-2 py-1 bg-transparent border border-current rounded uppercase font-semibold text-white tracking-wide"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
