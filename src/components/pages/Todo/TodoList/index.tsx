//react hook
import { useEffect } from "react";
import { useTodosStore } from "@/store/todoStore";
//components
import { TodoItem } from "@/components/pages/Todo/TodoList/TodoItem";

export const TodoList = () => {
  const { selectedDate, setTodos, dateTodos } = useTodosStore((state) => state);

  useEffect(() => {
    setTodos(selectedDate, selectedDate);
  }, [selectedDate]);

  return (
    <div className="w-full">
      {dateTodos?.map((todos) => (
        <TodoItem key={todos._id} todos={todos} />
      ))}
    </div>
  );
};
