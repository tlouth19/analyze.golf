"use client";

import { useEffect } from "react";
import { useWindowSize } from "rooks";

// This component fixes issues settings 100vh on mobile devices (especially ios safari)
export default function MobileVhListener() {
  const { innerHeight } = useWindowSize();

  useEffect(() => {
    if (innerHeight) {
      const doc = document.documentElement;
      doc.style.setProperty("--doc-height", `${innerHeight}px`);
    }
  }, [innerHeight]);

  return null;
}
