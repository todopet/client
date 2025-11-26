import React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };
type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string };

const Container = ({ className = "", ...props }: DivProps) => (
  <div
    className={["flex flex-col justify-center w-[390px] h-[30px] px-[15px] mt-5 box-border", className].join(" ")}
    {...props}
  />
);

const ActionContainer = ({ className = "", ...props }: DivProps) => (
  <div className={["flex justify-center items-center w-full relative", className].join(" ")} {...props} />
);

const Button = ({ className = "", ...props }: BtnProps) => (
  <button
    className={[
      "border-0 bg-transparent p-[10px] flex items-center cursor-pointer text-center leading-[18px] text-[16px] font-medium",
      className,
    ].join(" ")}
    {...props}
  />
);

const Text = ({ className = "", ...props }: DivProps) => (
  <div className={["mx-auto text-[16px] font-bold text-center", className].join(" ")} {...props} />
);

export { Container, Button, Text, ActionContainer };
