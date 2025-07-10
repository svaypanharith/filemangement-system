"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserProfile {
  first_name: string;
  last_name: string;
  username: string;
}

interface UserProfileState {
  userProfile: UserProfile | null;
}

const initialState: UserProfileState = {
  userProfile: null,
};

export const userProfileSlice = createSlice({
  name: "UserProfileSlice",
  initialState,
  
  reducers: {
    setUserProfile: (state, action: PayloadAction<UserProfile>) => {
      state.userProfile = action.payload;
    },
    clearUserProfile: (state) => {
      state.userProfile = null;
    },
  },
});

export const { setUserProfile, clearUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;



