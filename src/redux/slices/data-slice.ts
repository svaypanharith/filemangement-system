import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "@/redux/middleware/base-query";
import {
  user,
  DocumentType,
  ChatResponseData,
  ChatRequest,
} from "@/redux/slices/data.types";
import { API_URL } from "@/utils/env";

const dataSlice = createApi({
  reducerPath: "data",
  baseQuery: baseQuery,
  tagTypes: ["Data", "Profile"],
  endpoints: (builder) => ({
    getChat: builder.mutation<ChatResponseData, ChatRequest>({
      query: (data) => ({
        url: `${API_URL}/chat`,
        method: "POST",
        body: data,
      }),
    }),

    // get profile
    getProfileInfo: builder.query<user, void>({
      query: () => ({
        url: `${API_URL}/profile`,
        method: "GET",
      }),
      providesTags: ["Profile"],
      keepUnusedDataFor: 300,
    }),
    // update profile
    updateProfile: builder.mutation<
      {
        message: string;
        status: number | string;
      },
      {
        username: string;
        first_name: string;
        last_name: string;
      }
    >({
      query: (data) => ({
        url: `${API_URL}/profile/update`,
        method: "PUT",
        body: data,
      }),
    }),
    // update password
    updatePassword: builder.mutation<
      {
        message: string;
        status: number | string;
      },
      {
        current_password: string;
        new_password: string;
      }
    >({
      query: (data) => ({
        url: `${API_URL}/profile/update-password`,
        method: "PUT",
        body: data,
      }),
    }),
    // upload file to the server
    uploadFileDocument: builder.mutation<
      {
        message: string;
        status: number | string;
      },
      FormData
    >({
      query: (data) => ({
        url: `${API_URL}/upload`,
        method: "POST",
        body: data,
      }),
    }),
    // get all documents
    getDocuments: builder.query<DocumentType, void>({
      query: () => ({
        url: `${API_URL}/documents`,
        method: "GET",
      }),
    }),
    deleteDocument: builder.mutation<
      {
        message: string;
        status: number | string;
      },
      {
        id: string;
      }
    >({
      query: (data) => ({
        url: `${API_URL}/documents/delete`,
        method: "DELETE",
        body: data,
      }),
    }),

    updateDocument: builder.mutation<
      {
        message: string;
        status: number | string;
      },
      {
        id: string;
        title: string;
        tags: string;
        color_code: string;
      }
    >({
      query: (data) => ({
        url: `${API_URL}/documents/update`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export default dataSlice;

export const {
  useGetProfileInfoQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useUploadFileDocumentMutation,
  useGetDocumentsQuery,
  useDeleteDocumentMutation,
  useGetChatMutation,
  useUpdateDocumentMutation,
} = dataSlice;
