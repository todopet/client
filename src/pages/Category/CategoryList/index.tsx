import { Category } from "@/@types";
import {
  CategoryContentList,
} from "@/components/pages/Category/CategoryContent/CategoryContentList";
import { CategoryHeader } from "@/components/pages/Category/CategoryHeader";
import { notifyApiError } from "@/libs/utils/notifyApiError";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCategoryQuery } from "@/hooks/queries/useUserQuery";
import { SEO } from "@/components/SEO";

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
            <SEO
                title="목표 관리"
                description="등록한 목표를 관리하고 진행 상태를 확인하세요."
                url="/category/list"
                noIndex
            />
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
