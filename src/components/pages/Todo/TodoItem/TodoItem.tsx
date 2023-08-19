//api, interface
import { category } from "@/@types/index";

//components
import Category from "../Category/Category";
import Todos from "../Todos/Todos";

//styles
import { TodoItemStyles } from "./TodoItem.styles";

interface TodoItemProps {
    category: category;
}
export default function TodoItem({ category }: TodoItemProps) {
    return (
        <TodoItemStyles>
            <>
                <Category category={category.category} />
                <Todos todos={category.todos} />
            </>
        </TodoItemStyles>
    );
}
