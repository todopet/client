import { create } from 'zustand';

interface LoadingState {
  isLoading: boolean;
  loadingCount: number;
  startLoading: () => void;
  stopLoading: () => void;
  resetLoading: () => void;
}

/**
 * 전역 로딩 상태 관리 Store
 *
 * 여러 API 요청이 동시에 발생할 수 있으므로 카운터 방식으로 관리합니다.
 */
export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  loadingCount: 0,

  startLoading: () =>
    set((state) => ({
      loadingCount: state.loadingCount + 1,
      isLoading: true,
    })),

  stopLoading: () =>
    set((state) => {
      const newCount = Math.max(0, state.loadingCount - 1);
      return {
        loadingCount: newCount,
        isLoading: newCount > 0,
      };
    }),

  resetLoading: () =>
    set({
      loadingCount: 0,
      isLoading: false,
    }),
}));
