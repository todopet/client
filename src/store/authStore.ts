import { ApiResponse, MyUser } from "@/@types";
import { axiosRequest } from "@/api";
import { API_ENDPOINTS } from "@/api/endpoints";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthCheckResponse {
  status?: number;
  result?: string;
  message?: string;
}

interface AuthState {
  isAuth: boolean;
  isLoading: boolean;
  user: MyUser | null;
  error: string | null;
  checkAuth: () => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  setAuth: (isAuth: boolean, user?: MyUser | null) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

const isAuthorized = (response: ApiResponse<AuthCheckResponse>) =>
  response.status === 200 || response.data?.status === 200;

const fetchUser = async () => {
  try {
    const userResponse = await axiosRequest.requestAxios<ApiResponse<MyUser>>(
      "get",
      API_ENDPOINTS.USER.INFO
    );
    return userResponse.data;
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuth: false,
      isLoading: true,
      user: null,
      error: null,

      checkAuth: async () => {
        set({ isLoading: true });
        try {
          const response = await axiosRequest.requestAxios<ApiResponse<AuthCheckResponse>>(
            "get",
            API_ENDPOINTS.AUTH.CHECK
          );

          if (isAuthorized(response)) {
            const user = await fetchUser();
            set({ isAuth: true, user, error: null });
            return;
          }

          set({ isAuth: false, user: null });
        } catch {
          set({ isAuth: false, user: null });
        } finally {
          set({ isLoading: false });
        }
      },

      login: async (email: string, password: string) => {
        set({ error: null });
        try {
          if (email && password) {
            await axiosRequest.requestAxios<ApiResponse<{}>>("post", API_ENDPOINTS.AUTH.LOGIN, {
              email,
              password,
            });
          }

          await get().checkAuth();
          return get().isAuth;
        } catch {
          set({ isAuth: false, user: null, error: "로그인에 실패했습니다." });
          return false;
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await axiosRequest.requestAxios<ApiResponse<{}>>("post", API_ENDPOINTS.AUTH.LOGOUT);
          set({ isAuth: false, user: null });
        } catch (error) {
          set({ error: "로그아웃에 실패했습니다." });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      setAuth: (isAuth, user = null) => {
        set({ isAuth, user });
      },

      setError: (error) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuth: state.isAuth,
        user: state.user,
      }),
    }
  )
);
