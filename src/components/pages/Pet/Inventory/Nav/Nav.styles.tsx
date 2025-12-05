import React from "react";
import { Button } from "@/components/Button/Button";

type DivProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };

const NavWrap = ({ className = "", ...props }: DivProps) => (
  <div
    className={["box-border flex gap-[22px] justify-center basis-[12%]", className].join(" ")}
    {...props}
  />
);

type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { on?: boolean };
const ButtonStyled = ({ on: isOn, className = "", children, ...props }: BtnProps) => (
  <Button
    className={["p-0 border-0 bg-transparent", !isOn ? "hover:opacity-50" : "", className].join(" ")}
    {...props}
  >
    {/* Consumers pass SVGs; stroke highlight applied there if needed */}
    {children}
  </Button>
);

export {
  NavWrap,
  ButtonStyled,
};