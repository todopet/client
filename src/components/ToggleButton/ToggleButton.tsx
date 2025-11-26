import { FC, SyntheticEvent, useState } from "react";

interface ToggleButtonProps {
    onToggle?: (isToggled: boolean) => void;
    active?: boolean;
}

const ToggleButton: FC<ToggleButtonProps> = ({ onToggle }) => {
    const [isToggled, setIsToggled] = useState(false);

    const handleChangeToggle = (e:SyntheticEvent) => {
        const newToggled = !isToggled;
        setIsToggled(newToggled);
        onToggle?.(newToggled); // 콜백프롭스 형식으로 자식의 상태 변경을 부모에게 알림
    }

    return (
        <div className="relative">
            <div
                onClick={handleChangeToggle}
                className={[
                    "w-11 h-[22px] rounded-[15px] flex items-center cursor-pointer transition-colors duration-300 relative mt-5 ml-[330px] top-[22px]",
                    isToggled ? "bg-[#EBEBEB] justify-end" : "bg-[#CBCACA] justify-start",
                ].join(" ")}
            >
                <div
                    className={[
                        "w-[19px] h-[19px] bg-white rounded-full absolute left-[1.4px] transition-all duration-400 text-[12px] font-bold flex items-center justify-center",
                        isToggled ? "left-[calc(100%-20.5px)]" : "left-[1.4px]",
                    ].join(" ")}
                >
                    {isToggled ? "월" : "주"}
                </div>
            </div>
        </div>
    );
}

export default ToggleButton;
