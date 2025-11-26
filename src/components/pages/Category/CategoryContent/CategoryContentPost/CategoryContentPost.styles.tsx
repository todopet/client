import React from "react";

type DivProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };
type BtnProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string };
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { className?: string };

const InputContainer = ({ className = "", ...props }: DivProps) => (
  <div className={["flex justify-center items-center w-full mt-[30px]", className].join(" ")} {...props} />
);

const StyledInput = ({ className = "", style, ...props }: InputProps) => (
  <input
    className={["bg-transparent border-0 border-b-[1.8px] border-black outline-none text-[16px] py-[5px] w-[90%]", className].join(" ")}
    style={style}
    {...props}
  />
);

const Text = ({ className = "", ...props }: DivProps) => (
  <div className={["text-[15px]", className].join(" ")} {...props} />
);

const ButtonWrap = ({ className = "", ...props }: DivProps) => (
  <div className={["flex flex-col", className].join(" ")} {...props} />
);

const CircleButton = ({ className = "", ...props }: BtnProps) => (
  <button
    className={[
      "w-[4.8125rem] h-8 shrink-0 rounded-2xl bg-[#f5f5f5] border-0 my-[10px]",
      className,
    ].join(" ")}
    {...props}
  />
);
const ActionButtonWrap = ({ className = "", ...props }: DivProps) => (
  <div className={["flex justify-evenly mt-9", className].join(" ")} {...props} />
);

type ActionBtnProps = BtnProps & { type?: string };
const ActionButton = ({ className = "", type, style, ...props }: ActionBtnProps) => (
  <button
    className={["w-[10.1875rem] h-[2.375rem] shrink-0 border-0 rounded-md bg-[#f5f5f5] font-normal cursor-pointer", className].join(" ")}
    style={{ color: type === "exit" ? "black" : "#FA4D28", ...(style || {}) }}
    {...props}
  />
);

const ModalText = ({ className = "", ...props }: DivProps) => (
  <div
    className={[
      "flex h-[3.8125rem] flex-col justify-center shrink-0 text-black text-center text-[0.875rem] font-normal whitespace-pre-wrap",
      className,
    ].join(" ")}
    {...props}
  />
);

const ModalButtonWrap = ({ className = "", ...props }: DivProps) => (
  <div className={["flex flex-row justify-evenly", className].join(" ")} {...props} />
);

const ModalButton = ({ className = "", ...props }: BtnProps) => (
  <button
    className={["w-[7.07894rem] h-8 shrink-0 rounded-md bg-[#e7e8ea] border-0 cursor-pointer", className].join(" ")}
    {...props}
  />
);

interface SpanTextProps {
    isred: string;
}
const SpanText = ({ className = "", isred, style, ...props }: React.HTMLAttributes<HTMLSpanElement> & SpanTextProps) => (
  <span
    className={["mb-[5px]", className].join(" ")}
    style={{ color: isred === "true" ? "red" : "black", ...(style || {}) }}
    {...props}
  />
);

export {
    InputContainer,
    StyledInput,
    Text,
    CircleButton,
    ButtonWrap,
    ActionButtonWrap,
    ActionButton,
    ModalText,
    ModalButtonWrap,
    ModalButton,
    SpanText
};
