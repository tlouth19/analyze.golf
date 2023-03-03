import { type TypedUseSelectorHook, useSelector } from "react-redux";

import type store from "@redux/store";

type RootState = ReturnType<typeof store.getState>;

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
