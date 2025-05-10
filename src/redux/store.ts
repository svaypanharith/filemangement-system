import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./slices/data-slice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    data: dataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(dataSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
