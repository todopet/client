import { ButtonStyled, ButtonWrap } from "./EditBtn.styles";
import type { EditBtnProps } from "./EditBtn.styles";

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
    return (
        <ButtonWrap modaltype={modaltype} btntype={btntype}>
            <ButtonStyled modaltype={modaltype} btntype={btntype} onClick={onClick}>
                {btnContent}
            </ButtonStyled>
        </ButtonWrap>
    );
}
