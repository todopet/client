import { category, res } from "@/@types";
import { axiosRequest } from "@/api";
import {
  CategoryContentList,
} from "@/components/pages/Category/CategoryContent/CategoryContentList";
import { CategoryHeader } from "@/components/pages/Category/CategoryHeader";
import { notifyApiError } from "@/libs/utils/notifyApiError";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "@/api/endpoints";

const CategoryList = () => {
    const navigate = useNavigate();

    const handlePlusButtonClick = () => {
        navigate("/category/post");
    };

    const [categoryList, setCategoryList] = useState<category[]>([]);

    const getCategories = async () => {
        try {
            const response: res<category[]> = await axiosRequest.requestAxios<
                res<category[]>
            >("get", API_ENDPOINTS.CATEGORY.LIST);
            setCategoryList(response.data);
        } catch (error) {
            notifyApiError(
                error,
                "데이터를 가져오던 중 에러가 발생했습니다. 다시 시도해 주세요."
            );
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            <CategoryHeader
                subject={"관리"}
                handleClick={handlePlusButtonClick}
            ></CategoryHeader>
            <CategoryContentList
                categoryList={categoryList}
            ></CategoryContentList>
        </>
    );
};
export default CategoryList;
