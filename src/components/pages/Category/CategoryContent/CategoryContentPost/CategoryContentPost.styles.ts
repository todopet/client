import styled from "styled-components";

const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 30px;
`;

const StyledInput = styled.input`
    background: none;
    border: none;
    border-bottom: 1.8px solid #000;
    outline: none;
    font-size: 16px;
    padding: 5px 0;
    width: 90%;
    transition: border-color 0.3s ease;
`;

const Text = styled.div`
    font-size: 18px;
`;

const ButtonWrap = styled.div`
    display: flex;
    flex-direction: column;
`;

const CircleButton = styled.button`
    width: 4.8125rem;
    height: 2rem;
    flex-shrink: 0;
    border-radius: 1rem;
    background: #f5f5f5;
    border: none;
    margin: 10px 0;

    &:last-child {
        margin-bottom: 30px;
    }
`;
const ActionButtonWrap = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin-top: 130px;
`;

const ActionButton = styled.button<{ type: string }>`
    width: 10.1875rem;
    height: 2.375rem;
    flex-shrink: 0;
    border: none;
    border-radius: 0.5rem;
    background: #f5f5f5;
    color: ${(props) => (props.type === "exit" ? "black" : "#FA4D28")};
    font-weight: 400;
`;

export {
    InputContainer,
    StyledInput,
    Text,
    CircleButton,
    ButtonWrap,
    ActionButtonWrap,
    ActionButton
};
