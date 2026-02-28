import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Loading } from "@/components/Loading";
import { useAuthStore } from "@/store/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuth = useAuthStore((state) => state.isAuth);
  const isLoading = useAuthStore((state) => state.isLoading);
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  if (!isAuth) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};
