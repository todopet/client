import React, { useEffect, useState } from "react";
import { GlobalStyle, LayoutWrapper } from "@/App.styles";
import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
import Todo from "@/pages/Todo/Todo";
import Login from "@/pages/Login/Login";
import Ranking from "@/pages/Ranking/Ranking";
import Pet from "@/pages/Pet/Pet";
import MyPage from "@/pages/MyPage/MyPage";
import CategoryList from "@/pages/Category/CategoryList/CategoryList";
import CategoryPost from "@/pages/Category/CategoryPost/CategoryPost";
import Loading from "./components/Loading/Loading";
import { StyleSheetManager } from "styled-components";
import axiosRequest from "./api";
import { res } from "./@types";
// import NotFound from "@/pages/NotFound";

const routeLogin = {
    path: "/",
    element: <Login />,
    withHeader: false,
    withFooter: false
};

const routePaths = [
    {
        path: "/",
        element: <Login />,
        withHeader: false,
        withFooter: false
    },
    {
        path: "/category/list",
        element: <CategoryList />,
        withHeader: false,
        withFooter: false
    },
    {
        path: "/category/post",
        element: <CategoryPost />,
        withHeader: false,
        withFooter: false
    },
    { path: "/todo", element: <Todo />, withHeader: true, withFooter: true },
    { path: "/pet", element: <Pet />, withHeader: true, withFooter: true },
    { path: "/rank", element: <Ranking />, withHeader: true, withFooter: true },
    { path: "/mypage", element: <MyPage />, withHeader: true, withFooter: true }
];

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
        try {
            setIsLoading(true); // api 호출하는 동안만

            const response: res<auth> = await axiosRequest.requestAxios<
                res<auth>
            >("get", `/users/auth`);
            setIsLoading(false);
            if (response.data.status === 200) {
                setIsAuth(true);
                return;
            }
        } catch (error) {
            setIsAuth(false);
            navigate("/");
            console.error("Failed to check auth.", error);
        }

        setIsAuth(false);
        navigate("/");
    };

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <>
            <GlobalStyle />
            {isLoading && <Loading />}
            <Routes>
                {!isAuth && (
                    <Route
                        path={routeLogin.path}
                        element={
                            <StyleSheetManager
                                shouldForwardProp={(prop) =>
                                    !["withheader", "withfooter"].includes(prop)
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
                                        !["withheader", "withfooter"].includes(
                                            prop
                                        )
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
        </>
    );
};

export default App;
