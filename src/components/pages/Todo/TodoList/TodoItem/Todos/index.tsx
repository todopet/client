import { Todo } from "@/components/pages/Todo/TodoList/TodoItem/Todos/Todo";
import { todo } from "@/@types";
import { TodosWrap } from "@/components/pages/Todo/TodoList/TodoItem/Todos/Todos.styles";

interface TodosProps {
    todos: todo[];
}
export const Todos = ({ todos }: TodosProps) => {
    return (
        <TodosWrap>
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
        </TodosWrap>
    );
}