import Button from "@/components/Button/Button";
import { ButtonWrap } from "./CancleBtn.styles";
import type { CancelBtnProps } from "./CancleBtn.styles";

export default function CancelBtn({ modalType }: CancelBtnProps) {
    return (
        <ButtonWrap modalType={modalType}>
            <Button content="취소" />
        </ButtonWrap>
    );
}
