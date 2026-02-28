//react hook
import { useCallback, useEffect, useRef, useState } from "react";
//api, interface
import { axiosRequest } from "@/api";
import { ApiResponse, Todo, TodoStatus } from "@/@types";
//icons
//components
import { useTodosStore } from "@/store/todoStore";
import { notifyApiError } from "@/libs/utils/notifyApiError";
import { API_ENDPOINTS } from "@/api/endpoints";
//styles
import { Form, StyledCheckbox, Input } from "@/components/pages/Todo/TodoList/TodoItem/Todos/Todo/TodoForm/TodoForm.styles";

interface TodoFormProps {
  categoryId?: string;
  contentId?: string;
  existingContent?: string;
  status?: TodoStatus;
  finishEdit?: () => void;
}
export const TodoForm = ({
  categoryId,
  contentId,
  existingContent,
  status,
  finishEdit,
}: TodoFormProps) => {
  const selectedDate = useTodosStore((state) => state.selectedDate);
  const setTodos = useTodosStore((state) => state.setTodos);
  //체크 가능여부
  const [disabledChecked, setDisabledChecked] = useState<boolean>(true);

  //input value 관리
  const [value, setValue] = useState<string>(existingContent ? existingContent : "");

  //투두 post요청(투두 생성)
  const postTodo = useCallback(async () => {
    try {
      await axiosRequest.requestAxios<ApiResponse<Todo[]>>(
        "post",
        API_ENDPOINTS.TODO.CONTENTS_WITH_CACHE_BUSTER(),
        {
          categoryId: categoryId,
          todo: value,
          date: selectedDate,
        }
      );
    } catch (error) {
      notifyApiError(error, "할 일 생성 중 에러가 발생했습니다. 다시 시도해 주세요.");
    }
  }, [categoryId, selectedDate, value]);
  //투두 patch요청(투두내용수정)
  const changeTodoContent = useCallback(async () => {
    try {
      await axiosRequest.requestAxios<ApiResponse<Todo[]>>(
        "patch",
        API_ENDPOINTS.TODO.CONTENT_WITH_CACHE_BUSTER(contentId!),
        {
          contentId: contentId,
          todo: value,
          status: status,
        }
      );
    } catch (error) {
      notifyApiError(error, "데이터 수정 중 에러가 발생했습니다. 다시 시도해 주세요.");
    }
  }, [contentId, status, value]);

  //투두 생성 or 수정
  const submitForm = useCallback(async () => {
    if (existingContent) {
      setDisabledChecked(true); //체크박스 지우기
      await changeTodoContent();
      finishEdit && finishEdit(); //수정이 끝나면 form 닫힘
    } else if (value) {
      setDisabledChecked(true); //체크박스 지우기
      await postTodo();
    }
    setTodos(selectedDate, selectedDate);
    setValue("");
  }, [changeTodoContent, existingContent, finishEdit, postTodo, selectedDate, setTodos, value]);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitForm();
  }, [submitForm]);

  //input form 참조
  const formRef = useRef<HTMLFormElement>(null);

  //input form 외부 클릭시 제출
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      void submitForm();
      finishEdit && finishEdit();
    }
  }, [finishEdit, submitForm]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // 클릭 이벤트 리스너 제거
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  //input value 변경시 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      {!disabledChecked && <StyledCheckbox />}
      <Input placeholder="할 일 입력" onChange={handleChange} value={value} autoFocus />
    </Form>
  );
}
