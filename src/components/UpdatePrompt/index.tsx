import React from "react";
import { useRegisterSW } from "virtual:pwa-register/react";

export const UpdatePrompt: React.FC = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  if (!offlineReady && !needRefresh) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-28 z-50 flex justify-center px-4">
      <div className="pointer-events-auto w-full max-w-[360px] rounded-3xl border border-emerald-200 bg-white/95 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur">
        <p className="text-sm font-semibold text-slate-900">
          {needRefresh ? "새 버전이 준비되었습니다" : "오프라인 준비가 완료되었습니다"}
        </p>
        <p className="mt-1 text-sm text-slate-600">
          {needRefresh
            ? "앱을 새로 고치면 최신 기능과 캐시가 적용됩니다."
            : "네트워크가 불안정해도 Todo Pet 핵심 화면을 열 수 있습니다."}
        </p>
        <div className="mt-4 flex gap-2">
          {needRefresh ? (
            <button
              type="button"
              onClick={() => void updateServiceWorker(true)}
              className="flex-1 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              지금 업데이트
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setOfflineReady(false)}
              className="flex-1 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
            >
              확인
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              setNeedRefresh(false);
              setOfflineReady(false);
            }}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
