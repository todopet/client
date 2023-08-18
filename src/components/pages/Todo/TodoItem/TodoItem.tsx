import Category from '../Category/Category';
import Todos from '../Todos/Todos';
import { TodoItemStyles } from './TodoItem.styles';

export default function TodoItem() {
    return (
        <TodoItemStyles>
            <Category />
            <Todos />
        </TodoItemStyles>
    );
}
