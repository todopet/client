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
import {
    InputContainer,
    StyledInput
} from "../../CategoryHeader/CategoryHeader.styles";
import Button from "@/components/Button/Button";
import axios from "axios";

// interface Category {
//     id: string;
//     name: string;
// }
interface TitleProps {
    title: string;
}

interface InputProps {
    type?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const CategoryContentPost: React.FC<TitleProps> = ({ title }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState("");
    const [categoryList, setCategoryList] = useState<any[]>([]);
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get("categoryId");
    console.log(id);
    const [deleteCategoryId, setdeleteategoryId] = useState<string | null>(
        null
    );
    const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
        null
    );
    const [newCategoryName, setNewCategoryName] = useState<string>("");

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

    const handleEditCategory = async () => {
        if (editingCategoryId && newCategoryName) {
            try {
                const response: res<any> = await axiosRequest.requestAxios<
                    res<any>
                >("patch", `/api/v1/todoCategories/${editingCategoryId}`, {
                    name: newCategoryName
                });
                if ((response as any).status === 200) {
                    getPostings(); // 성공시 목록 업데이트
                    setEditingCategoryId(null); // 수정 모드 종료
                }
            } catch (error) {
                console.error("Failed to edit category", error);
            }
        }
    };

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
        try {
            const response: res<any> = await axios.delete(
                `http://localhost:3001/api/v1/todoCategories/${id}`
            );
            alert("삭제가 완료되었습니다!"); // 사용자에게 알림
            navigate("/category/list"); // list 페이지로 이동
        } catch (error) {
            console.error("Error deleting category:", error);
            alert("오류가 발생했습니다. 다시 시도해 주세요.");
        }

        setIsDeleteModalOpen(false);
        navigate("/category/list");
    };

    const handleCancelModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmModal = async () => {
        setIsModalOpen(false);
        try {
            // PATCH 요청으로 목표를 종료
            const response: res<any> = await axios.patch(
                `http://localhost:3001/api/v1/todoCategories/endCategory/${id}`
            );
            alert("목표가 종료되었습니다!"); // 사용자에게 알림
            navigate("/category/list"); // list 페이지로 이동
        } catch (error) {
            console.error("Failed to end category:", error);
            alert("오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };

    const handleInput = (e: any) => {
        // console.log(e.target.value);
        setInputValue(e.target.value);
    };

    const handleAddCategory = async () => {
        // categoryName 비어있는지 확인
        if (!inputValue) {
            alert("목표를 입력해 주세요.");
            return; // 빈 카테고리 이름으로 API 요청 보내지 않도록 함수 종료
        }

        try {
            if (title === "등록") {
                await axios.post(
                    "http://localhost:3001/api/v1/todoCategories",
                    {
                        category: inputValue
                    }
                );

                // 목표가 등록되었음을 알림
                alert("목표가 등록되었습니다!");

                // 목표 관리 페이지로 이동
                navigate("/category/list");

                // await axiosRequest.requestAxios(
                //     "post",
                //     "/api/v1/todoCategory/",
                //     {
                //         category: inputValue
                //     }
                // );
            }
            //  else if (title === "수정") {
            //     await axiosRequest.requestAxios(
            //         "patch",
            //         `/api/v1/todoCategory/${inputValue}`,
            //         {
            //             category: inputValue
            //         }
            //     );
            // }
        } catch (error) {
            console.error("API 호출 중 에러 발생:", error);
            alert("오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };

    return (
        <>
            {/* <Input value={category.name} readOnly />{" "} */}
            {/* 카테고리 이름을 보여주는 부분 */}
            {/* <input value={inputValue} onChange={handleInput} /> */}
            {title === "등록" && (
                <InputContainer>
                    <StyledInput
                        type="text"
                        value={inputValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setInputValue(e.target.value)
                        }
                        placeholder=" 목표 입력"
                    />
                </InputContainer>
            )}
            <Button onClick={handleAddCategory}>확인</Button>

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
                    onCancel={() => setIsModalOpen(false)}
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
