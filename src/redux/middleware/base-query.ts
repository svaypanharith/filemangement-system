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
    prepareHeaders: (headers, { getState, endpoint }) => {
      if (!(args.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json');
      }
      headers.set('Accept', 'application/json');
      headers.set('X-Requested-With', 'XMLHttpRequest');
      if (authToken) {
        headers.set("Authorization", `Bearer ${authToken}`);
      }
      return headers;
    },
    credentials: 'omit', 
    mode: 'cors', 
  })(args, api, extraOptions);
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

