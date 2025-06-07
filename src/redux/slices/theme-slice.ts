"use client";

import { createSlice } from "@reduxjs/toolkit";

export const changeThemeColorSlice = createSlice({
  name: "changeThemeColor",
  initialState: {
  theme: false,
  },
  
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    
  },
});


export const { setTheme } = changeThemeColorSlice.actions;

export default changeThemeColorSlice.reducer;



