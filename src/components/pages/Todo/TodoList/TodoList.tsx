import TodoItem from '../TodoItem/TodoItem';
import { TodoListStyles } from './TodoList.styles';

export default function TodoList() {
    return (
        <TodoListStyles>
            <TodoItem />
            <TodoItem />
        </TodoListStyles>
    );
}
