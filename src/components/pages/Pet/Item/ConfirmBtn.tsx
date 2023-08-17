import Button from "@/components/Button/Button";
import { ButtonWrap } from "./ConfirmBtn.styles";

interface ConfirmBtnProps {
    modalType: "useModal" | "discardModal";
}

export default function ConfirmBtn({ modalType }: ConfirmBtnProps) {
    return (
        <ButtonWrap modalType={modalType}>
            <Button
                content={modalType === "useModal" ? "사용하기" : "버리기"}
            />
        </ButtonWrap>
    );
}
