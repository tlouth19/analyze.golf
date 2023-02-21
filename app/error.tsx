"use client";

import { useEffect } from "react";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="text-center h-screen flex items-center justify-center">
      <div>
        <BsFillExclamationCircleFill className="mx-auto text-3xl mb-1" />
        <h2 className="text-2xl font-bold mb-2">Error</h2>
        <code className="inline-block mb-4">{error.message}</code>
        <div className="flex justify-center gap-2">
          <button
            className="px-2 py-1 bg-transparent border border-current rounded uppercase font-semibold text-white  tracking-wide"
            onClick={reset}
          >
            Try Again
          </button>
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
