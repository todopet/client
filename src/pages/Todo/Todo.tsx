import TodoContextProvider from "@/components/pages/Todo/TodoContext";

import MiniPet from "@/components/pages/Todo/MiniPet/MiniPet";
import Calendar from "@/components/pages/Todo/Calendar/Calendar";
import TodoList from "@/components/pages/Todo/TodoList/TodoList";

import { TodoContainer, MainContent } from "./Todo.styles";

export default function Todo() {
    return (
        <TodoContainer>
            <TodoContextProvider>
                <MiniPet />
                <MainContent>
                    <Calendar />
                    <TodoList />
                </MainContent>
            </TodoContextProvider>
        </TodoContainer>
    );
}
