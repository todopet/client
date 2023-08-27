import TodoContextProvider from "@/components/pages/Todo/TodoContext";

import MiniPet from "@/components/pages/Todo/MiniPet/MiniPet";
import Calendar from "@/components/pages/Todo/Calendar/Calendar";
import TodoList from "@/components/pages/Todo/TodoList/TodoList";

export default function Todo() {
    return (
        <div>
            <TodoContextProvider>
                <MiniPet />
                <Calendar />
                <TodoList />
            </TodoContextProvider>
        </div>
    );
}
