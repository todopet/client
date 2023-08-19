import styled from "styled-components";

import Button from "@/components/Button/Button";
import { ReactComponent as FeedIcon } from "@/assets/images/feed.svg";
import { ReactComponent as HeartIcon } from "@/assets/images/heart.svg";
import { ReactComponent as RestIcon } from "@/assets/images/rest.svg";
import { ReactComponent as WashIcon } from "@/assets/images/wash.svg";
import { ReactComponent as HiddenIcon } from "@/assets/images/hidden.svg";

const NavWrap = styled.div`
    box-sizing: border-box;
    display: flex;
    gap: 22px;
    justify-content: center;
    margin-bottom: 26px;
    //hover가 아니고 클릭해야 색이 바뀌는 오류가 있음
    svg:hover {
        & > circle {
            stroke: #aaeea8;
        }
    }
`;

const ButtonStyled = styled(Button)`
    padding: 0;
    border: none;
    background-color: transparent;
`;

const StyledFeedIcon = styled(FeedIcon)``;
const StyledHeartIcon = styled(HeartIcon)``;
const StyledRestIcon = styled(RestIcon)``;
const StyledWashIcon = styled(WashIcon)``;
const StyledHiddenIcon = styled(HiddenIcon)``;

export {
    NavWrap,
    StyledFeedIcon,
    StyledHeartIcon,
    StyledRestIcon,
    StyledWashIcon,
    StyledHiddenIcon,
    ButtonStyled
};
