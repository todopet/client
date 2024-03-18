import React, { useContext, useState, useEffect } from "react";

import Toast from "@/components/Toast/Toast";
import useTodosStore from "@/store/todo";

//type
import { ToastTypes } from "@/@types/todo";
import { ToastStyle } from "./MiniPetToast.styles";

export default function MiniPetToast() {
    const { message, isActiveToast } = useTodosStore((state) => state);

    let content: React.ReactNode;
    let bgcolor: "black" | "white" = "white";
    const [fullMessage, setFullMessage] = useState<string>("");
    useEffect(() => {
        if (message?.inventoryCount === 50) {
            setFullMessage("인벤토리가 가득 찼습니다❗️");
        }
    }, [message]);
    //보상에 따라 content, bgcolor 변경
    switch (message?.type) {
        case ToastTypes.SPECIAL:
            content = (
                <>
                    특별한 보상으로
                    <br />
                    {message.reward}(을)를 받았습니다 🥳
                    <br />
                    <span style={{ color: "red" }}>{fullMessage}</span>
                </>
            );
            bgcolor = "black";

            break;
        case ToastTypes.NORMAL:
            content = (
                <>
                    할 일을 완료하여
                    <br />
                    {message.reward}(을)를 받았습니다 🍀
                    <br />
                    <span style={{ color: "red" }}>{fullMessage}</span>
                </>
            );

            break;
        case ToastTypes.RECEIVED:
            content = <>이미 보상을 받았습니다 😅</>;
            break;
        case ToastTypes.ALL_RECEIVED:
            content = <>일일 보상 횟수를 초과하였습니다 😅</>;
            break;
        case ToastTypes.FULL:
            content = (
                <>
                    인벤토리 공간이 부족하여
                    <br />
                    보상이 지급되지 않습니다 🥲
                </>
            );
            break;
        default:
            content = <>에러가 발생했습니다 🙀</>;
            break;
    }

    return (
        <ToastStyle>
            <Toast
                isActive={isActiveToast}
                bgcolor={bgcolor}
                content={content}
            />
        </ToastStyle>
    );
}
