import { baseQuery } from "@/redux/middleware/base-query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { AuthState, SignIn, SignUp , AuthResponse } from "@/redux/slices/data.types";


export const authApi = createApi({
  reducerPath: "authApi", 
  baseQuery: baseQuery,
  tagTypes: ["Auth", "User"], 
  
  endpoints: (builder) => ({
    // Sign In
    signIn: builder.mutation<AuthState, SignIn>({
      query: (credentials) => ({
        url: "/auth/signin",
        method: "POST",
        body: credentials,
      }),
      // Invalidate auth-related cache after successful login
      invalidatesTags: ["Auth"],
      // Transform error response if needed
      transformErrorResponse: (response: AuthResponse) => {
        return {
          status: response.status,
          message: response.data?.message || "Sign in failed",
        };
      },
    }),

    // Sign Up
    signUp: builder.mutation<AuthState, SignUp>({
      query: (credentials) => ({
        url: "/auth/signup",
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

    // Sign Out (recommended addition)
    signOut: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/signout",
        method: "POST",
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    // Get Current User (recommended addition)
    getCurrentUser: builder.query<AuthState, void>({
      query: () => "/auth/me",
      providesTags: ["Auth"],
    }),

    // Refresh Token (recommended addition)
    // refreshToken: builder.mutation<{ accessToken: string }, void>({
    //   query: () => ({
    //     url: "/auth/refresh",
    //     method: "POST",
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),

    // Reset Password (common auth feature)
    resetPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    // Verify Email (common auth feature)
    // verifyEmail: builder.mutation<{ message: string }, { token: string }>({
    //   query: (data) => ({
    //     url: "/auth/verify-email",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Auth"],
    // }),
  }),
});

// Export hooks with consistent naming
export const {
  useSignInMutation,
  useSignUpMutation,
  useSignOutMutation,
  useGetCurrentUserQuery,
//   useRefreshTokenMutation,
  useResetPasswordMutation,
//   useVerifyEmailMutation,
} = authApi;

// Export the reducer
export default authApi.reducer;

