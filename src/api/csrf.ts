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
let isCsrfEndpointUnavailable = false;

const CSRF_COOKIE_CANDIDATES = ["csrf_token", "XSRF-TOKEN", "csrfToken"] as const;

const readCookieValue = (name: string): string => {
  if (typeof document === "undefined") return "";

  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${escapedName}=([^;]+)`, "i")
  );
  return match ? decodeURIComponent(match[1]) : "";
};

const readCsrfTokenFromCookie = (): string => {
  for (const cookieName of CSRF_COOKIE_CANDIDATES) {
    const token = readCookieValue(cookieName);
    if (token) return token;
  }
  return "";
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
  if (isCsrfEndpointUnavailable) {
    return "";
  }

  try {
    const response = await axios.get<CsrfResponse>(env.csrfEndpoint, {
      withCredentials: true,
    });
    const token = getTokenFromResponse(response.data);
    csrfTokenCache = token;
    isCsrfEndpointUnavailable = false;
    return token;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      isCsrfEndpointUnavailable = true;
    }
    return "";
  }
};

export const clearCsrfToken = () => {
  csrfTokenCache = "";
  isCsrfEndpointUnavailable = false;
};
