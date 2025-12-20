import { useState, useEffect, useRef } from "react";
//api, interface
import { todoCategory } from "@/@types";

//components
import { Category } from "@/components/pages/Todo/TodoList/TodoItem/Category";
import { Todos } from "@/components/pages/Todo/TodoList/TodoItem/Todos";
import { TodoForm } from "@/components/pages/Todo/TodoList/TodoItem/Todos/Todo/TodoForm";
import { useTodosStore } from "@/store/todoStore";

//styles
import { TodoItemStyles } from "@/components/pages/Todo/TodoList/TodoItem/TodoItem.styles";

interface TodoItemProps {
    todos: todoCategory;
}
export const TodoItem = ({ todos }: TodoItemProps) => {
    const [openInputForm, setOpenInputForm] = useState<boolean>(false);
    const handleClick = () => {
        !todos.ended && setOpenInputForm(!openInputForm); //종료되지 않은 투두 클릭시 실행
    };

    const { dateTodos } = useTodosStore((state) => state);
    const todoFormRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (todoFormRef.current) {
            // todoForm이 생성될 때마다 스크롤을 아래로 내립니다.
            todoFormRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }
    }, [dateTodos]);
    return (
        <TodoItemStyles>
            <>
                <Category
                    category={todos.category}
                    isEnded={todos.ended}
                    handleClick={handleClick}
                />
                <Todos todos={todos.todos} />
                {openInputForm && (
                    <div ref={todoFormRef}>
                        <TodoForm
                            categoryId={todos._id}
                            finishEdit={() => setOpenInputForm(false)}
                        />
                    </div>
                )}
            </>
        </TodoItemStyles>
    );
}