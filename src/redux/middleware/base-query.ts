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
      if (authToken) {
        headers.set("authorization", `Bearer ${authToken}`);
      }
      return headers;
    }
  })(args, api, extraOptions);
  return baseResult;
}

export default baseQuery;
