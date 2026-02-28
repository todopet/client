import { Category } from "@/@types";
import {
  CategoryContentList,
} from "@/components/pages/Category/CategoryContent/CategoryContentList";
import { CategoryHeader } from "@/components/pages/Category/CategoryHeader";
import { notifyApiError } from "@/libs/utils/notifyApiError";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCategoryQuery } from "@/hooks/queries/useUserQuery";

const CategoryList = () => {
    const navigate = useNavigate();

    const handlePlusButtonClick = () => {
        navigate("/category/post");
    };

    const { data: categoryList = [], error } = useCategoryQuery();

    useEffect(() => {
        if (error) {
            notifyApiError(
                error,
                "데이터를 가져오던 중 에러가 발생했습니다. 다시 시도해 주세요."
            );
        }
    }, [error]);

    return (
        <>
            <CategoryHeader
                subject={"관리"}
                handleClick={handlePlusButtonClick}
            ></CategoryHeader>
            <CategoryContentList
                categoryList={categoryList as Category[]}
            ></CategoryContentList>
        </>
    );
};
export default CategoryList;
