//react hook
import { useState, useEffect, useContext } from "react";
//components
import TodoItem from "./TodoItem/TodoItem";
import { TodoContext } from "@/components/pages/Todo/TodoContext";
//styles
import { TodoListStyles } from "./TodoList.styles";

export default function TodoList() {
    const { getTodos, dateTodos } = useContext(TodoContext);

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <TodoListStyles>
            {dateTodos?.map((todos) => {
                return <TodoItem todos={todos} />;
            })}
        </TodoListStyles>
    );
}
