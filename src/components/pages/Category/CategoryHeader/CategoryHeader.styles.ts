import styled from "styled-components";

const Container = styled.div`
    /* display: flex; */
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    width: 390px;
    height: 30px;
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ffffff;
    padding: 0 15px;
    margin-top: 20px;
    z-index: 10;
`;

const ActionContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;
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
    position: absolute;
    /* top: 1px; */
    left: 1px;
`;

const Text = styled.div`
    margin: 0 auto;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
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
