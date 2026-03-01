import axios from "axios";
import { env } from "@/config/env";

type CsrfResponse = {
  data?: {
    csrfToken?: string;
  };
  csrfToken?: string;
  token?: string;
};

let csrfTokenCache = "";

const readCsrfTokenFromCookie = (): string => {
  if (typeof document === "undefined") return "";

  const match = document.cookie.match(/(?:^|;\s*)csrf_token=([^;]+)/i);
  return match ? decodeURIComponent(match[1]) : "";
};

const getTokenFromResponse = (response: CsrfResponse): string => {
  return (
    response?.data?.csrfToken ??
    response?.csrfToken ??
    response?.token ??
    ""
  );
};

export const getCsrfToken = (): string => {
  if (csrfTokenCache) return csrfTokenCache;

  const cookieToken = readCsrfTokenFromCookie();
  if (cookieToken) {
    csrfTokenCache = cookieToken;
  }

  return csrfTokenCache;
};

export const refreshCsrfToken = async (): Promise<string> => {
  try {
    const response = await axios.get<CsrfResponse>(env.csrfEndpoint, {
      withCredentials: true,
    });
    const token = getTokenFromResponse(response.data);
    csrfTokenCache = token;
    return token;
  } catch {
    return "";
  }
};

export const clearCsrfToken = () => {
  csrfTokenCache = "";
};
