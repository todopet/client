import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { className?: string };

export const Button = ({ className = "cursor-pointer", ...props }: Props) => {
    return <button className={className} {...props} />;
}
// interface ButtonProps {
//     type?: "button" | "submit" | "reset";
//     cssProp?: string; // 문자열 형태로 스타일을 전달합니다.
//     onClick?: (e?: React.FormEvent) => void;
//     children?: string | JSX.Element | JSX.Element[];
//     disabled?: boolean;
//     on?: boolean;
// }

// const Button = ({
//     type = "button",
//     cssProp,
//     onClick,
//     children,
//     disabled = false,
//     on,
//     ...props
// }: ButtonProps) => {
//     return (
//         <button
//             {...props}
//             type={type}
//             className={cssProp}
//             onClick={onClick}
//             disabled={disabled}
//         >
//             {children}
//         </button>
//     );
// };

// export default Button;