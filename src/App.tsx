import React from "react";
import { GlobalStyle } from "@/App.styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Todo from "@/pages/Todo/Todo";
import Login from "@/pages/Login/Login";
import CommonLayout from "./components/layout/CommonLayout";
import Ranking from "@/pages/Ranking/Ranking";
import Pet from "@/pages/Pet/Pet";
import MyPage from "@/pages/MyPage/MyPage";
import CategoryList from "@/pages/Category/CategoryList/CategoryList";
import CategoryPost from "@/pages/Category/CategoryPost/CategoryPost";
// import NotFound from "@/pages/NotFound";

const App: React.FC = () => {
    return (
        <>
            <GlobalStyle />
            <Router>
                <CommonLayout>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route
                            path="/category/list"
                            element={<CategoryList />}
                        />
                        <Route
                            path="/category/post"
                            element={<CategoryPost />}
                        />
                        <Route path="/todo" element={<Todo />} />
                        <Route path="/pet" element={<Pet />} />
                        <Route path="/rank" element={<Ranking />} />
                        <Route path="/mypage" element={<MyPage />} />
                    </Routes>
                </CommonLayout>
            </Router>
        </>
    );
};

export default App;
