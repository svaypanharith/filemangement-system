import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "@/redux/middleware/base-query";
import {
  user,
  DocumentType,
  ChatResponseData,
  ChatRequest,
  QueryRequest,
  QueryResponse,
  SessionQueriesResponse,
  UserSessionsResponse,
  EndSessionRequest,
  EndSessionResponse,
} from "@/redux/slices/data.types";
import { API_URL } from "@/utils/env";

const dataSlice = createApi({
  reducerPath: "data",
  baseQuery: baseQuery,
  tagTypes: ["Data", "Profile", "Query", "Session"],
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

    // Ask a question to AI
    askQuestion: builder.mutation<QueryResponse, QueryRequest>({
      query: (data) => ({
        url: `${API_URL}/ask`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Query", "Session"],
    }),

    // Get user sessions
    getUserSessions: builder.query<UserSessionsResponse, void>({
      query: () => ({
        url: `${API_URL}/sessions`,
        method: "GET",
      }),
      providesTags: ["Session"],
    }),

    // Get session queries
    getSessionQueries: builder.query<SessionQueriesResponse, { session_id: number }>({
      query: ({ session_id }) => ({
        url: `${API_URL}/sessions/queries?session_id=${session_id}`,
        method: "GET",
      }),
      providesTags: ["Query"],
    }),

    // End session
    endSession: builder.mutation<EndSessionResponse, EndSessionRequest>({
      query: (data) => ({
        url: `${API_URL}/sessions/end`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Session"],
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
  useAskQuestionMutation,
  useGetUserSessionsQuery,
  useGetSessionQueriesQuery,
  useEndSessionMutation,
} = dataSlice;
