"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BiLoaderCircle } from "react-icons/bi";

export default function SelectFile() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  function handleOpenFile() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  function handleSelectFile(e: React.SyntheticEvent) {
    try {
      const target = e.target as HTMLInputElement;
      const files = target.files;
      if (files && files.length > 0) {
        const blob = URL.createObjectURL(files[0]);
        setIsSubmitting(true);
        router.push(`/analyze?blob=${encodeURIComponent(blob)}`);
      }
    } catch (err) {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpenFile}
        disabled={isSubmitting}
        className="px-4 py-3 bg-brand-blue rounded uppercase font-semibold text-white text-xl tracking-wide mb-2 relative"
      >
        {isSubmitting && (
          <div className="absolute inset-0 flex items-center justify-center">
            <BiLoaderCircle className="animate-spin" />
          </div>
        )}
        <span className={`${isSubmitting ? "opacity-0" : ""}`}>
          Select Video
        </span>
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
