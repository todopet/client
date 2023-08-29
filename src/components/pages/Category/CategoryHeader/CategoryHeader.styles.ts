import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 390px;
    height: 30px;
    padding: 0 15px;
    margin-top: 20px;
    box-sizing: border-box;
`;

const ActionContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;
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
    margin: 0 auto;
    font-size: 16px;
    font-weight: 700;
    text-align: center;
`;

export { Container, Button, Text, ActionContainer };
