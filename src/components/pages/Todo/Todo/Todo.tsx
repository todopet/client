import { TodoStyles, Checkbox, Text } from './Todo.styles';

export default function Todo() {
    return (
        <TodoStyles>
            <Checkbox type="checkbox"></Checkbox>
            <Text>오늘의 할 일</Text>
        </TodoStyles>
    );
}
