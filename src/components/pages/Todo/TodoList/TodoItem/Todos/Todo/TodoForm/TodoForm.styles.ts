import { styled } from "styled-components";

const Form = styled.form`
    display: flex;
    flex-direction: row;
    height: 30px;

    margin: 10px 2px;
`;
const StyledCheckbox = styled.div`
    width: 22px;
    height: 22px;
    margin-right: 8px;
    border: none;
    border-radius: 3px;
    background-color: #e7e8ea;
`;
const Input = styled.input`
    appearance: none;
    border: none;
    flex: 1;
    padding-bottom: 5px;
    font-size: 16px;

    &:focus {
        outline: none;
        border-bottom: 2px solid #3f4790;
    }
`;

export { Form, StyledCheckbox, Input };
