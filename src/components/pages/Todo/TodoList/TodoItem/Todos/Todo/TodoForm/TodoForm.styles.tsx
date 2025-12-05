import React from "react";

type FormProps = React.FormHTMLAttributes<HTMLFormElement> & { className?: string, ref?: React.RefObject<HTMLFormElement> };
type DivProps = React.HTMLAttributes<HTMLDivElement> & { className?: string };
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { className?: string };

const Form = ({ className = "", ref, ...props }: FormProps) => (
  <form className={["flex flex-row h-[30px] my-[10px] mx-[2px]", className].join(" ")} {...props} />
);

const StyledCheckbox = ({ className = "", ...props }: DivProps) => (
  <div className={["w-[22px] h-[22px] mr-2 border-0 rounded-[3px] bg-[#e7e8ea]", className].join(" ")} {...props} />
);

const Input = ({ className = "", ...props }: InputProps) => (
  <input
    className={["appearance-none border-0 flex-1 pb-[5px] text-[16px] focus:outline-none focus:border-b-2 focus:border-[#3f4790]", className].join(" ")}
    {...props}
  />
);

export { Form, StyledCheckbox, Input };