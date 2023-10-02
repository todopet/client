import { lazy } from "react";

const Todo = lazy(() => import("@/pages/Todo/Todo"));
const Login = lazy(() => import("@/pages/Login/Login"));
const Ranking = lazy(() => import("@/pages/Ranking/Ranking"));
const Pet = lazy(() => import("@/pages/Pet/Pet"));
const MyPage = lazy(() => import("@/pages/MyPage/MyPage"));
const CategoryList = lazy(
    () => import("@/pages/Category/CategoryList/CategoryList")
);
const CategoryPost = lazy(
    () => import("@/pages/Category/CategoryPost/CategoryPost")
);

export const routeLogin = {
  path: "/",
  element: <Login />,
  withHeader: false,
  withFooter: false,
};

export const routePaths = [
  {
    path: "/",
    element: <Login />,
    withHeader: false,
    withFooter: false,
  },
  {
    path: "/category/list",
    element: <CategoryList />,
    withHeader: false,
    withFooter: false,
  },
  {
    path: "/category/post",
    element: <CategoryPost />,
    withHeader: false,
    withFooter: false,
  },
  { path: "/todo", element: <Todo />, withHeader: true, withFooter: true },
  { path: "/pet", element: <Pet />, withHeader: true, withFooter: true },
  { path: "/rank", element: <Ranking />, withHeader: true, withFooter: true },
  { path: "/mypage", element: <MyPage />, withHeader: true, withFooter: true },
];
