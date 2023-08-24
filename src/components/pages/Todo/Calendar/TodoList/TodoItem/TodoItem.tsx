import { useState } from "react";
//api, interface
import { todoCategory } from "@/@types/index";

//components
import Category from "./Category/Category";
import Todos from "./Todos/Todos";
import TodoForm from "@/components/pages/Todo/Calendar/TodoList/TodoItem/Todos/Todo/TodoForm/TodoForm";

//styles
import { TodoItemStyles } from "./TodoItem.styles";

interface TodoItemProps {
    category: todoCategory;
    getCategory: () => void;
}
export default function TodoItem({ category, getCategory }: TodoItemProps) {
    const [openInputForm, setOpenInputForm] = useState<boolean>(false);
    const handleClick = () => {
        setOpenInputForm(!openInputForm);
        // console.log("클릭됨!");
    };
    return (
        <TodoItemStyles>
            <>
                <Category
                    category={category.category}
                    handleClick={handleClick}
                />
                <Todos todos={category.todos} getCategory={getCategory} />
                {openInputForm && (
                    <TodoForm
                        categoryId={category._id}
                        getCategory={getCategory}
                        finishEdit={() => setOpenInputForm(false)}
                    />
                )}
            </>
        </TodoItemStyles>
    );
}
