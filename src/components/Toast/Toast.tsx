import { ToastWrap } from "./Toast.styles";

interface ToastProps {
    content: string[];
    bgColor: "black" | "white";
    isActive: boolean;
}

export default function Toast({ content, bgColor, isActive }: ToastProps) {
    return isActive ? (
        <ToastWrap show={isActive} bgColor={bgColor}>
            {content[0]}
            <br />
            {content[1]}
        </ToastWrap>
    ) : null;
}
