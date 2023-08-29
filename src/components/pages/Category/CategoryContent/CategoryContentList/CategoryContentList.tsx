import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "@/components/Input/Input";
import ConfirmModal from "@/components/ConfirmModal/ConfirmModal";
import {
    Text,
    CircleButton,
    ButtonWrap,
    ActionButtonWrap,
    ActionButton,
    Wrap,
    StyledLink
} from "./CategoryContentList.styles";
import { category } from "@/@types/index";
import CategoryContentListItem from "./CategoryContentListItem/CategoryContentListItem";

interface CategoryListProps {
    categoryList: category[];
}

const CategoryContentList: React.FC<CategoryListProps> = ({ categoryList }) => {
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
        <Wrap>
            {/* <Input value={category.name} readOnly />{" "} */}
            {/* 카테고리 이름을 보여주는 부분 */}
            <Text>일반</Text>
            <ButtonWrap>
                {categoryList.length > 0 &&
                    categoryList.map((category) => {
                        return (
                            !category.ended && (
                                <CategoryContentListItem
                                    key={category._id}
                                    category={category}
                                ></CategoryContentListItem>
                            )
                        );
                    })}
            </ButtonWrap>
            <Text>종료된 목표</Text>
            <ButtonWrap>
                {categoryList.length > 0 &&
                    categoryList.map((category) => {
                        return (
                            category.ended && (
                                <CategoryContentListItem
                                    key={category._id}
                                    category={category}
                                ></CategoryContentListItem>
                            )
                        );
                    })}
            </ButtonWrap>
        </Wrap>
    );
};

export default CategoryContentList;
