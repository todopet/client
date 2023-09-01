//react hook
import { useEffect, useContext } from "react";
//components
import TodoItem from "./TodoItem/TodoItem";
import { TodoContext } from "@/components/pages/Todo/TodoContext";
//styles
import { TodoListStyles } from "./TodoList.styles";

export default function TodoList() {
    const { getTodos, dateTodos, selectedDate } = useContext(TodoContext);

    useEffect(() => {
        getTodos(selectedDate, selectedDate);
    }, [selectedDate]);

    return (
        <TodoListStyles>
            {dateTodos?.map((todos) => {
                return <TodoItem key={todos._id} todos={todos} />;
            })}
        </TodoListStyles>
    );
}
