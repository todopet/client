import styled from "styled-components";

import Button from "@/components/Button/Button";
import { ReactComponent as TrashIcon } from "@/assets/images/trash.svg";

interface ConfirmBtnProps {
    modalType: "useModal" | "discardModal";;
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

const ButtonWrap = styled.div<ConfirmBtnProps>`
    width: 204px;
    height: 62px;
    background-color: ${(props) =>
        props.modalType === "useModal" ? "#aaeea8" : "#d9d9d9"};

    & > button {
        border: none;
    }
`;
