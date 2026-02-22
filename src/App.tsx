import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Loading } from "@/components/Loading";
import { axiosRequest } from "@/api";
import { res } from "@/@types";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Toast } from "@/components/Toast";
import { MainLayout } from "@/layout/MainLayout";
// import NotFound from "@/pages/NotFound";
import { routeLogin, routePaths } from "@/routers";

interface auth {
  status: number;
  result: string;
  message: string;
}

const App: React.FC = () => {
  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const response: res<auth> = await axiosRequest.requestAxios<res<auth>>("get", `users/auth`);
      const isAuthorized = response?.data?.status === 200;
      setIsAuth(isAuthorized);
      if (!isAuthorized) {
        navigate("/");
      }
    } catch (error) {
      setIsAuth(false);
      navigate("/");
      console.error("Failed to check auth.", error);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <ErrorBoundary>
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-screen w-full min-w-[320px] max-w-[640px]">
          {/* {isLoading && <Loading />} */}
          <Suspense fallback={isLoading && <Loading />}>
            <Routes>
              {!isAuth && (
                <Route
                  path={routeLogin.path}
                  element={
                    <MainLayout
                      withHeader={routeLogin.withHeader}
                      withFooter={routeLogin.withFooter}
                    >
                      {routeLogin.element}
                    </MainLayout>
                  }
                />
              )}

              {isAuth &&
                routePaths.map((data) => (
                  <Route
                    key={data.path}
                    path={data.path}
                    element={
                      <MainLayout
                        withHeader={data.withHeader}
                        withFooter={data.withFooter}
                      >
                        {data.element}
                      </MainLayout>
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
