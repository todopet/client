import { category, res } from "@/@types";
import axiosRequest from "@/api";
import CategoryContentList from "@/components/pages/Category/CategoryContent/CategoryContentList/CategoryContentList";
import CategoryHeader from "@/components/pages/Category/CategoryHeader/CategoryHeader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
            >("get", "/todoCategories");
            setCategoryList(response.data);
        } catch (error) {
            console.error("Failed to fetch categories:", error);
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
