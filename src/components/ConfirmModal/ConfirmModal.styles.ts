import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    height: 100vh;

    background: rgba(0, 0, 0, 0.58);
    backdrop-filter: blur(2px);
`;

const ModalWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 18.5625rem;
    height: 10.125rem;
    flex-shrink: 0;

    color: #fff;
    text-align: center;
    font-family: Inter;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    z-index: 100;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    visibility: visible;
    background-color: #fff;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 1.25rem;
    padding: 1rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
`;

const Text = styled.div`
    display: flex;
    height: 1.8125rem;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;

    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    white-space: pre-wrap;
`;

const ButtonWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

const Button = styled.button`
    width: 7.07894rem;
    height: 2rem;
    flex-shrink: 0;
    border-radius: 0.5rem;
    background: #e7e8ea;
    border: none;
`;

export { Container, ModalWrap, ButtonWrap, Text, Button };
