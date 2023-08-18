import { styled } from "styled-components";

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const InputText = styled.input`
    width: 20.9375rem;
    height: 1.5rem;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;

    font-size: 16px;
    border: none;
    border-bottom: 2px solid #ccc;
`;

export { InputContainer, InputText };
