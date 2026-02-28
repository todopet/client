export interface ApiSuccessResponse<TData = unknown> {
  status: number;
  error: null;
  data: TData;
}

export interface ApiErrorResponse {
  status: number;
  error: string;
  message?: string;
  details?: Record<string, unknown>;
}

export type ApiResponse<TData = unknown> = ApiSuccessResponse<TData> | ApiErrorResponse;

export const isApiError = <TData>(
  response: ApiResponse<TData>
): response is ApiErrorResponse => {
  return response.error !== null;
};
