import styled from "styled-components";

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
`;

const ActionButton = styled.button`
    width: 10.1875rem;
    height: 2.375rem;
    flex-shrink: 0;
    border: none;
    border-radius: 0.5rem;
    background: #f5f5f5;
`;

export { Text, CircleButton, ButtonWrap, ActionButtonWrap, ActionButton };
