import { ToastWrap } from "./Toast.styles";

interface ToastProps {
    content: React.ReactNode;
    bgcolor: "black" | "white";
    isActive: boolean;
}

export default function Toast({ content, bgcolor, isActive }: ToastProps) {
    return isActive ? (
        <ToastWrap show={isActive} bgcolor={bgcolor}>
            {content}
        </ToastWrap>
    ) : null;
}
