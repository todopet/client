//react hook
import { useState, useEffect } from "react";
//api, interface
import axiosRequest from "@/api/index";
import { res, todoCategory } from "@/@types/index";
//components
import TodoItem from "./TodoItem/TodoItem";
//styles
import { TodoListStyles } from "./TodoList.styles";

export default function TodoList() {
    //전체 목표카테고리 get 요청 ->api작업완료시 (전체) -> (날짜)기준으로 바꾸기
    async function getCategory() {
        const startDate = "2023-08-19T15:00:00.000Z";
        const endDate = "2023-08-27T15:00:00.000Z";
        try {
            const response: res<todoCategory[]> =
                await axiosRequest.requestAxios<res<todoCategory[]>>(
                    "get",
                    `/todoContents?start=${startDate}&end=${endDate}`
                );
            // console.log("categories", response);
            setCategories(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    //불러온 카테고리 상태관리
    const [categories, setCategories] = useState<todoCategory[]>();

    useEffect(() => {
        getCategory();
    }, []);

    return (
        <TodoListStyles>
            {categories?.map((category) => {
                return (
                    <TodoItem category={category} getCategory={getCategory} />
                );
            })}
        </TodoListStyles>
    );
}
