import React, { Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Loading } from "@/components/Loading";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Toast } from "@/components/Toast";
import { MainLayout } from "@/layout/MainLayout";
import { ProtectedRoute } from "@/routers/ProtectedRoute";
import { PublicRoute } from "@/routers/PublicRoute";
// import NotFound from "@/pages/NotFound";
import { routeLogin, routePaths } from "@/routers";
import { useAuthStore } from "@/store/authStore";

const App: React.FC = () => {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    void checkAuth();
  }, [checkAuth]);

  return (
    <ErrorBoundary>
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-screen w-full min-w-[320px] max-w-[640px]">
          <Suspense fallback={<Loading />}>
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
          </Suspense>
        </div>
      </div>
      <div className="toast-wrapper" />
      <Toast />
    </ErrorBoundary>
  );
};

export default App;
