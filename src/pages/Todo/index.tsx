import { MiniPet } from "@/components/pages/Todo/MiniPet";
import { Calendar } from "@/components/pages/Todo/Calendar";
import { TodoList } from "@/components/pages/Todo/TodoList";

const Todo = () => {
    return (
        <div className="flex flex-col relative">
            <div className="fixed">
                <MiniPet />
            </div>
            <div className="mt-20">
                <Calendar />
                <TodoList />
            </div>
        </div>
    );
}

export default Todo;