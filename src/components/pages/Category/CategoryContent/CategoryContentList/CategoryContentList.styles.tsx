import React from "react";
import { Link } from "react-router-dom";

type DivProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };
type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string };

const Wrap = ({ className = "", ...props }: DivProps) => (
  <div className={["w-full px-[25px] pr-[25px] pl-[5px] py-[10px] -mt-[5px] box-border", className].join(" ")} {...props} />
);

const Text = ({ className = "", ...props }: DivProps) => (
  <div className={["text-[14px] text-[#adadad] mt-5 ml-5 font-medium", className].join(" ")} {...props} />
);

const ButtonWrap = ({ className = "", ...props }: DivProps) => (
  <div className={["flex flex-col ml-[18px] mt-[15px]", className].join(" ")} {...props} />
);

const CircleButton = ({ className = "", ...props }: BtnProps) => (
  <button
    className={[
      "min-h-8 h-auto max-w-[18rem] shrink-0 rounded-2xl bg-[#f5f5f5] border-0 my-[10px] px-[18px] py-[2px]",
      className,
    ].join(" ")}
    {...props}
  />
);

const ActionButtonWrap = ({ className = "", ...props }: DivProps) => (
  <div className={["flex justify-evenly", className].join(" ")} {...props} />
);

const ActionButton = ({ className = "", ...props }: BtnProps) => (
  <button
    className={["w-[10.1875rem] h-[2.375rem] shrink-0 border-0 rounded-lg bg-[#f5f5f5]", className].join(" ")}
    {...props}
  />
);

const CategorySpan = ({ className = "", ...props }: React.HTMLAttributes<HTMLSpanElement> & { className?: string }) => (
  <span className={["break-words", className].join(" ")} {...props} />
);

const StyledLink = ({ className = "", ...props }: React.ComponentProps<typeof Link>) => (
  <Link className={["ml-auto font-medium no-underline text-inherit", className].join(" ")} {...props} />
);

const ItemWrap = ({ className = "", ...props }: DivProps) => (
  <div className={["flex justify-between items-center w-full", className].join(" ")} {...props} />
);

export {
  Text,
  CircleButton,
  ButtonWrap,
  ActionButtonWrap,
  ActionButton,
  Wrap,
  CategorySpan,
  StyledLink,
  ItemWrap,
};
