import getToastContent from "@/libs/utils/getToastContent";
import { Message } from "@/@types/todo";
import { ToastWrap } from "./MiniPetToast.styles";
import useToastsStore from "@/store/toastStore";

interface ToastProps {
    message: Message;
}
export const MiniPetToast = ({ message }: ToastProps) => {
    const { isShow } = useToastsStore();
    const { content, bgColor } = getToastContent(message);

    return (
        <>
            <ToastWrap $show={isShow} bgcolor={bgColor}>
                {content}
            </ToastWrap>
        </>
    );
}