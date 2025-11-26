import { IncreaseIcon, DecreaseIcon } from "@/modules/icons";
import CircleButton from "@/components/CircleButton/CircleButton";

interface ChangeQtyBtnProps {
  modaltype: "useModal" | "discardModal";
  operationType: "increase" | "decrease";
  onClick(): void;
  iscountpositivenum: boolean;
}

//모달종류(아이템사용/아이템버리기), 연산종류(+,-)에 따라서 색과 내용이 달라짐
export default function ChangeQtyBtn({
  modaltype,
  operationType,
  onClick,
  iscountpositivenum,
}: ChangeQtyBtnProps) {
  let border = "3px solid";

  if (modaltype === "useModal") {
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
        iscountpositivenum ? "hover:opacity-70" : "",
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
