import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string };

export const Button = ({ className = "cursor-pointer", ...props }: Props) => {
  return <button className={className} {...props} />;
};
