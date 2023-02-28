import { useEffect } from "react";
import { useWindowSize } from "rooks";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";

import type { RootState, AppDispatch } from "./redux/store";

// This component fixes issues settings 100vh on mobile devices (especially ios safari)
export const useVhHeight = () => {
  const { innerHeight } = useWindowSize();

  useEffect(() => {
    if (innerHeight != null) {
      const doc = document.documentElement;
      doc.style.setProperty("--doc-height", `${innerHeight}px`);
    }
  }, [innerHeight]);
};

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
