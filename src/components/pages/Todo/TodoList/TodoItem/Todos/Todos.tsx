import Todo from "./Todo/Todo";
import { todo } from "@/@types/index";

interface TodosProps {
    todos: todo[];
    getCategory: () => void;
}
export default function Todos({ todos, getCategory }: TodosProps) {
    return (
        <div>
            {todos &&
                todos.map((todo) => {
                    return (
                        <Todo
                            content={todo.todo}
                            status={todo.status}
                            contentId={todo._id}
                            getCategory={getCategory}
                        />
                    );
                })}
        </div>
    );
}
