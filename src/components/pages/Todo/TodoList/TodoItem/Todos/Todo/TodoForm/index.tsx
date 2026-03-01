//react hook
import { useCallback, useEffect, useRef } from "react";
//api, interface
import { axiosRequest } from "@/api";
import { ApiResponse, Todo, TodoStatus } from "@/@types";
//icons
//components
import { useTodosStore } from "@/store/todoStore";
import { notifyApiError } from "@/libs/utils/notifyApiError";
import { API_ENDPOINTS } from "@/api/endpoints";
//styles
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Input } from "@/components/pages/Todo/TodoList/TodoItem/Todos/Todo/TodoForm/TodoForm.styles";
import { todoSchema, type TodoFormValues } from "@/schemas/todo.schema";

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
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormValues>({
    resolver: zodResolver(todoSchema),
    mode: "onBlur",
    defaultValues: {
      content: existingContent ?? "",
    },
  });

  //투두 post요청(투두 생성)
  const postTodo = useCallback(async (content: string) => {
    try {
      await axiosRequest.requestAxios<ApiResponse<Todo[]>>(
        "post",
        API_ENDPOINTS.TODO.CONTENTS_WITH_CACHE_BUSTER(),
        {
          categoryId: categoryId,
          todo: content,
          date: selectedDate,
        }
      );
      return true;
    } catch (error) {
      notifyApiError(error, "할 일 생성 중 에러가 발생했습니다. 다시 시도해 주세요.");
      return false;
    }
  }, [categoryId, selectedDate]);
  //투두 patch요청(투두내용수정)
  const changeTodoContent = useCallback(async (content: string) => {
    try {
      await axiosRequest.requestAxios<ApiResponse<Todo[]>>(
        "patch",
        API_ENDPOINTS.TODO.CONTENT_WITH_CACHE_BUSTER(contentId!),
        {
          contentId: contentId,
          todo: content,
          status: status,
        }
      );
      return true;
    } catch (error) {
      notifyApiError(error, "데이터 수정 중 에러가 발생했습니다. 다시 시도해 주세요.");
      return false;
    }
  }, [contentId, status]);

  //투두 생성 or 수정
  const submitForm = useCallback(async (content: string) => {
    const normalizedContent = content.trim();
    if (!normalizedContent) {
      return;
    }

    if (existingContent) {
      const isSuccess = await changeTodoContent(normalizedContent);
      if (isSuccess) {
        finishEdit?.(); //수정이 끝나면 form 닫힘
      } else {
        return;
      }
    } else {
      const isSuccess = await postTodo(normalizedContent);
      if (!isSuccess) {
        return;
      }
    }
    await setTodos(selectedDate, selectedDate);
    reset({ content: "" });
  }, [changeTodoContent, existingContent, finishEdit, postTodo, reset, selectedDate, setTodos]);

  const handleFormSubmit = handleSubmit(async ({ content }) => {
    await submitForm(content);
  });

  //input form 참조
  const formRef = useRef<HTMLFormElement>(null);

  //input form 외부 클릭시 제출
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (formRef.current && !formRef.current.contains(e.target as Node)) {
      void handleSubmit(async ({ content }) => {
        await submitForm(content);
      })();
    }
  }, [handleSubmit, submitForm]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // 클릭 이벤트 리스너 제거
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    reset({ content: existingContent ?? "" });
  }, [existingContent, reset]);

  return (
    <div>
      <Form ref={formRef} onSubmit={handleFormSubmit}>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="할 일 입력"
              autoFocus
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
      </Form>
      <p className="m-0 min-h-[14px] text-[10.5px] text-red-500">
        {errors.content?.message}
      </p>
    </div>
  );
}
