import Todo from "@/components/pages/Todo/TodoList/TodoItem/Todos/Todo/Todo";
import { todo } from "@/@types/index";

interface TodosProps {
    todos: todo[];
}
export default function Todos({ todos }: TodosProps) {
    return (
        <div>
            {todos &&
                todos.map((todo) => {
                    return (
                        <Todo
                            key={todo._id}
                            content={todo.todo}
                            status={todo.status}
                            contentId={todo._id}
                        />
                    );
                })}
        </div>
    );
}
