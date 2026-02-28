import axios, { AxiosError } from 'axios';

/**
 * API 에러 타입 정의
 */
export interface ApiErrorResponse {
  status: number;
  error: string;
  message?: string;
}

/**
 * 에러 메시지 매핑
 */
const ERROR_MESSAGES: Record<number, string> = {
  400: '잘못된 요청입니다.',
  401: '인증이 필요합니다. 다시 로그인해주세요.',
  403: '접근 권한이 없습니다.',
  404: '요청한 리소스를 찾을 수 없습니다.',
  409: '이미 존재하는 데이터입니다.',
  429: '너무 많은 요청을 보냈습니다. 잠시 후 다시 시도해주세요.',
  500: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  502: '서버 연결에 실패했습니다.',
  503: '서버가 일시적으로 사용 불가능합니다.',
};

const DEFAULT_ERROR_MESSAGE = '오류가 발생했습니다. 다시 시도해주세요.';

/**
 * Axios 에러인지 확인하는 타입 가드
 */
export const isAxiosError = (error: unknown): error is AxiosError<ApiErrorResponse> => {
  return axios.isAxiosError(error);
};

/**
 * 에러 메시지 추출
 */
export const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    const status = error.response?.status;
    const serverMessage = error.response?.data?.message;

    // 서버에서 제공한 메시지가 있으면 우선 사용
    if (serverMessage) {
      return serverMessage;
    }

    // 상태 코드별 메시지
    if (status && ERROR_MESSAGES[status]) {
      return ERROR_MESSAGES[status];
    }
  }

  if (error instanceof Error) {
    return error.message || DEFAULT_ERROR_MESSAGE;
  }

  return DEFAULT_ERROR_MESSAGE;
};

/**
 * 전역 에러 핸들러
 *
 * @param error - 처리할 에러 객체
 * @param customMessage - 커스텀 에러 메시지 (선택)
 * @returns 에러 메시지 문자열
 *
 * @example
 * ```typescript
 * try {
 *   await axiosRequest.requestAxios("get", "users");
 * } catch (error) {
 *   const message = handleApiError(error);
 *   // toast(message) 등 사용자 알림 시스템 사용
 * }
 * ```
 */
export const handleApiError = (
  error: unknown,
  customMessage?: string
): string => {
  console.error('[API Error]:', error);

  // 인증 에러 처리 (401)
  if (isAxiosError(error) && error.response?.status === 401) {
    // 로그인 페이지로 리다이렉트
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }

  const errorMessage = customMessage || getErrorMessage(error);
  return errorMessage;
};

/**
 * 에러를 콘솔에만 기록 (사용자에게 표시하지 않음)
 */
export const logError = (error: unknown, context?: string): void => {
  const prefix = context ? `[${context}]` : '[Error]';
  console.error(prefix, error);
};

/**
 * 네트워크 에러인지 확인
 */
export const isNetworkError = (error: unknown): boolean => {
  return isAxiosError(error) && !error.response;
};

/**
 * 타임아웃 에러인지 확인
 */
export const isTimeoutError = (error: unknown): boolean => {
  return isAxiosError(error) && error.code === 'ECONNABORTED';
};
