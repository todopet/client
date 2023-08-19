import { styled } from 'styled-components';
import img from "@/assets/images/checkboxChecked.svg";

const StyledTodo = styled.div`
    height: 20px;
    margin: 20px 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TodoDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const StyledCheckbox = styled.input`
    appearance: none;
    width: 22px;
    height: 22px;
    margin-right: 8px;
    border: none;
    border-radius: 3px;
    background-color: #e7e8ea;

    &:checked {
        background-image: url(${img});
        background-repeat: no-repeat;
        background-position: center;
        background-color: #baabb5;
    }
`;

const Text = styled.span`
    font-family: Pretendard;
    font-size: 16px;
`;

const MenuButton = styled.button`
  height: 20px;
  background-color: transparent;
  border: none;
`;

export { StyledTodo, TodoDiv, StyledCheckbox, Text, MenuButton };
