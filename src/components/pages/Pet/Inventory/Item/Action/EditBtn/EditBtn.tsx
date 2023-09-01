import { ButtonStyled, ButtonWrap } from "./EditBtn.styles";
import type { EditBtnProps } from "./EditBtn.styles";

interface propsType extends EditBtnProps {
    onClick(): void;
}

export default function EditBtn({ modalType, btnType, onClick }: propsType) {
    let btnContent = "";
    if (btnType === "confirm") {
        if (modalType === "useModal") btnContent = "사용하기";
        else btnContent = "버리기";
    } else if (btnType === "cancel") {
        btnContent = "취소";
    }
    return (
        <ButtonWrap modalType={modalType} btnType={btnType}>
            <ButtonStyled modalType={modalType} btnType={btnType} onClick={onClick}>
                {btnContent}
            </ButtonStyled>
        </ButtonWrap>
    );
}
