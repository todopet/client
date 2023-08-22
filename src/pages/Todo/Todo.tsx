import Todos from "@/components/pages/Todo/TodoList/TodoItem/Todos/Todos";
import Category from "@/components/pages/Todo/TodoList/TodoItem/Category/Category";
import TodoList from "@/components/pages/Todo/TodoList/TodoList";
import MiniPet from "@/components/pages/Todo/MiniPet/MiniPet";

export default function Todo() {
    return (
        <div>
            <MiniPet />
            <TodoList />
        </div>
    );
}
