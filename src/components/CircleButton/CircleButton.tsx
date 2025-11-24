import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  url?: string;
  color?: string;
  border?: string;
};

export default function CircleButton({ url, color, border, className = "", style, ...props }: Props) {
  const mergedStyle: React.CSSProperties = {
    backgroundImage: url ? `url(${url})` : undefined,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundColor: color,
    border: border,
    width: 70,
    height: 70,
    ...style,
  };
  return (
    <button
      className={["rounded-full cursor-pointer", className].join(" ")}
      style={mergedStyle}
      {...props}
    />
  );
}
