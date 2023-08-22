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

interface itemType {
    feed: boolean;
    play: boolean;
    rest: boolean;
    wash: boolean;
    hidden: boolean;
    setFeed: () => void;
    setPlay: () => void;
    setRest: () => void;
    setWash: () => void;
    setHidden: () => void;
}

export default function Nav({ feed, play, rest, wash, hidden, setFeed, setPlay, setRest, setWash, setHidden }: itemType) {
    return (
        <NavWrap>
            <ButtonStyled on={feed} onClick={setFeed}>
                <StyledFeedIcon />
            </ButtonStyled>
            <ButtonStyled on={play} onClick={setPlay}>
                <StyledHeartIcon />
            </ButtonStyled>
            <ButtonStyled on={rest} onClick={setRest}>
                <StyledRestIcon />
            </ButtonStyled>
            <ButtonStyled on={wash} onClick={setWash}>
                <StyledWashIcon />
            </ButtonStyled>
            <ButtonStyled on={hidden} onClick={setHidden}>
                <StyledHiddenIcon />
            </ButtonStyled>
        </NavWrap>
    );
}
