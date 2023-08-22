import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/components/Input/Input";
import ConfirmModal from "@/components/ConfirmModal/ConfirmModal";
import {
    Text,
    CircleButton,
    ButtonWrap,
    ActionButtonWrap,
    ActionButton
} from "./CategoryContent.styles";
import axiosRequest from "@/api";
import { res } from "@/@types/index";

interface Category {
    id: string;
    name: string;
}

interface CategoryContentProps {
    category: Category;
}

const CategoryContent: React.FC<CategoryContentProps> = ({ category }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const navigate = useNavigate();

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
            <Text>일반</Text>
            <ButtonWrap>
                <CircleButton>목표1</CircleButton>
                <CircleButton>목표2</CircleButton>
                <CircleButton>목표3</CircleButton>
            </ButtonWrap>
            <Text>종료된 목표</Text>
            <ButtonWrap>
                <CircleButton>목표4</CircleButton>
            </ButtonWrap>
            <ActionButtonWrap>
                <ActionButton onClick={handleOpenModal}>종료하기</ActionButton>
                <ActionButton onClick={handleOpenDeleteModal}>
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
                    message="목표를 삭제하시겠습니까? 기존의 할 일 목록이 모두 삭제됩니다."
                    onConfirm={handleConfirmDeleteModal}
                    onCancel={handleCloseDeleteModal}
                />
            )}
        </>
    );
};

export default CategoryContent;
