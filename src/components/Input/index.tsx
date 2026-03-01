import React, { useId } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  requiredText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  id,
  wrapperClassName = "flex flex-col justify-center items-center",
  labelClassName = "mb-1 text-sm text-[#5e5e5e]",
  className = "w-[20.9375rem] h-6 flex-col justify-center shrink-0 text-base border-0 border-b-2 border-[#ccc] px-[10px]",
  required,
  requiredText = "*",
  ...props
}) => {
  const generatedId = useId();
  const inputId = id ?? `input-${generatedId}`;

  return (
    <div className={wrapperClassName}>
      {label && (
        <label className={labelClassName} htmlFor={inputId}>
          {label}
          {required && <span aria-label="필수 입력"> {requiredText}</span>}
        </label>
      )}
      <input id={inputId} required={required} aria-required={required} className={className} {...props} />
    </div>
  );
};
