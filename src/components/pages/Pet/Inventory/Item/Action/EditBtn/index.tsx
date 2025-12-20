import { Button } from "@/components/Button";
import { EditBtnProps } from "@/components/pages/Pet/Inventory/Item/Action/EditBtn/EditBtn.styles.ts";

interface propsType extends EditBtnProps {
    onClick(): void;
}

export const EditBtn = ({
  modalType, btnType, onClick
}: propsType) => {
    let btnContent = "";
    if (btnType === "confirm") {
        if (modalType === "useModal") btnContent = "사용하기";
        else btnContent = "버리기";
    } else if (btnType === "cancel") {
        btnContent = "취소";
    }
    const wrapBg =
        btnType === "cancel"
            ? "#ffffff"
            : modalType === "useModal"
            ? "#aaeea8"
            : "#d9d9d9";
    const textColor =
        btnType === "confirm" ? "#000000" : modalType === "useModal" ? "#2dc770" : "#adadad";

    return (
        <div
            className="w-[204px] h-[62px] rounded-[30px] flex items-center cursor-pointer hover:opacity-70"
            style={{ backgroundColor: wrapBg }}
        >
            <Button
                className="p-0 border-0 bg-transparent text-[20px] font-medium w-full cursor-pointer"
                onClick={onClick}
                style={{ color: textColor }}
            >
                {btnContent}
            </Button>
        </div>
    );
}