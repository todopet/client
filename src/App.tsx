import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "@/layout/Footer";
import { Header } from "@/layout/Header";
import { Loading } from "@/components/Loading";
import { axiosRequest } from "@/api";
import { res } from "@/@types";
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
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-screen w-full min-w-[320px] max-w-[640px]">
        {/* {isLoading && <Loading />} */}
        <Suspense fallback={isLoading && <Loading />}>
          <Routes>
            {!isAuth && (
              <Route
                path={routeLogin.path}
                element={
                  <div
                    className={[
                      routeLogin.withHeader ? "mt-[60px]" : "mt-0",
                      routeLogin.withHeader && routeLogin.withFooter
                        ? "h-[calc(100vh-130px)]"
                        : "h-screen",
                      routeLogin.withFooter ? "mb-[70px]" : "mb-0",
                      "overflow-y-scroll overflow-x-hidden [scrollbar-width:none]",
                    ].join(" ")}
                  >
                    {routeLogin.withHeader && <Header />}
                    {routeLogin.element}
                    {routeLogin.withFooter && <Footer />}
                  </div>
                }
              />
            )}

            {isAuth &&
              routePaths.map((data) => (
                <Route
                  key={data.path}
                  path={data.path}
                  element={
                    <div
                      className={[
                        data.withHeader ? "mt-[60px]" : "mt-0",
                        data.withHeader && data.withFooter ? "h-[calc(100vh-130px)]" : "h-screen",
                        data.withFooter ? "mb-[70px]" : "mb-0",
                        "overflow-y-scroll overflow-x-hidden [scrollbar-width:none]",
                      ].join(" ")}
                    >
                      {data.withHeader && <Header />}
                      {data.element}
                      {data.withFooter && <Footer />}
                    </div>
                  }
                />
              ))}
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
