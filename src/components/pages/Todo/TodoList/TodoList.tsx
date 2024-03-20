//react hook
import { useEffect } from "react";
import useTodosStore from "@/store/todoStore";
//components
import TodoItem from "./TodoItem/TodoItem";

//styles
import { TodoListStyles } from "./TodoList.styles";

export default function TodoList() {
    const { selectedDate, setTodos, dateTodos } = useTodosStore(
        (state) => state
    );

    useEffect(() => {
        setTodos(selectedDate, selectedDate);
    }, [selectedDate]);

    return (
        <TodoListStyles>
            {dateTodos?.map((todos) => {
                return <TodoItem key={todos._id} todos={todos} />;
            })}
        </TodoListStyles>
    );
}
