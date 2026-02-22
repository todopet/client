import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loading } from "@/components/Loading";

interface ProtectedRouteProps {
  isAuth: boolean;
  isLoading: boolean;
  children: React.ReactNode;
}

export const ProtectedRoute = ({ isAuth, isLoading, children }: ProtectedRouteProps) => {
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuth) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};
