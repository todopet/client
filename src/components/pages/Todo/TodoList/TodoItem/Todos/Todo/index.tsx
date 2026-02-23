//react hook
import { useState, useEffect } from "react";
import { useTodosStore } from "@/store/todoStore";
import { TodoStatus } from "@/@types";
import { STATUS_TRANSITIONS, isTodoStatus } from "@/@types/todo";

//icons
import { MenuIcon, CheckIcon } from "@/modules/icons";

//components
import { DropDown } from "@/components/DropDown";
import { TodoForm } from "@/components/pages/Todo/TodoList/TodoItem/Todos/Todo/TodoForm";

//styles
import { StyledTodo, TodoDiv, StyledCheckbox, Text, TodoWrap, DropDownWrap } from "@/components/pages/Todo/TodoList/TodoItem/Todos/Todo/Todo.styles";

// common scripts
import { formatDateToString } from "@/libs/utils/global";

interface TodoProps {
  content: string;
  status: TodoStatus;
  contentId: string;
}

export const Todo = ({
  content, status, contentId
}: TodoProps) => {
  const { selectedDate, deleteTodo, setStatus } = useTodosStore((state) => state);

  const [newCheckStatus, setNewCheckStatus] = useState<TodoStatus>(status);
  useEffect(() => {
    setNewCheckStatus(isTodoStatus(status) ? status : TodoStatus.UNCHECKED);
  }, [status]);

  const handleCheckClick = () => {
    const currentStatus = isTodoStatus(newCheckStatus) ? newCheckStatus : TodoStatus.UNCHECKED;
    const checkStatus = STATUS_TRANSITIONS[currentStatus];

    //상태 업데이트
    setNewCheckStatus(checkStatus);
    //patch요청
    setStatus(contentId, content, checkStatus, selectedDate);
  };
  const isSelectedDate: boolean =
    new Date(selectedDate).toString() === new Date(formatDateToString(new Date())).toString();

  //DropDown의 props
  const listItems = [
    {
      content: "수정",
      handleClick: () => {
        setIsEditing(true);
      },
    },
    {
      content: "삭제",
      handleClick: () => {
        deleteTodo(contentId);
      },
    },
  ];
  if (newCheckStatus !== TodoStatus.COMPLETED) {
    listItems.push({
      content: isSelectedDate ? "내일하기" : "오늘하기",
      handleClick: () => {
        setStatus(
          contentId,
          content,
          newCheckStatus,
          isSelectedDate
            ? formatDateToString(new Date(Date.now() + 24 * 60 * 60 * 1000))
            : formatDateToString(new Date())
        );
      },
    });
  }
  //input 상태
  const [isEditing, setIsEditing] = useState<boolean>(false);

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
