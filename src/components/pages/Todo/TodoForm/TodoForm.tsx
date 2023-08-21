//react hook
import { useState } from "react";
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
    setIsEditig?: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function TodoForm({
    categoryId,
    contentId,
    getCategory,
    existingContent,
    status,
    setIsEditig
}: TodoFormProps) {
    //투두 post요청(투두 생성)
    async function postTodo() {
        try {
            const response: res<todo[]> = await axiosRequest.requestAxios<
                res<todo[]>
            >("post", `/todoContents`, {
                categoryId: categoryId,
                todo: value
            });
            console.log("투두입력!");
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

    //input value 관리
    const [value, setValue] = useState<string>(
        existingContent ? existingContent : ""
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (existingContent) {
            await changeTodoContent();
            setIsEditig && setIsEditig(false);
        } else {
            await postTodo();
        }
        getCategory();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    return (
        <Form onSubmit={handleSubmit}>
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
