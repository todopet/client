import MiniPet from "@/components/pages/Todo/MiniPet/MiniPet";
import Calendar from "@/components/pages/Todo/Calendar/Calendar";
import TodoList from "@/components/pages/Todo/TodoList/TodoList";

export default function Todo() {
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
