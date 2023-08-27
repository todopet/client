import { ToastWrap } from "./Toast.styles";

interface ToastProps {
    content: React.ReactNode;
    bgColor: "black" | "white";
    isActive: boolean;
}

export default function Toast({ content, bgColor, isActive }: ToastProps) {
    return isActive ? (
        <ToastWrap show={isActive} bgColor={bgColor}>
            {content}
        </ToastWrap>
    ) : null;
}
