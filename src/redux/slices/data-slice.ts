import { createApi } from "@reduxjs/toolkit/query/react";

import baseQuery from "@/redux/middleware/base-query";
import { User } from "@/redux/slices/data.types";

const dataSlice = createApi({
  reducerPath: "data",
  baseQuery: baseQuery,
  tagTypes: ["Data", "Profile"],
  endpoints: (builder) => ({
    getProfile: builder.query<User, string>({ // Just example not confirmed
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
  })
})

export default dataSlice;

export const { 
  useGetProfileQuery, 
  useLazyGetProfileQuery
} = dataSlice;
