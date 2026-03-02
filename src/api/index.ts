import axios from "axios";
import { notifyErrorMessage } from "@/libs/utils/notifyApiError";
import { useAuthStore } from "@/store/authStore";
import { useLoadingStore } from "@/store/loadingStore";
import { env } from "@/config/env";
import { getCsrfToken, refreshCsrfToken } from "@/api/csrf";
import { API_ENDPOINTS } from "@/api/endpoints";
import { logger } from "@/utils/logger";

type AxiosRequestConfig = import("axios").AxiosRequestConfig;
type AxiosError = import("axios").AxiosError;

const allowMethod: string[] = ["get", "post", "put", "patch", "delete"];
const csrfSafeMethods = new Set(["get", "head", "options"]);
const isAuthCheckEndpoint = (url: string | undefined) => {
  if (!url) return false;
  return url.includes(API_ENDPOINTS.AUTH.CHECK);
};
const matchesCsrfEndpoint = (url: string | undefined) => {
  if (!url) return false;
  return url.includes(env.csrfEndpoint);
};
const isCsrfEndpoint = (url: string | undefined) => {
  if (!env.enableCsrfProtection) return false;
  return matchesCsrfEndpoint(url);
};
const shouldAttachCsrfToken = (method: string, url: string | undefined) =>
  !csrfSafeMethods.has(method) && !matchesCsrfEndpoint(url);

axios.defaults.baseURL = env.apiUrl;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;
axios.defaults.timeout = env.apiTimeout;

// 요청 인터셉터
axios.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const isCsrfRequest = matchesCsrfEndpoint(config.url);
    // 로딩 시작
    if (!isCsrfRequest) {
      useLoadingStore.getState().startLoading();
    }
    const method = (config.method ?? "get").toLowerCase();
    config.headers = config.headers ?? {};

    // FormData인 경우 Content-Type 자동 설정
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else if (["post", "put", "patch", "delete"].includes(method)) {
      config.headers["Content-Type"] = "application/json";
    }

    if (shouldAttachCsrfToken(method, config.url)) {
      let csrfToken = getCsrfToken();
      if (!csrfToken && env.enableCsrfProtection) {
        csrfToken = await refreshCsrfToken();
      }

      if (csrfToken) {
        config.headers["X-CSRF-Token"] = csrfToken;
      }
    }

    logger.debug("API request", {
      source: "api/interceptor",
      data: {
        method,
        url: config.url,
      },
    });

    return config;
  },
  (error) => {
    // 로딩 종료
    if (!matchesCsrfEndpoint(error?.config?.url)) {
      useLoadingStore.getState().stopLoading();
    }
    logger.error("API request interceptor failed", {
      source: "api/interceptor",
      data: { error },
    });
    return Promise.reject(error);
  }
);

