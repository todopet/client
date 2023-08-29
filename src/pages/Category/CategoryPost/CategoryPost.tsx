import CategoryHeader from "@/components/pages/Category/CategoryHeader/CategoryHeader";
import CategoryContentPost from "@/components/pages/Category/CategoryContent/CategoryContentPost/CategoryContentPost";
import { useState } from "react";
import { category, res } from "@/@types";
import axiosRequest from "@/api";
import { useSearchParams, useNavigate } from "react-router-dom";
const CategoryPost = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("categoryId");
    const subject = id ? "수정" : "등록";
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState<string>("");

    const addCategories = async (category: string) => {
        if (!checkCategory(category)) {
            return;
        }

        try {
            const response: res<category> = await axiosRequest.requestAxios<
                res<category>
            >("post", "/todoCategories", { category });

            if (!response.error) {
                alert("목표가 등록되었습니다.");
                navigate(-1); // list 페이지로 이동
            } else {
                throw new Error("목표 등록에 실패했습니다.");
            }
        } catch (error) {
            alert(error);
            console.error("Failed to fetch categories:", error);
        }
    };

    const editCategories = async (category: string) => {
        if (!checkCategory(category)) {
            return;
        }
        try {
            const response: res<category> = await axiosRequest.requestAxios<
                res<category>
            >("patch", `/todoCategories/${id}`, { category });

            if (!response.error) {
                alert("목표가 수정되었습니다.");
                navigate(-1); // list 페이지로 이동
            } else {
                throw new Error("목표 수정에 실패했습니다.");
            }
        } catch (error) {
            console.error("Failed to fetch categories:", error);
        }
    };

    const checkCategory = (category: string) => {
        // category 내용이 비어있는지 확인
        if (!category.trim()) {
            alert("목표를 입력해 주세요.");
            return false;
        }
        return true;
    };

    const handleConfirmDeleteModal = async () => {
        try {
            const response: res<category> = await axiosRequest.requestAxios<
                res<category>
            >("delete", `/todoCategories/${id}`);
            alert("삭제가 완료되었습니다!"); // 사용자에게 알림
            navigate("/category/list"); // list 페이지로 이동
        } catch (error) {
            console.error("Error deleting category:", error);
            alert("오류가 발생했습니다. 다시 시도해 주세요.");
        }
        // setIsDeleteModalOpen(false);
    };

    const handleInputText = (text: string) => {
        setInputValue(text);
    };

    const handleConfirmClick = () => {
        if (id) {
            editCategories(inputValue);
        } else {
            addCategories(inputValue);
        }
    };

    return (
        <>
            <CategoryHeader
                subject={subject}
                handleClick={handleConfirmClick}
            ></CategoryHeader>
            <CategoryContentPost
                subject={subject}
                onTextSend={handleInputText}
                id={id}
            ></CategoryContentPost>
        </>
    );
};
export default CategoryPost;
