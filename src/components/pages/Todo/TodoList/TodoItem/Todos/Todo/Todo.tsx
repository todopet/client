//react hook
import { useState, useEffect } from "react";
import useTodosStore from "@/store/todoStore";

//icons
import { ReactComponent as MenuIcon } from "@/assets/icons/meatballsMenu.svg";
import { ReactComponent as CheckIcon } from "@/assets/icons/checkboxChecked.svg";

//components
import DropDown from "@/components/DropDown/DropDown";
import TodoForm from "@/components/pages/Todo/TodoList/TodoItem/Todos/Todo/TodoForm/TodoForm";

//styles
import {
    StyledTodo,
    TodoDiv,
    StyledCheckbox,
    Text,
    TodoWrap,
    DropDownWrap
} from "./Todo.styles";

// common scripts
import { formatDateToString } from "@/libs/utils/global";

interface TodoProps {
    content: string;
    status: string;
    contentId: string;
}

export default function Todo({ content, status, contentId }: TodoProps) {
    const { selectedDate, deleteTodo, setStatus } = useTodosStore(
        (state) => state
    );

    const [newcheckstatus, setNewcheckstatus] = useState<string>(status);
    useEffect(() => {
        setNewcheckstatus(status);
    }, [status]);

    const handleCheckClick = async () => {
        let checkStatus = "";
        if (status === "unchecked") {
            checkStatus = "completed";
        } else if (status === "completed") {
            checkStatus = "reverted";
        } else if (status === "reverted") {
            checkStatus = "completed";
        }
        //상태 업데이트
        setNewcheckstatus(checkStatus);
        //patch요청
        setStatus(contentId, content, checkStatus, selectedDate);
    };
    const isSelectedDate: boolean =
        new Date(selectedDate).toString() ===
        new Date(formatDateToString(new Date())).toString();

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
            handleClick: () => {
                deleteTodo(contentId);
            }
        }
    ];
    if (status !== "completed") {
        listItems.push({
            content: isSelectedDate ? "내일하기" : "오늘하기",
            handleClick: () => {
                setStatus(
                    contentId,
                    content,
                    newcheckstatus,
                    isSelectedDate
                        ? formatDateToString(
                              new Date(Date.now() + 24 * 60 * 60 * 1000)
                          )
                        : formatDateToString(new Date())
                );
            }
        });
    }
    //input 상태
    const [isEditing, setIsEditig] = useState<boolean>(false);

    return (
        <StyledTodo>
            <TodoWrap>
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
                            newcheckstatus={newcheckstatus}
                        >
                            {newcheckstatus === "completed" && <CheckIcon />}
                        </StyledCheckbox>
                        <Text newcheckstatus={newcheckstatus}>{content}</Text>
                    </TodoDiv>
                )}
            </TodoWrap>
            {!isEditing && (
                <DropDownWrap>
                    <DropDown list={listItems}>
                        <MenuIcon />
                    </DropDown>
                </DropDownWrap>
            )}
        </StyledTodo>
    );
}
