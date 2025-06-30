import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "@/redux/middleware/base-query";
import { ChatRequest, ChatResponseData, User } from "@/redux/slices/data.types";
import { API_URL } from "@/utils/env";
import Cookies from "js-cookie";

const dataSlice = createApi({
  reducerPath: "data",
  baseQuery: baseQuery,
  tagTypes: ["Data", "Profile"],
  endpoints: (builder) => ({
    getProfile: builder.query<User, string>({ // Just example not confirmed
      query: (id) => ({
        url: `${API_URL}/users/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("auth_token")}`,
        },
      }),
      providesTags: ["Profile"],
    }),
    getChat: builder.mutation<ChatResponseData, ChatRequest>({
      query: (data) => ({
        url: `${API_URL}/chat`,
        method: "POST",
        body: data,
      }),
    }),
   
  }),
})

export default dataSlice;

export const { 
  useGetProfileQuery, 
  useLazyGetProfileQuery,
  useGetChatMutation,
} = dataSlice;
