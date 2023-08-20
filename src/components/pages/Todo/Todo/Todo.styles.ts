import { styled } from "styled-components";

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

interface TodoProps {
    checked: boolean;
}
const StyledCheckbox = styled.div<TodoProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 22px;
    height: 22px;
    margin-right: 8px;
    border: none;
    border-radius: 3px;
    background-color: ${(props) => (props.checked ? "#baabb5" : "#e7e8ea")};
`;

const Text = styled.span<TodoProps>`
    font-family: Pretendard;
    font-size: 16px;
    text-decoration-line: ${(props) =>
        props.checked ? "line-through" : "none"};
    color: ${(props) => (props.checked ? "#ADADAD" : "#000000")};
`;

const MenuButton = styled.button`
    height: 20px;
    background-color: transparent;
    border: none;
`;

export { StyledTodo, TodoDiv, StyledCheckbox, Text, MenuButton };
