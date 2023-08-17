import styled from "styled-components";

export interface CancelBtnProps {
    modalType: "useModal" | "discardModal";
}

const ButtonWrap = styled.div<CancelBtnProps>`
    width: 204px;
    height: 62px;
    border-radius: 30px;
    display: flex;
    align-items: center;

    & > button {
        padding: 0;
        border: none;
        background-color: transparent;
        font-size: 20px;
        font-weight: 500;
        width: 100%;
        color: ${(props) =>
            props.modalType === "useModal" ? "#2dc770" : "#adadad"};
    }
`;

export { ButtonWrap };
