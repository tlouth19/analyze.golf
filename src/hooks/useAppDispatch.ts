import { useDispatch } from "react-redux";

import type store from "@redux/store";

type AppDispatch = typeof store.dispatch;

const useAppDispatch: () => AppDispatch = useDispatch;

export default useAppDispatch;
