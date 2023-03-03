import { useEffect } from "react";
import { useWindowSize } from "rooks";

// This hooks fixes issues settings 100vh on mobile devices (especially ios safari)
const useVhHeight = () => {
  const { innerHeight } = useWindowSize();

  useEffect(() => {
    if (innerHeight != null) {
      const doc = document.documentElement;
      doc.style.setProperty("--doc-height", `${innerHeight}px`);
    }
  }, [innerHeight]);
};

export default useVhHeight;
