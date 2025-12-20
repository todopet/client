import React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };

const ModalBg = ({ className = "", ...props }: DivProps) => (
  <div
    className={[
      "fixed top-[60px] bottom-[70px] w-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-[15]",
      className,
    ].join(" ")}
    {...props}
  />
);

type ModalWrapProps = DivProps & { on: boolean };
const ModalWrap = ({ on, className = "", style, ...props }: ModalWrapProps) => (
  <div
    className={[
      "absolute bottom-0 left-0 w-full rounded-t-[30px] bg-white flex flex-col z-[20] transition-all duration-500 gap-2 overflow-hidden",
      className,
    ].join(" ")}
    style={{ height: on ? "85%" : "0%", ...(style || {}) }}
    {...props}
  />
);

const Title = ({ className = "", ...props }: DivProps) => (
  <div className={["text-[12px]", className].join(" ")} {...props} />
);

const Count = ({ className = "", style, ...props }: DivProps) => (
  <div
    className={["text-[12px] px-1 py-1 border-b", className].join(" ")}
    style={{ borderBottomWidth: "1.7px", ...(style || {}) }}
    {...props}
  />
);

const Header = ({ className = "", ...props }: DivProps) => (
  <div
    className={[
      "flex flex-col justify-center items-center basis-[12%] font-medium",
      className,
    ].join(" ")}
    {...props}
  />
);

const ItemList = ({ className = "", ...props }: DivProps) => (
  <div className={["flex flex-col gap-2 basis-[70%]", className].join(" ")} {...props} />
);

export { ModalBg, ModalWrap, Title, Count, Header, ItemList };
