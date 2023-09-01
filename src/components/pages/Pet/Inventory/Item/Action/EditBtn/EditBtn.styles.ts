import styled from "styled-components";
import Button from "@/components/Button/Button";

export interface EditBtnProps {
    modalType: "useModal" | "discardModal";
    btnType: "confirm" | "cancel";
}

const ButtonStyled = styled(Button)<EditBtnProps>`
    padding: 0;
    border: none;
    background-color: transparent;
    font-size: 20px;
    font-weight: 500;
    width: 100%;
    color: ${(props) =>
        props.btnType === "confirm"
            ? "#000000"
            : props.modalType === "useModal"
            ? "#2dc770"
            : "#adadad"};
    cursor: pointer;
`;

const ButtonWrap = styled.div<EditBtnProps>`
    width: 204px;
    height: 62px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    background-color: ${(props) =>
        props.btnType === "cancel"
            ? "#ffffff"
            : props.modalType === "useModal"
            ? "#aaeea8"
            : "#d9d9d9"};
    cursor: pointer;

    &:hover {
        opacity: .7;
    }
`;

export { ButtonStyled, ButtonWrap };
