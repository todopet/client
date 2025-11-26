import Button from "@/components/Button/Button";

interface propsType extends EditBtnProps {
    onClick(): void;
}

export default function EditBtn({ modaltype, btntype, onClick }: propsType) {
    let btnContent = "";
    if (btntype === "confirm") {
        if (modaltype === "useModal") btnContent = "사용하기";
        else btnContent = "버리기";
    } else if (btntype === "cancel") {
        btnContent = "취소";
    }
    const wrapBg =
        btntype === "cancel"
            ? "#ffffff"
            : modaltype === "useModal"
            ? "#aaeea8"
            : "#d9d9d9";
    const textColor =
        btntype === "confirm" ? "#000000" : modaltype === "useModal" ? "#2dc770" : "#adadad";

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
