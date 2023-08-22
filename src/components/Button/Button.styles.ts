import { styled } from "styled-components";

const Button = styled.button`
    border: none;
    background: transparent;
    font-family: inherit;
    text-align: center;
    cursor: pointer;

    &:hover {
        filter: brightness(1.1);
    }

    &:disabled {
        cursor: not-allowed;
        filter: grayscale(1);
    }
`;

export default Button;