// 응답 인터셉터
axios.interceptors.response.use(
  (response) => {
    const isCsrfRequest = matchesCsrfEndpoint(response.config.url);
    // 로딩 종료
    if (!isCsrfRequest) {
      useLoadingStore.getState().stopLoading();
    }
    logger.debug("API response", {
      source: "api/interceptor",
      data: {
        method: response.config.method,
        url: response.config.url,
        status: response.status,
      },
    });

    return response;
  },
  async (error: AxiosError) => {
    const isCsrfRequest = matchesCsrfEndpoint(error.config?.url);
    // 로딩 종료
    if (!isCsrfRequest) {
      useLoadingStore.getState().stopLoading();
    }

    if (error.response) {
      const { status } = error.response;
      if (isCsrfRequest && status === 404) {
        // CSRF 엔드포인트 미구현 서버에서는 정상적인 폴백 시나리오다.
        return Promise.reject(error);
      }
      const isExpectedPublicAuthCheck =
        status === 401 &&
        isAuthCheckEndpoint(error.config?.url) &&
        typeof window !== "undefined" &&
        window.location.pathname === "/";

      if (!isExpectedPublicAuthCheck && import.meta.env.DEV) {
        logger.error("API response error", {
          source: "api/interceptor",
          data: {
            method: error.config?.method,
            url: error.config?.url,
            status: error.response?.status,
            responseData: error.response?.data,
          },
        });
      }

      const originalRequest = error.config as (AxiosRequestConfig & {
        _csrfRetried?: boolean;
      }) | undefined;

      if (
        env.enableCsrfProtection &&
        status === 403 &&
        originalRequest &&
        !originalRequest._csrfRetried &&
        !matchesCsrfEndpoint(originalRequest.url)
      ) {
        originalRequest._csrfRetried = true;
        const refreshedToken = await refreshCsrfToken();

        if (refreshedToken) {
          originalRequest.headers = {
            ...(originalRequest.headers ?? {}),
            "X-CSRF-Token": refreshedToken,
          };
          return axios(originalRequest);
        }
      }

      switch (status) {
        case 401: {
          useAuthStore.getState().setAuth(false, null);
          useAuthStore.getState().clearError();
          if (isExpectedPublicAuthCheck) {
            break;
          }

          logger.warn("인증이 만료되었습니다.", {
            source: "api/interceptor",
            data: { status, url: error.config?.url },
          });
          if (window.location.pathname !== "/") {
            notifyErrorMessage("인증이 만료되었습니다. 다시 로그인해주세요.");
            window.location.replace("/");
          }
          break;
        }
        case 403: {
          const method = (error.config?.method ?? "").toLowerCase();
          const csrfToken = getCsrfToken();
          logger.warn("접근 권한이 없습니다.", {
            source: "api/interceptor",
            data: {
              status,
              method,
              url: error.config?.url,
              responseData: error.response?.data,
              hasCsrfToken: Boolean(csrfToken),
            },
          });
          break;
        }
        case 404: {
          logger.warn("요청한 리소스를 찾을 수 없습니다.", {
            source: "api/interceptor",
            data: { status, url: error.config?.url },
          });
          break;
        }
        case 500:
        case 502:
        case 503: {
          logger.error("서버 오류가 발생했습니다.", {
            source: "api/interceptor",
            data: { status, url: error.config?.url },
          });
          break;
        }
        default: {
          logger.error("처리되지 않은 상태코드", {
            source: "api/interceptor",
            data: { status, url: error.config?.url },
          });
        }
      }
    } else if (error.request) {
      logger.error("응답이 도착하지 않았습니다.", {
        source: "api/interceptor",
        data: { url: error.config?.url },
      });
    } else {
      logger.error("요청 설정 중 오류가 발생했습니다.", {
        source: "api/interceptor",
        data: { message: error.message, url: error.config?.url },
      });
    }

    return Promise.reject(error);
  }
);

// 정의된 함수 시그니처에 맞게 인터페이스 생성
interface AxiosRequest {
  requestAxios: <T>(method: string, url: string, data?: {}, headers?: {}) => Promise<T>;
}

export const axiosRequest: AxiosRequest = {
  /**
   * 작성자명   : 원종석
   * 작성일자   : 2023.08.02.(수)
   * 작성내용   : axios로 요청 보내기
   * 수정일자   : none
   * 수정내용   : none
   * @param method 어떤 형식의 method를 보내는지 설정 (get, post, put, patch, delete)
   * @param url 호출 url 작성. path param은 url에 같이 정의해준다.
   * @param data request body에 해당하는 사항. post, put 시 추가/수정할 객체를 지정해주면 된다. get은 빈 객체를 보낸다.
   */
  requestAxios: async <T>(method: string, url: string, data = {}, headers = {}) => {
    // 이상한 method 넣으면 실행 못하게 미리 에러 처리 한다.
    if (!allowMethod.includes(method.toLowerCase()))
      throw new Error("허용되지 않은 호출 method입니다.");
    try {
      const normalizedMethod = method.toLowerCase();
      const requestConfig =
        normalizedMethod === "get"
          ? {
              method,
              url: `${axios.defaults.baseURL}${url}`,
              params: data,
              headers,
            }
          : {
              method,
              url: `${axios.defaults.baseURL}${url}`,
              data,
              headers,
            };

      const response = await axios({
        ...requestConfig, // 아이템, 인벤토리 호출할때만 넣기. 주요 기능에만 제한하는 것은 어떨지
      });

      return response.data as T;
    } catch (error) {
      // 에러는 인터셉터에서 처리되므로 그대로 throw
      throw error;
    }
  },
};
