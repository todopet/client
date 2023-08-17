import styled from "styled-components";

interface ConfirmBtnProps {
    modalType: "useModal" | "discardModal";
}

const ButtonWrap = styled.div<ConfirmBtnProps>`
    width: 204px;
    height: 62px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    background-color: ${(props) =>
        props.modalType === "useModal" ? "#aaeea8" : "#d9d9d9"};

    & > button {
        padding: 0;
        border: none;
        background-color: transparent;
        font-size: 20px;
        font-weight: 500;
        width: 100%;
    }
`;

export { ButtonWrap };
