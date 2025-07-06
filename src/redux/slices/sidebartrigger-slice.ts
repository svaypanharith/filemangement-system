"use client";

import { createSlice } from "@reduxjs/toolkit";

interface SidebarTriggerState {
  text: string;
  iconName?: string;
}

const initialState: SidebarTriggerState = {
  text: "",
  iconName: undefined,
};

export const sidebarTriggerSlice = createSlice({
  name: "sidebarTriggerText",
  initialState,
  reducers: {
    setText: (state, action) => {
      state.text = action.payload;
    },
    setIconName: (state, action) => {
      state.iconName = action.payload;
    },
    setSidebarTrigger: (state, action) => {
      state.text = action.payload.text || "";
      state.iconName = action.payload.iconName;
    },
  },
});

export const { setText, setIconName, setSidebarTrigger } = sidebarTriggerSlice.actions;
export default sidebarTriggerSlice.reducer;