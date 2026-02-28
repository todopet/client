//react hook
import { useEffect } from "react";
import { useTodosStore } from "@/store/todoStore";
//components
import { TodoItem } from "@/components/pages/Todo/TodoList/TodoItem";

export const TodoList = () => {
  const selectedDate = useTodosStore((state) => state.selectedDate);
  const setTodos = useTodosStore((state) => state.setTodos);
  const dateTodos = useTodosStore((state) => state.dateTodos);

  useEffect(() => {
    void setTodos(selectedDate, selectedDate);
  }, [selectedDate, setTodos]);

  return (
    <div className="w-full">
      {dateTodos?.map((todos) => (
        <TodoItem key={todos._id} todos={todos} />
      ))}
    </div>
  );
};
