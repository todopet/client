import {
    StyledTodo,
    TodoDiv,
    StyledCheckbox,
    Text,
    MenuButton
} from "./Todo.styles";
import { ReactComponent as MenuSvg } from "@/assets/images/meatballsMenu.svg";

export default function Todo() {
    return (
        <StyledTodo>
            <TodoDiv>
                <StyledCheckbox type="checkbox"></StyledCheckbox>
                <Text>오늘의 할 일</Text>
            </TodoDiv>
            <MenuButton>
                <MenuSvg />
            </MenuButton>
        </StyledTodo>
    );
}
