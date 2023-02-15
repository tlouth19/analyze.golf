"use client";

import { useRouter } from "next/navigation";
import React, { useRef } from "react";

export default function SelectFile() {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  function handleOpenFile() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  function handleSelectFile(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    const files = target.files;
    if (files?.[0]) {
      const blob = URL.createObjectURL(files[0]);
      router.push(`/analyze?blob=${encodeURIComponent(blob)}`);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpenFile}
        className="px-4 py-3 bg-brand-blue rounded uppercase font-semibold text-white text-xl tracking-wide mb-2"
      >
        Select Video
      </button>
      <input
        className="hidden"
        ref={inputRef}
        accept="video/mp4,video/x-m4v,video/*"
        multiple={false}
        onChange={handleSelectFile}
        type="file"
      />
    </>
  );
}
