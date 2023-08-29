import React, { useContext, useState, useEffect } from "react";

import Toast from "@/components/Toast/Toast";
import { TodoContext } from "@/components/pages/Todo/TodoContext";
//type
import { ToastTypes } from "@/@types/todo";
import { ToastStyle } from "./MiniPetToast.styles";

export default function MiniPetToast() {
    const { message, isActiveToast } = useContext(TodoContext);

    let content: React.ReactNode;
    let bgColor: "black" | "white" = "white";
    const [fullMessage, setFullMessage] = useState<string>("");
    useEffect(() => {
        if (message && message.inventoryCount === 50) {
            setFullMessage("인벤토리가 가득 찼습니다");
        }
    }, []);
    //보상에 따라 content, bgColor 변경
    switch (message?.type) {
        case ToastTypes.SPECIAL:
            content = (
                <>
                    특별한 보상으로
                    <br />
                    {message.reward}(을)를 받았습니다 🥳
                    <br />
                    {fullMessage}
                </>
            );
            bgColor = "black";

            break;
        case ToastTypes.NORMAL:
            content = (
                <>
                    할 일을 완료하여
                    <br />
                    {message.reward}(을)를 받았습니다 🍀
                    <br />
                    {fullMessage}
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
            {message && (
                <Toast
                    isActive={isActiveToast}
                    bgColor={bgColor}
                    content={content}
                />
            )}
        </ToastStyle>
    );
}
