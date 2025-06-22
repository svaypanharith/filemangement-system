import { configureStore } from "@reduxjs/toolkit";
import changeThemeColorReducer from "@/redux/slices/theme-slice";
import authReducers, { authApi } from "@/redux/slices/auth-slice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: {
    changeThemeColor: changeThemeColorReducer,
    ...authReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
