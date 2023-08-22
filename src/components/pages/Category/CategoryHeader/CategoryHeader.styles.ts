import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    width: 390px;
    height: 100px;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ffffff;
    padding: 0 15px;
    z-index: 10;
`;

const ActionContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const InputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 10px;
`;

const Button = styled.button`
    border: none;
    background-color: transparent;
    padding: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const Text = styled.div`
    margin: 0 10px;
    font-size: 16px;
    font-weight: 700;
`;

const StyledInput = styled.input`
    background: none;
    border: none;
    border-bottom: 1.8px solid #000;
    outline: none;
    font-size: 16px;
    padding: 5px 0;
    width: 93%;
    transition: border-color 0.3s ease;
`;

export {
    Container,
    Button,
    Text,
    InputContainer,
    ActionContainer,
    StyledInput
};
