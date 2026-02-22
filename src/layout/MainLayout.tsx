import React, { ReactNode } from "react";
import Footer from "@/layout/Footer";
import { Header } from "@/layout/Header";
import { cn } from "@/libs/utils/classnames";

interface MainLayoutProps {
  withHeader?: boolean;
  withFooter?: boolean;
  children: ReactNode;
}

export const MainLayout = ({
  withHeader = true,
  withFooter = true,
  children,
}: MainLayoutProps) => {
  return (
    <>
      {withHeader && <Header />}
      <div
        className={cn(
          "overflow-y-scroll overflow-x-hidden [scrollbar-width:none]",
          withHeader && "mt-[60px]",
          withFooter && "mb-[70px]",
          withHeader && withFooter
            ? "h-[calc(100vh-130px)]"
            : withHeader
              ? "h-[calc(100vh-60px)]"
              : withFooter
                ? "h-[calc(100vh-70px)]"
                : "h-screen"
        )}
      >
        {children}
      </div>
      {withFooter && <Footer />}
    </>
  );
};
