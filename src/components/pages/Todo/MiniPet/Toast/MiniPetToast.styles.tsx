import React from "react";

interface ToastWrapProps {
  $show: boolean;
  bgcolor: "black" | "white";
  className?: string;
}

const ToastWrap = ({ $show, bgcolor, className = "", style, ...props }: React.HTMLAttributes<HTMLDivElement> & ToastWrapProps) => (
  <div
    className={[
      "box-border flex flex-col justify-center whitespace-nowrap text-center font-[Inter] text-[16px] font-bold leading-normal z-[10] absolute min-w-[250px] min-h-[45px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] shadow-[0_0_10px_rgba(0,0,0,0.25)] rounded-[10px] px-[10px] py-[4px]",
      className,
    ].join(" ")}
    style={{
      visibility: $show ? "visible" : "hidden",
      color: bgcolor === "black" ? "#ffffff" : "#000000",
      background: bgcolor === "black" ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.9)",
      animation: $show ? "toastFadeIn 1s, toastFadeOut 1s 3.5s" : "none",
      animationFillMode: "forwards",
      ...(style || {}),
    }}
    {...props}
  />
);

export { ToastWrap };
