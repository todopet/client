//icons
import { ReactComponent as MenuSvg } from "@/assets/images/meatballsMenu.svg";
//styles
import {
    StyledTodo,
    TodoDiv,
    StyledCheckbox,
    Text,
    MenuButton
} from "./Todo.styles";

interface TodoProps {
    content: string;
}
export default function Todo({ content }: TodoProps) {
    return (
        <StyledTodo>
            <TodoDiv>
                <StyledCheckbox type="checkbox"></StyledCheckbox>
                <Text>{content}</Text>
            </TodoDiv>
            <MenuButton>
                <MenuSvg />
            </MenuButton>
        </StyledTodo>
    );
}
