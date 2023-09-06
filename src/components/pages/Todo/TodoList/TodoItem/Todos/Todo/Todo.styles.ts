import { styled } from "styled-components";

const StyledTodo = styled.div`
    height: auto;
    margin: 10px 2px;
    display: flex;
    justify-content: space-between;
`;
const TodoWrap = styled.div`
    flex: 1;
    padding-right: 8px;
`;
const TodoDiv = styled.div`
    display: flex;
    justify-content: flex-start;
`;

interface TodoProps {
    newcheckstatus: string;
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
        props.newcheckstatus === "completed" ? "#baabb5" : "#e7e8ea"};
`;

const Text = styled.span<TodoProps>`
    font-family: Pretendard;
    font-size: 16px;
    text-decoration-line: ${(props) =>
        props.newcheckstatus === "completed" ? "line-through" : "none"};
    color: ${(props) =>
        props.newcheckstatus === "unchecked" ? "#000000" : "#ADADAD"};

    max-width: 85%;
    word-wrap: break-word;
`;

const DropDownWrap = styled.div`
    width: 19px;
    height: 22px;
    display: flex;
    align-items: center;
`;

export { StyledTodo, TodoDiv, StyledCheckbox, Text, TodoWrap, DropDownWrap };
