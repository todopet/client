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

export default function Nav() {
    return (
        <NavWrap>
            <ButtonStyled>
                <StyledFeedIcon />
            </ButtonStyled>
            <ButtonStyled>
                <StyledHeartIcon />
            </ButtonStyled>
            <ButtonStyled>
                <StyledRestIcon />
            </ButtonStyled>
            <ButtonStyled>
                <StyledWashIcon />
            </ButtonStyled>
            <ButtonStyled>
                <StyledHiddenIcon />
            </ButtonStyled>
        </NavWrap>
    );
}
