//react hook
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTodosStore } from "@/store/todoStore";
import { TodoStatus } from "@/@types";
import { STATUS_TRANSITIONS, isTodoStatus } from "@/@types/todo";

//icons
import { MenuIcon, CheckIcon } from "@/modules/icons";

//components
import { DropDown } from "@/components/DropDown";
import { TodoForm } from "@/components/pages/Todo/TodoList/TodoItem/Todos/Todo/TodoForm";
import useToastsStore from "@/store/toastStore";
import { MiniPetToast } from "@/components/pages/Todo/MiniPet/Toast/MiniPetToast";

//styles
import { StyledTodo, TodoDiv, StyledCheckbox, Text, TodoWrap, DropDownWrap } from "@/components/pages/Todo/TodoList/TodoItem/Todos/Todo/Todo.styles";

// common scripts
import { addDays, formatDate, isToday } from "@/libs/utils/dateUtils";

interface TodoProps {
  content: string;
  status: TodoStatus;
  contentId: string;
}

export const Todo = ({
  content, status, contentId
}: TodoProps) => {
  const selectedDate = useTodosStore((state) => state.selectedDate);
  const deleteTodo = useTodosStore((state) => state.deleteTodo);
  const setStatus = useTodosStore((state) => state.setStatus);
  const showToast = useToastsStore((state) => state.showToast);
  const closeToast = useToastsStore((state) => state.closeToast);

  const [newCheckStatus, setNewCheckStatus] = useState<TodoStatus>(status);
  useEffect(() => {
    setNewCheckStatus(isTodoStatus(status) ? status : TodoStatus.UNCHECKED);
  }, [status]);

  const handleCheckClick = useCallback(async () => {
    const currentStatus = isTodoStatus(newCheckStatus) ? newCheckStatus : TodoStatus.UNCHECKED;
    const checkStatus = STATUS_TRANSITIONS[currentStatus];

    //상태 업데이트
    setNewCheckStatus(checkStatus);
    //patch요청
    const message = await setStatus(contentId, content, checkStatus, selectedDate);

    if (checkStatus === TodoStatus.COMPLETED && message) {
      closeToast();
      showToast(MiniPetToast, { message });
    }
  }, [closeToast, content, contentId, newCheckStatus, selectedDate, setStatus, showToast]);
  const isSelectedDate = isToday(selectedDate);

  //DropDown의 props
  //input 상태
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const listItems = useMemo(() => {
    const items = [
      {
        content: "수정",
        handleClick: () => {
          setIsEditing(true);
        },
      },
      {
        content: "삭제",
        handleClick: () => {
          void deleteTodo(contentId);
        },
      },
    ];

    if (newCheckStatus !== TodoStatus.COMPLETED) {
      items.push({
        content: isSelectedDate ? "내일하기" : "오늘하기",
        handleClick: () => {
          void setStatus(
            contentId,
            content,
            newCheckStatus,
            isSelectedDate
              ? addDays(new Date(), 1)
              : formatDate(new Date())
          );
        },
      });
    }

    return items;
  }, [content, contentId, deleteTodo, isSelectedDate, newCheckStatus, setStatus]);

  return (
    <StyledTodo>
      <TodoWrap>
        {isEditing ? (
          <TodoForm
            contentId={contentId}
            existingContent={content}
            status={newCheckStatus}
            finishEdit={() => setIsEditing(false)}
          />
        ) : (
          <TodoDiv>
            <StyledCheckbox onClick={handleCheckClick} newCheckStatus={newCheckStatus}>
              {newCheckStatus === TodoStatus.COMPLETED && <img src={CheckIcon} alt="checked" />}
            </StyledCheckbox>
            <Text newCheckStatus={newCheckStatus}>{content}</Text>
          </TodoDiv>
        )}
      </TodoWrap>
      {!isEditing && (
        <DropDownWrap>
          <DropDown list={listItems}>
            <img src={MenuIcon} alt="menu" />
          </DropDown>
        </DropDownWrap>
      )}
    </StyledTodo>
  );
}
