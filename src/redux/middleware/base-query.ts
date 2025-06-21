import { API_URL } from "@/utils/env";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";

const getToken = () => {
  const cookieToken = Cookies.get("auth_token");
  if (cookieToken) return cookieToken;
  return undefined;
};

const baseQuery = async (args: any, api: any, extraOptions: any) => {
  const authToken = getToken();

  const baseResult = await fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');
      headers.set('X-Requested-With', 'XMLHttpRequest'); 
      
      if (authToken) {
        headers.set("Authorization", `Bearer ${authToken}`);
      }
      return headers;
    },
    credentials: 'include', // Important for CORS
    mode: 'cors', // Explicitly set CORS mode
  })(args, api, extraOptions);

  // Handle CORS errors
  if (baseResult.error?.status === 'FETCH_ERROR') {
    return {
      error: {
        status: 'CORS_ERROR',
        data: 'Unable to reach the server. Please check your connection.',
      },
    };
  }

  return baseResult;
};

export { baseQuery };

