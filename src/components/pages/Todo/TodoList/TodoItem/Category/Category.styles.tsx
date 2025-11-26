import React from "react";

interface CategoryStylesProps {
    $isEnded: boolean;
}
type DivProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };
type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string };

const CategoryStyles = ({ $isEnded, className = "", style, ...props }: DivProps & CategoryStylesProps) => (
  <div
    className={[
      "bg-[#f2f2f2] w-fit h-8 rounded-[20px] flex justify-between items-center mb-[10px]",
      className,
    ].join(" ")}
    style={{ paddingRight: $isEnded ? "14px" : "10px", paddingLeft: "14px", ...(style || {}) }}
    {...props}
  />
);

const Text = ({ className = "", ...props }: React.HTMLAttributes<HTMLSpanElement> & { className?: string }) => (
  <span className={["text-[14px] font-semibold font-[Pretendard]", className].join(" ")} {...props} />
);

const PlusButton = ({ className = "", ...props }: BtnProps) => (
  <button
    className={["rounded-[15px] border-0 bg-white w-5 h-5 py-1 ml-[10px] cursor-pointer", className].join(" ")}
    {...props}
  />
);

export { CategoryStyles, Text, PlusButton };
