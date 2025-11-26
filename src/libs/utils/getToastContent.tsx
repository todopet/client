import { Message, ToastTypes } from "@/@types/todo";

const getToastContent = (message?: Message) => {
    let content: React.ReactNode;
    let bgcolor: "black" | "white" = "white";

    //피드 페이지 진입시
    if (!message) {
        content = (
            <>
                인벤토리가 가득찼습니다.
                <br />
                아이템을 정리하여 다음 보상을 받으세요 🙂
            </>
        );
        return { content, bgcolor };
    }

    //보상에 따라 content, bgcolor 변경
    switch (message?.type) {
        case ToastTypes.SPECIAL:
            content = (
                <>
                    특별한 보상으로
                    <br />
                    {message.reward}(을)를 받았습니다 🥳
                    <br />
                    {message.inventoryCount === 50 && (
                        <span style={{ color: "red" }}>
                            인벤토리가 가득 찼습니다❗️
                        </span>
                    )}
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
                    {message.inventoryCount === 50 && (
                        <span style={{ color: "red" }}>
                            인벤토리가 가득 찼습니다❗️
                        </span>
                    )}
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

    return { content, bgcolor };
};

export default getToastContent;
