import { useState } from "react";
//api, interface
import { category } from "@/@types/index";

//components
import Category from "../Category/Category";
import Todos from "../Todos/Todos";
import TodoForm from "@/components/pages/Todo/TodoForm/TodoForm";

//styles
import { TodoItemStyles } from "./TodoItem.styles";

interface TodoItemProps {
    category: category;
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
                <Todos todos={category.todos} />
                {openInputForm && (
                    <TodoForm
                        categoryId={category._id}
                        getCategory={getCategory}
                    />
                )}
            </>
        </TodoItemStyles>
    );
}
