//react hook
import { useState, useRef, useEffect } from "react";
//api, interface
import axiosRequest from "@/api/index";
import { res, todo } from "@/@types/index";
//icons
//components
//styles
import { Form, StyledCheckbox, Input } from "./TodoForm.styles";

interface TodoFormProps {
    categoryId?: string;
    contentId?: string;
    getCategory: () => void;
    existingContent?: string;
    status?: string;
    finishEdit?: () => void;
}
export default function TodoForm({
    categoryId,
    contentId,
    getCategory,
    existingContent,
    status,
    finishEdit
}: TodoFormProps) {
    //input value 관리
    const [value, setValue] = useState<string>(
        existingContent ? existingContent : ""
    );

    //투두 post요청(투두 생성)
    async function postTodo() {
        try {
            // console.log("투두입력!", categoryId, value);
            const response: res<todo[]> = await axiosRequest.requestAxios<
                res<todo[]>
            >("post", `/todoContents`, {
                categoryId: categoryId,
                todo: value
            });
        } catch (error) {
            console.error(error);
        }
    }
    //투두 patch요청(투두내용수정)
    async function changeTodoContent() {
        try {
            const response: res<todo[]> = await axiosRequest.requestAxios<
                res<todo[]>
            >("patch", `/todoContents/${contentId}`, {
                contentId: contentId,
                todo: value,
                status: status
            });
            console.log("투두입력!", contentId, value, status);
        } catch (error) {
            console.error(error);
        }
    }

    //투두 생성 or 수정
    const submitForm = async () => {
        if (existingContent) {
            await changeTodoContent();
        } else if (value) {
            await postTodo();
        }
        getCategory();
        setValue("");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        submitForm();
        finishEdit && finishEdit();
    };

    //input form 참조
    const formRef = useRef<HTMLFormElement>(null);

    //input form 외부 클릭시 제출
    function handleClickOutside(e: MouseEvent) {
        // console.log("외부클릭!");

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
            <StyledCheckbox />
            <Input
                placeholder="할 일 입력"
                onChange={handleChange}
                value={value}
                autoFocus
            />
        </Form>
    );
}
