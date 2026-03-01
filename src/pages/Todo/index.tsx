import { MiniPet } from "@/components/pages/Todo/MiniPet";
import { Calendar } from "@/components/pages/Todo/Calendar";
import { TodoList } from "@/components/pages/Todo/TodoList";
import { SEO } from "@/components/SEO";

const Todo = () => {
    return (
        <main className="flex flex-col relative" aria-label="할 일 페이지">
            <SEO
                title="할 일 관리"
                description="오늘의 할 일을 관리하고 달성 현황을 확인하세요."
                url="/todo"
            />
            <section className="fixed" aria-label="미니 펫 상태">
                <MiniPet />
            </section>
            <section className="mt-20" aria-label="캘린더 및 할 일 목록">
                <Calendar />
                <TodoList />
            </section>
        </main>
    );
}

export default Todo;
