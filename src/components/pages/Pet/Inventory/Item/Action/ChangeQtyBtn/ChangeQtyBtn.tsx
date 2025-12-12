import { IncreaseIcon, DecreaseIcon } from "@/modules/icons";
import { CircleButton } from "@/components/CircleButton/CircleButton";

interface ChangeQtyBtnProps {
  modalType: "useModal" | "discardModal";
  operationType: "increase" | "decrease";
  onClick(): void;
  isCountPositiveNum: boolean;
}

//모달종류(아이템사용/아이템버리기), 연산종류(+,-)에 따라서 색과 내용이 달라짐
export const ChangeQtyBtn = ({
  modalType,
  operationType,
  onClick,
  isCountPositiveNum,
}: ChangeQtyBtnProps) => {
  let border = "3px solid";

  if (modalType === "useModal") {
    border += "#c5f4c4";
  } else {
    border += "#d9d9d9";
  }


  return (
    <CircleButton
      border={border}
      color="#ffffff"
      onClick={onClick}
      className={[
        "w-[62px] h-[62px] flex items-center justify-center",
        isCountPositiveNum ? "hover:opacity-70" : "",
      ].join(" ")}
    >
      {operationType === "increase" ? (
        <img src={IncreaseIcon} alt="increase" />
      ) : (
        <img src={DecreaseIcon} alt="decrease" />
      )}
    </CircleButton>
  );
}