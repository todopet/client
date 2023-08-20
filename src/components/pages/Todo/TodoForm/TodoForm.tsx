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
    categoryId: string;
    getCategory: () => void;
}
export default function TodoForm({ categoryId, getCategory }: TodoFormProps) {
    //투두 post요청
    async function postTodo() {
        try {
            const response: res<todo[]> = await axiosRequest.requestAxios<
                res<todo[]>
            >("post", `/todoContent/${categoryId}`, {
                todo: value
            });
        } catch (error) {
            console.error(error);
        }
    }

    //input value 관리
    const [value, setValue] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await postTodo();
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
