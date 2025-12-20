//react hook
import { useState, useRef, useEffect } from "react";
//api, interface
import { axiosRequest } from "@/api";
import { res, todo } from "@/@types";
//icons
//components
import { useTodosStore } from "@/store/todoStore";
//styles
import { Form, StyledCheckbox, Input } from "@/components/pages/Todo/TodoList/TodoItem/Todos/Todo/TodoForm/TodoForm.styles";

interface TodoFormProps {
  categoryId?: string;
  contentId?: string;
  existingContent?: string;
  status?: string;
  finishEdit?: () => void;
}
export const TodoForm = ({
  categoryId,
  contentId,
  existingContent,
  status,
  finishEdit,
}: TodoFormProps) => {
  const { selectedDate, setTodos } = useTodosStore((state) => state);
  //체크 가능여부
  const [disabledChecked, setDisabledChecked] = useState<boolean>(true);

  //input value 관리
  const [value, setValue] = useState<string>(existingContent ? existingContent : "");

  //투두 post요청(투두 생성)
  const postTodo = async () => {
    try {
      const response = await axiosRequest.requestAxios<res<todo[]>>(
        "post",
        `todoContents?_=${Date.now()}`,
        {
          categoryId: categoryId,
          todo: value,
          date: selectedDate,
        }
      );
      console.log(response); // "유효하지 않은 토큰입니다" 에러 발생
    } catch (error) {
      console.error(error);
      alert("할 일 생성 중 에러가 발생했습니다. 다시 시도해 주세요.");
    }
  }
  //투두 patch요청(투두내용수정)
  const changeTodoContent = async () => {
    try {
      await axiosRequest.requestAxios<res<todo[]>>(
        "patch",
        `todoContents/${contentId}?_=${Date.now()}`,
        {
          contentId: contentId,
          todo: value,
          status: status,
        }
      );
    } catch (error) {
      console.error(error);
      alert("데이터 수정 중 에러가 발생했습니다. 다시 시도해 주세요.");
    }
  }

  //투두 생성 or 수정
  const submitForm = async () => {
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
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm();
  };

  //input form 참조
  const formRef = useRef<HTMLFormElement>(null);

  //input form 외부 클릭시 제출
  const handleClickOutside = (e: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      submitForm();
      finishEdit && finishEdit();
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // 클릭 이벤트 리스너 제거
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [value]); //value의 최신값을 반영

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