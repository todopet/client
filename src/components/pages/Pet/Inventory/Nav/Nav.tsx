import React from "react";

import {
    NavWrap,
    StyledFeedIcon,
    StyledHeartIcon,
    StyledRestIcon,
    StyledWashIcon,
    StyledHiddenIcon,
    ButtonStyled
} from "./Nav.styles";

interface categoryType {
    activeCategory: string;
    setActiveCategory(categoryName: string): void;
}

export default function Nav({ activeCategory, setActiveCategory }: categoryType) {
    return (
        <NavWrap>
            <ButtonStyled on={activeCategory === "feed"} onClick={() => {setActiveCategory("feed")}}>
                <StyledFeedIcon />
            </ButtonStyled>
            <ButtonStyled on={activeCategory === "play"} onClick={() => {setActiveCategory("play")}}>
                <StyledHeartIcon />
            </ButtonStyled>
            <ButtonStyled on={activeCategory === "rest"} onClick={() => {setActiveCategory("rest")}}>
                <StyledRestIcon />
            </ButtonStyled>
            <ButtonStyled on={activeCategory === "wash"} onClick={() => {setActiveCategory("wash")}}>
                <StyledWashIcon />
            </ButtonStyled>
            <ButtonStyled on={activeCategory === "hidden"} onClick={() => {setActiveCategory("hidden")}}>
                <StyledHiddenIcon />
            </ButtonStyled>
        </NavWrap>
    );
}
