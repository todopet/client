//react hook
import { useState, useContext } from "react";
import { TodoContext } from "@/components/pages/Todo/TodoContext";
//api, interface
import axiosRequest from "@/api/index";
import { res, todo } from "@/@types/index";
//icons
import { ReactComponent as MenuIcon } from "@/assets/icons/meatballsMenu.svg";
import { ReactComponent as CheckIcon } from "@/assets/icons/checkboxChecked.svg";

//components
import DropDown from "@/components/DropDown/DropDown";
import TodoForm from "@/components/pages/Todo/TodoList/TodoItem/Todos/Todo/TodoForm/TodoForm";

//styles
import { StyledTodo, TodoDiv, StyledCheckbox, Text } from "./Todo.styles";

interface TodoProps {
    content: string;
    status: string;
    contentId: string;
}

export default function Todo({ content, status, contentId }: TodoProps) {
    const { updateStatus, getTodos, selectedDate } = useContext(TodoContext);
    //투두 delete 요청
    async function deleteTodo() {
        try {
            // console.log("클릭됨!", contentId);
            const response: res<todo[]> = await axiosRequest.requestAxios<
                res<todo[]>
            >("delete", `/todoContents/${contentId}`);
        } catch (error) {
            console.error(error);
        }
    }

    const [newCheckStatus, setNewCheckStatus] = useState<string>(status);

    const handleCheckClick = async () => {
        let checkStatus = "";
        if (status === "unchecked") {
            checkStatus = "completed";
        } else if (status === "completed") {
            checkStatus = "reverted";
        } else if (status === "reverted") {
            checkStatus = "completed";
        }
        //patch요청
        await updateStatus(contentId, content, checkStatus);
        //상태 업데이트
        setNewCheckStatus(checkStatus);
        //todo get요청
        getTodos(selectedDate, selectedDate);
    };

    //DropDown의 props
    const listItems = [
        {
            content: "수정",
            handleClick: () => {
                setIsEditig(true);
            }
        },
        {
            content: "삭제",
            handleClick: async () => {
                await deleteTodo();
                getTodos(selectedDate, selectedDate);
            }
        }
    ];

    //input 상태
    const [isEditing, setIsEditig] = useState<boolean>(false);

    return (
        <StyledTodo>
            {isEditing ? (
                <TodoForm
                    contentId={contentId}
                    existingContent={content}
                    status={status}
                    finishEdit={() => setIsEditig(false)}
                />
            ) : (
                <TodoDiv>
                    <StyledCheckbox
                        onClick={handleCheckClick}
                        newCheckStatus={newCheckStatus}
                    >
                        {newCheckStatus === "completed" && <CheckIcon />}
                    </StyledCheckbox>
                    <Text newCheckStatus={newCheckStatus}>{content}</Text>
                </TodoDiv>
            )}
            <DropDown list={listItems}>
                <MenuIcon />
            </DropDown>
        </StyledTodo>
    );
}
