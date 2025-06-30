import { baseQuery } from "@/redux/middleware/base-query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { AuthState, SignIn, SignUp , AuthResponse } from "@/redux/slices/data.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_URL } from "@/utils/env";
import Cookies from "js-cookie";

const initialState: AuthState = {
  isAuthenticated: false,
  data: null,
  isLoading: false,
  error: null,
  status: null,
  message: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  tagTypes: ["Auth", "User"],
  endpoints: (builder) => ({
    signIn: builder.mutation<{ token: string; user: any; message: string }, SignIn>({
      query: (credentials) => ({
        url: `${API_URL}/login`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
      transformErrorResponse: (response: AuthResponse) => {
        return {
          status: response.status,
          message: response.data?.message || "Sign in failed",
        };
      },
    }),

    signUp: builder.mutation<AuthState, SignUp>({
      query: (credentials) => ({
        url: `${API_URL}/register`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
      transformErrorResponse: (response: { status: number; data: { message: string } }) => {
        return {
          status: response.status,
          message: response.data?.message || "Sign up failed",
        };
      },
    }),

    signOut: builder.mutation<AuthState, void>({
      query: () => ({
        url: `${API_URL}/logout`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),
      invalidatesTags: ["Auth", "User"],
      transformErrorResponse: (response: { status: number; data: { message: string } }) => {
        return {
          status: response.status,
          message: response.data?.message || "Sign out failed",
        };
      },
    }),

   
    resetPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Export hooks with consistent naming
export const {
  useSignInMutation,
  useSignUpMutation,
  useSignOutMutation,
  
  useResetPasswordMutation,
} = authApi;

// Export the combined reducer
export default {
  auth: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
};

