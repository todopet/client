import React from "react";
import { ReactComponent as LeftSvg } from "@/assets/icons/leftButton.svg";
import { ReactComponent as PlusSvg } from "@/assets/icons/plusButton.svg";
import { Container, Button, Text } from "./CategoryHeader.styles";

const CategoryHeader: React.FC = () => {
    return (
        <Container>
            <Button>
                <LeftSvg />
            </Button>
            <Text>목표 {"등록"}</Text>
            <Button>확인</Button>
            {/*
                <Button>
                    <LeftSvg />
                </Button>
                <Text>목표 {"관리"}</Text>
                <Button><PlusSvg/></Button>
                */}
            {/*
                <Button>
                    <LeftSvg />
                </Button>
                <Text>목표 {"수정"}</Text>
                <Button>확인</Button>
            */}
        </Container>
    );
};

export default CategoryHeader;
