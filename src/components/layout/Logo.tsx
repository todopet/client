import React from "react";
import styled from "styled-components";

const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledLogo = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 28px;
    font-style: normal;
    font-weight: 800;
    line-height: normal;
    display: flex;
    width: 164px;
    height: 49px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    outline: none;

    &:hover {
        opacity: 0.8;
    }

    &:active {
        opacity: 0.7;
    }
`;

export default function Logo() {
    return (
        <LogoContainer>
            <StyledLogo>Todo Pet</StyledLogo>
        </LogoContainer>
    );
}
