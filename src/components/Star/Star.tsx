import React from "react";
import styled from "styled-components";
import { ReactComponent as StarIcon } from "@/assets/images/star.svg";

const fullColor = "#FFE210";
const emptyColor = "#F2F2F2";

interface StarProps {
    status: "full" | "empty";
}

function Star({ status }: StarProps) {
    return <StyledStarIcon status={status} />;
}

const StyledStarIcon = styled(StarIcon)<StarProps>`
    fill: ${(props) => (props.status === "full" ? fullColor : emptyColor)};
`;
export default Star;
