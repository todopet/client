import React from "react";
import { ReactComponent as LeftSvg } from "@/assets/icons/leftButton.svg";
import { ReactComponent as PlusSvg } from "@/assets/icons/plusButton.svg";
import {
    Container,
    Button,
    Text,
    ActionContainer
} from "./CategoryHeader.styles";
import { useNavigate } from "react-router-dom";

// subjects 객체의 타입을 정의합니다.
interface Subjects {
    [key: string]: () => JSX.Element;
}

// navigations 객체의 타입을 정의합니다.
interface Navigations {
    [key: string]: () => void;
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
    const navigation: Navigations = {
        등록: () => navigate(-1),
        관리: () => navigate("/todo"),
        수정: () => navigate(-1)
    };
    // a
    return (
        <Container>
            <ActionContainer>
                <Button onClick={navigation[subject]}>
                    <LeftSvg />
                </Button>
                <Text>목표 {subject}</Text>
                {subjects[subject]()}
            </ActionContainer>
        </Container>
    );
};

export default CategoryHeader;
