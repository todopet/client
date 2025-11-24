//react hook
import { useEffect } from "react";
import useTodosStore from "@/store/todoStore";
//components
import TodoItem from "./TodoItem/TodoItem";


export default function TodoList() {
    const { selectedDate, setTodos, dateTodos } = useTodosStore(
        (state) => state
    );

    useEffect(() => {
        setTodos(selectedDate, selectedDate);
    }, [selectedDate]);

    return (
        <div className="w-[390px]">
            {dateTodos?.map((todos) => (
                <TodoItem key={todos._id} todos={todos} />
            ))}
        </div>
    );
}
