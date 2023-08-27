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
    newCheckStatus: string;
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
    background-color: ${(props) =>
        props.newCheckStatus === "completed" ? "#baabb5" : "#e7e8ea"};
`;

const Text = styled.span<TodoProps>`
    font-family: Pretendard;
    font-size: 16px;
    text-decoration-line: ${(props) =>
        props.newCheckStatus === "completed" ? "line-through" : "none"};
    color: ${(props) =>
        props.newCheckStatus === "unchecked" ? "#000000" : "#ADADAD"};
`;

export { StyledTodo, TodoDiv, StyledCheckbox, Text };
