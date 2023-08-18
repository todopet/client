import React from "react";
import { ReactComponent as LeftSvg } from "@/assets/images/leftButton.svg";
import {Container, Text } from "./CategoryHeader.styles";

const CategoryHeader: React.FC = () => {
    return (
        <Container>
            <button><LeftSvg /></button>
            <Text>목표 {"등록"}</Text>
            <Text>+</Text>
        </Container>
    );
}

export default CategoryHeader;