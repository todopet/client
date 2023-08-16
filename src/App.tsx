import React from "react";
// import "./App.css";
import { GlobalStyle } from "@/App.styles";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import Todo from "@/pages/Todo/Todo";
import Login from "@/pages/Login/Login";
// import Ranking from "@/pages/Ranking/Ranking";
// import Pet from "@/pages/Pet/Pet";
// import MyPage from "@/pages/MyPage/MyPage";
// import NotFound from "@/pages/NotFound";

function App() {
    return (
        <>
            <GlobalStyle />
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <LayoutWithHeaderAndFooter
                                setLayout={false}
                                children={<Login />}
                            />
                        }
                    />
                    <Route
                        path="/todo"
                        element={
                            <LayoutWithHeaderAndFooter
                                setLayout={true}
                                children={<Todo />}
                            />
                        }
                    />
                </Routes>
            </Router>
        </>
    );
}

// @ts-ignore
function LayoutWithHeaderAndFooter({ setLayout, children }) {
    return (
        <>
            {setLayout && <Header />}
            {children}
            {setLayout && <Footer />}
        </>
    );
}

export default App;
