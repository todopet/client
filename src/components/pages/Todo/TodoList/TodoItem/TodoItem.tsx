import { useState } from "react";
//api, interface
import { todoCategory } from "@/@types/index";

//components
import Category from "./Category/Category";
import Todos from "./Todos/Todos";
import TodoForm from "@/components/pages/Todo/TodoList/TodoItem/Todos/Todo/TodoForm/TodoForm";

//styles
import { TodoItemStyles } from "./TodoItem.styles";

interface TodoItemProps {
    todos: todoCategory;
}
export default function TodoItem({ todos }: TodoItemProps) {
    const [openInputForm, setOpenInputForm] = useState<boolean>(false);
    const handleClick = () => {
        setOpenInputForm(!openInputForm);
        // console.log("클릭됨!");
    };
    return (
        <TodoItemStyles>
            <>
                <Category category={todos.category} handleClick={handleClick} />
                <Todos todos={todos.todos} />
                {openInputForm && (
                    <TodoForm
                        categoryId={todos._id}
                        finishEdit={() => setOpenInputForm(false)}
                    />
                )}
            </>
        </TodoItemStyles>
    );
}
