import Toast from "@/components/Toast/Toast";
import { ToastStyle } from "./MiniPetToast.styles";

export enum ToastTypes {
    SPECIAL = "special",
    NORMAL = "normal",
    RECEIVED = "received",
    ALL_RECEIVED = "all-received"
}

interface MiniPetToastProps {
    toastType: ToastTypes;
    isActive: boolean;
    itemName: string;
}
export default function MiniPetToast({
    toastType,
    isActive,
    itemName
}: MiniPetToastProps) {
    let content: string[];
    let bgColor: "black" | "white" = "white";

    //보상에 따라 content, bgColor 변경
    switch (toastType) {
        case ToastTypes.SPECIAL:
            content = ["특별한 보상으로", `${itemName}(을)를 받았습니다 🥳`];
            bgColor = "black";

            break;
        case ToastTypes.NORMAL:
            content = ["할 일을 완료하여", `${itemName}(을)를 받았습니다 🍀`];

            break;
        case ToastTypes.RECEIVED:
            content = ["이미 보상을 받았습니다 😅"];
            break;
        case ToastTypes.ALL_RECEIVED:
            content = ["일일 보상 횟수를 초과하였습니다 😅"];
            break;
        default:
            content = ["에러가 발생했습니다 🙀"];
            break;
    }

    return (
        <ToastStyle>
            <Toast isActive={isActive} bgColor={bgColor} content={content} />
        </ToastStyle>
    );
}
