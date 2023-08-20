import Todo from "../Todo/Todo";
import { todo } from "@/@types/index";

interface TodosProps {
    todos: todo[];
}
export default function Todos({ todos }: TodosProps) {
    return (
        <div>
            {todos.map((todo) => {
                return (
                    <Todo
                        content={todo.todo}
                        status={todo.status}
                        categoryId={todo.categoryId}
                        contentId={todo._id}
                    />
                );
            })}
        </div>
    );
}
