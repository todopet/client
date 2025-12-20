import React, { Suspense, useEffect, useState } from "react";
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

  const checkAuth = async () => {
    setIsLoading(true); // api 호출하는 동안만
    try {
      const response: res<auth> = await axiosRequest.requestAxios<res<auth>>("get", `users/auth`);
      setIsLoading(false);
      if (response.data.status === 200) {
        setIsAuth(true);
        return;
      }
    } catch (error) {
      alert("토큰 인증 에러가 발생했습니다. 새로고침해 주세요.");
      setIsAuth(false);
      navigate("/");
      console.error("Failed to check auth.", error);
    }
    setIsLoading(false);
    // 2023-12-23 주석처리
    // setIsAuth(false);
    // navigate("/");
  };

  useEffect(() => {
    checkAuth();
  }, []);

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
