import React, { useState, useEffect } from "react";
import { ReactComponent as LeftSvg } from "@/assets/icons/leftButton.svg";
import { ReactComponent as PlusSvg } from "@/assets/icons/plusButton.svg";
import {
    Container,
    Button,
    Text,
    ActionContainer
} from "./CategoryHeader.styles";
import { useNavigate } from "react-router-dom";
import axiosRequest from "@/api";

interface InputProps {
    type?: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

interface Category {
    id: string;
    name: string;
}

interface ApiResponse {
    data: Category[];
}

const Input: React.FC<InputProps> = ({
    type = "text",
    value,
    onChange,
    placeholder
}) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
};

// subjects 객체의 타입을 정의합니다.
interface Subjects {
    [key: string]: () => JSX.Element;
}

interface CategoryHeaderProps {
    subject: string;
    handleClick: () => void;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
    subject,
    handleClick
}) => {
    const navigate = useNavigate();
    const [categoryName, setCategoryName] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        // if (subject === "수정") {
        //     fetchCategories();
        // }
    }, []);

    const renderActionContent = (subject: string) => {};

    const handleEditCategory = () => {};

    const handleCategoryNameChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const selectedCategory = categories.find(
            (category) => category.id === e.target.value
        );
        if (selectedCategory) {
            setCategoryName(selectedCategory.name);
            setSelectedCategoryId(selectedCategory.id);
        }
    };

    // const handleAddCategory = async () => {
    //     // categoryName 비어있는지 확인
    //     if (!categoryName) {
    //         alert("목표를 입력해 주세요.");
    //         return; // 빈 카테고리 이름으로 API 요청 보내지 않도록 함수 종료
    //     }

    //     try {
    //         if (title === "등록") {
    //             await axiosRequest.requestAxios(
    //                 "post",
    //                 "/api/v1/todoCategory/",
    //                 {
    //                     category: categoryName
    //                 }
    //             );
    //         } else if (title === "수정") {
    //             await axiosRequest.requestAxios(
    //                 "patch",
    //                 `/api/v1/todoCategory/${selectedCategoryId}`,
    //                 {
    //                     category: categoryName
    //                 }
    //             );
    //         }
    //     } catch (error) {
    //         console.error("API 호출 중 에러 발생:", error);
    //         alert("오류가 발생했습니다. 다시 시도해 주세요.");
    //     }
    // };

    const subjects: Subjects = {
        등록: () => {
            return <Button onClick={handleClick}>확인</Button>;
        },
        관리: () => {
            return (
                <Button onClick={handleClick}>
                    <PlusSvg />
                </Button>
            );
        },
        수정: () => {
            return <Button onClick={handleClick}>확인</Button>;
        }
    };

    return (
        <Container>
            <ActionContainer>
                <Button onClick={() => navigate(-1)}>
                    <LeftSvg />
                </Button>
                <Text>목표 {subject}</Text>
                {/* {title === "등록" && (
                    <Button onClick={handleAddCategory}>확인</Button>
                )} */}
                {subjects[subject]()}
                {/* {title === "수정" && (
                    <>
                        <select
                            value={selectedCategoryId}
                            onChange={handleCategoryNameChange}
                        >
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <StyledInput
                            type="text"
                            value={categoryName}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setCategoryName(e.target.value)}
                            placeholder=" 목표 수정"
                        />
                        <Button onClick={handleAddCategory}>확인</Button>
                    </>
                )} */}
            </ActionContainer>
        </Container>
    );
};

export default CategoryHeader;
