import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Input from "@/components/Input/Input";
import ConfirmModal from "@/components/ConfirmModal/ConfirmModal";
import {
    Text,
    CircleButton,
    ButtonWrap,
    ActionButtonWrap,
    ActionButton
} from "./CategoryContentPost.styles";
import axiosRequest from "@/api";
import { res } from "@/@types/index";

// interface Category {
//     id: string;
//     name: string;
// }

const CategoryContentPost: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const navigate = useNavigate();
    const [categoryList, setCategoryList] = useState<any[]>([]);
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("categoryId");
    console.log(id);
    async function getPostings() {
        try {
            const response: res<any[]> = await axiosRequest.requestAxios<
                res<any[]>
            >("get", "/todoCategories");
            // console.log("전체게시글", response.data);
            setCategoryList(response.data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getPostings();
    }, []);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleOpenDeleteModal = () => {
        setIsDeleteModalOpen(true);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleConfirmDeleteModal = async () => {
        // try {
        //     const response: res<any> = await axiosRequest.requestAxios<
        //         res<any>
        //     >("delete", `/api/v1/todoCategories/${category.id}`);

        //     if (response.status === 200) {
        //         console.log("Category deleted successfully!");
        //     } else {
        //         console.error("Failed to delete category");
        //     }
        // } catch (error) {
        //     console.error("Error deleting category:", error);
        // }

        setIsDeleteModalOpen(false);
        navigate("/category/list");
    };

    const handleCancelModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmModal = () => {
        setIsModalOpen(false);
        navigate(-1);
    };

    return (
        <>
            {/* <Input value={category.name} readOnly />{" "} */}
            {/* 카테고리 이름을 보여주는 부분 */}

            <ActionButtonWrap>
                <ActionButton type="exit" onClick={handleOpenModal}>
                    종료하기
                </ActionButton>
                <ActionButton type="delete" onClick={handleOpenDeleteModal}>
                    삭제
                </ActionButton>
            </ActionButtonWrap>
            {isModalOpen && (
                <ConfirmModal
                    message="목표를 종료하시겠습니까?\n기존의 할 일 목록은 유지되지만 새로운 입력은 제한됩니다."
                    onConfirm={handleConfirmModal}
                    onCancel={handleCancelModal}
                />
            )}
            {isDeleteModalOpen && (
                <ConfirmModal
                    message="목표를 삭제하시겠습니까?\n기존의 할 일 목록이 모두 삭제됩니다."
                    onConfirm={handleConfirmDeleteModal}
                    onCancel={handleCloseDeleteModal}
                />
            )}
        </>
    );
};

export default CategoryContentPost;
