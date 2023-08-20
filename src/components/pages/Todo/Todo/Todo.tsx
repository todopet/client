//react hook
import { useState } from "react";
//api, interface
import axiosRequest from "@/api/index";
import { res, todo } from "@/@types/index";
//icons
import { ReactComponent as MenuSvg } from "@/assets/images/meatballsMenu.svg";
import { ReactComponent as CheckIcon } from "@/assets/images/checkboxChecked.svg";

//components
import DropDown from "@/components/DropDown/DropDown";
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
    status: string;
    categoryId: string;
    contentId: string;
}

export default function Todo({
    content,
    status,
    categoryId,
    contentId
}: TodoProps) {
    //투두 체크시 patch요청
    async function updateStatus() {
        try {
            const response: res<todo[]> = await axiosRequest.requestAxios<
                res<todo[]>
            >("patch", `/todoContent/${categoryId}`, {
                contentId: contentId,
                content: content,
                status: "completed" //추후 api 수정되면 checked의 값에 따라 completed 또는 pending으로 수정
            });
            setChecked(!checked);
        } catch (error) {
            console.error(error);
        }
    }
    const [checked, setChecked] = useState<boolean>(
        status === "pending" ? false : true
    );
    const handleClick = () => {
        setChecked(!checked);
        updateStatus();
        console.log("클릭됨!");
    };
    return (
        <StyledTodo>
            <TodoDiv>
                <StyledCheckbox onClick={handleClick} checked={checked}>
                    {checked && <CheckIcon />}
                </StyledCheckbox>
                <Text checked={checked}>{content}</Text>
            </TodoDiv>
            {/* <DropDown/> 공통컴포넌트 완료시 추가 */}
            <MenuButton>
                <MenuSvg />
            </MenuButton>
        </StyledTodo>
    );
}
