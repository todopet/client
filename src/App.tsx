import React, { Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Loading } from "@/components/Loading";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Toast } from "@/components/Toast";
import { MainLayout } from "@/layout/MainLayout";
import { queryClient } from "@/libs/queryClient";
import { ProtectedRoute } from "@/routers/ProtectedRoute";
import { PublicRoute } from "@/routers/PublicRoute";
import { routeLogin, routePaths } from "@/routers";
import { useAuthStore } from "@/store/authStore";
import { useLoadingStore } from "@/store/loadingStore";

const App: React.FC = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isAuthLoading = useAuthStore((state) => state.isLoading);
  const isGlobalLoading = useLoadingStore((state) => state.isLoading);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      useAuthStore.setState({ isLoading: false });
      return;
    }

    void checkAuth();
  }, [checkAuth, location.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        {(isAuthLoading || isGlobalLoading) && <Loading />}
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-screen w-full min-w-[320px] max-w-[640px]">
            <Suspense fallback={<Loading />}>
              <ErrorBoundary
                fallback={
                  <div className="flex h-full flex-col items-center justify-center gap-3 p-4 text-center">
                    <h2 className="text-xl font-bold">페이지를 불러오지 못했습니다</h2>
                    <p className="text-gray-600">
                      잠시 후 다시 시도하거나 홈으로 이동해주세요.
                    </p>
                    <button
                      type="button"
                      onClick={() => window.location.assign("/")}
                      className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                    >
                      홈으로 이동
                    </button>
                  </div>
                }
              >
                <Routes>
                  <Route
                    path={routeLogin.path}
                    element={
                      <PublicRoute>
                        <MainLayout
                          withHeader={routeLogin.withHeader}
                          withFooter={routeLogin.withFooter}
                        >
                          {routeLogin.element}
                        </MainLayout>
                      </PublicRoute>
                    }
                  />

                  {routePaths.map((data) => (
                    <Route
                      key={data.path}
                      path={data.path}
                      element={
                        <ProtectedRoute>
                          <MainLayout
                            withHeader={data.withHeader}
                            withFooter={data.withFooter}
                          >
                            {data.element}
                          </MainLayout>
                        </ProtectedRoute>
                      }
                    />
                  ))}
                </Routes>
              </ErrorBoundary>
            </Suspense>
          </div>
        </div>
        <div className="toast-wrapper" />
        <Toast />
      </ErrorBoundary>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default App;
