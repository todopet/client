import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loading } from "@/components/Loading";
import { useAuthStore } from "@/store/authStore";

interface PublicRouteProps {
  redirectTo?: string;
  children: React.ReactNode;
}

export const PublicRoute = ({ redirectTo = "/todo", children }: PublicRouteProps) => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const isLoading = useAuthStore((state) => state.isLoading);
  const location = useLocation();

  const previousPath =
    typeof location.state === "object" && location.state && "from" in location.state
      ? (location.state as { from?: { pathname?: string } }).from?.pathname
      : undefined;

  if (isLoading) {
    return <Loading />;
  }

  if (isAuth) {
    return <Navigate to={previousPath || redirectTo} replace />;
  }

  return <>{children}</>;
};
