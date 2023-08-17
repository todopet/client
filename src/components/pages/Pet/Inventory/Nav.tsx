import React from "react";
import styled from "styled-components";

import { ReactComponent as FeedIcon } from "@/assets/images/feed.svg";
import { ReactComponent as HeartIcon } from "@/assets/images/heart.svg";
import { ReactComponent as RestIcon } from "@/assets/images/rest.svg";
import { ReactComponent as WashIcon } from "@/assets/images/wash.svg";
import { ReactComponent as HiddenIcon } from "@/assets/images/hidden.svg";

export default function Nav() {
    return (
        <NavWrap>
            <StyledFeedIcon />
            <StyledHeartIcon />
            <StyledRestIcon />
            <StyledWashIcon />
            <StyledHiddenIcon />
        </NavWrap>
    );
}

const NavWrap = styled.div`
    box-sizing: border-box;
    display: flex;
    gap: 22px;
    justify-content: center;
    margin-bottom: 26px;
    svg:hover {
        & > circle {
            stroke: #aaeea8;
        }
    }
`;

const StyledFeedIcon = styled(FeedIcon)``;
const StyledHeartIcon = styled(HeartIcon)``;
const StyledRestIcon = styled(RestIcon)``;
const StyledWashIcon = styled(WashIcon)``;
const StyledHiddenIcon = styled(HiddenIcon)``;
