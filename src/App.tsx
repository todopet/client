import React, { Suspense, lazy, useEffect, useState } from "react";
import { GlobalStyle, LayoutWrapper } from "@/App.styles";
import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import Loading from "./components/Loading/Loading";
import { StyleSheetManager } from "styled-components";
import axiosRequest from "./api";
import { res } from "./@types";
// import NotFound from "@/pages/NotFound";
import { routeLogin, routePaths } from "@/routers/index";

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
            const response: res<auth> = await axiosRequest.requestAxios<
                res<auth>
            >("get", `/users/auth`);
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
        setIsAuth(false);
        // navigate("/");
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <>
            <GlobalStyle />
            {/* {isLoading && <Loading />} */}
            <Suspense fallback={isLoading && <Loading />}>
                <Routes>
                    {!isAuth && (
                        <Route
                            path={routeLogin.path}
                            element={
                                <StyleSheetManager
                                    shouldForwardProp={(prop) =>
                                        !["withheader", "withfooter"].includes(
                                            prop
                                        )
                                    }
                                >
                                    <LayoutWrapper
                                        withheader={routeLogin.withHeader.toString()}
                                        withfooter={routeLogin.withFooter.toString()}
                                    >
                                        {routeLogin.withHeader && <Header />}
                                        {routeLogin.element}
                                        {routeLogin.withFooter && <Footer />}
                                    </LayoutWrapper>
                                </StyleSheetManager>
                            }
                        />
                    )}

                    {isAuth &&
                        routePaths.map((data) => (
                            <Route
                                key={data.path}
                                path={data.path}
                                element={
                                    <StyleSheetManager
                                        shouldForwardProp={(prop) =>
                                            ![
                                                "withheader",
                                                "withfooter"
                                            ].includes(prop)
                                        }
                                    >
                                        <LayoutWrapper
                                            withheader={data.withHeader.toString()}
                                            withfooter={data.withFooter.toString()}
                                        >
                                            {data.withHeader && <Header />}
                                            {data.element}
                                            {data.withFooter && <Footer />}
                                        </LayoutWrapper>
                                    </StyleSheetManager>
                                }
                            />
                        ))}
                </Routes>
            </Suspense>
        </>
    );
};

export default App;
