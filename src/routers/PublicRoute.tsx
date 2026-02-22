import React from "react";
import { Navigate } from "react-router-dom";
import { Loading } from "@/components/Loading";

interface PublicRouteProps {
  isAuth: boolean;
  isLoading: boolean;
  redirectTo?: string;
  children: React.ReactNode;
}

export const PublicRoute = ({
  isAuth,
  isLoading,
  redirectTo = "/todo",
  children,
}: PublicRouteProps) => {
  if (isLoading) {
    return <Loading />;
  }

  if (isAuth) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
