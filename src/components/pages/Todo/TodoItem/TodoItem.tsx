//react hook
import { useState, useEffect } from "react";

//api, interface
import axiosRequest from "@/api/index";
import { res, category } from "@/@types/index";

//components
import Category from "../Category/Category";
import Todos from "../Todos/Todos";

//styles
import { TodoItemStyles } from "./TodoItem.styles";

export default function TodoItem() {
    //전체 목표카테고리 get 요청 ->api작업완료시 (전체) -> (날짜)기준으로 바꾸기
    async function getCategory() {
        try {
            const response: res<category[]> = await axiosRequest.requestAxios<
                res<category[]>
            >("get", "/todoCategory");
            console.log("category", response);
            setCategory(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    //불러온 카테고리 상태관리
    const [category, setCategory] = useState<category[]>();

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <TodoItemStyles>
            {category?.map((el) => {
                return (
                    <>
                        <Category category={el.category} />
                        <Todos todos={el.todos} />
                    </>
                );
            })}
        </TodoItemStyles>
    );
}
