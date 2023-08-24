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
    Wrap
} from "./CategoryContentList.styles";
import axiosRequest from "@/api";
import { res } from "@/@types/index";

// interface Category {
//     id: string;
//     name: string;
// }

const CategoryContentList: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const navigate = useNavigate();
    const [categoryList, setCategoryList] = useState<any[]>([]);

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
        <Wrap>
            {/* <Input value={category.name} readOnly />{" "} */}
            {/* 카테고리 이름을 보여주는 부분 */}
            <Text>일반</Text>
            <ButtonWrap>
                {categoryList.length > 0 &&
                    categoryList.map((category) => {
                        return (
                            !category.ended && (
                                <CircleButton key={category._id}>
                                    <Link
                                        to={`/category/post?categoryId=${category._id}`}
                                    >
                                        {category.category}
                                    </Link>
                                </CircleButton>
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
                                <CircleButton key={category._id}>
                                    {category.category}
                                </CircleButton>
                            )
                        );
                    })}
            </ButtonWrap>
        </Wrap>
    );
};

export default CategoryContentList;
