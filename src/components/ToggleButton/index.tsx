import { FC, SyntheticEvent, useState } from "react";

interface ToggleButtonProps {
  onToggle?: (isToggled: boolean) => void;
  active?: boolean;
  className?: string;
}

export const ToggleButton: FC<ToggleButtonProps> = ({ onToggle, className = "" }) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleChangeToggle = (e: SyntheticEvent) => {
    const newToggled = !isToggled;
    setIsToggled(newToggled);
    onToggle?.(newToggled); // 콜백프롭스 형식으로 자식의 상태 변경을 부모에게 알림
  };

  return (
    <div className={["relative pr-4", className].join(" ")}>
      <div
        onClick={handleChangeToggle}
        className={[
          "relative flex h-[22px] w-11 items-center rounded-[15px] transition-colors duration-300",
          isToggled ? "bg-[#EBEBEB] justify-end" : "bg-[#CBCACA] justify-start",
        ].join(" ")}
      >
        <div
          className={[
            "absolute left-[1.4px] flex h-[19px] w-[19px] items-center justify-center rounded-full bg-white text-[12px] font-bold transition-all duration-300",
            isToggled ? "left-[calc(100%-20.5px)]" : "left-[1.4px]",
          ].join(" ")}
        >
          {isToggled ? "월" : "주"}
        </div>
      </div>
    </div>
  );
};
