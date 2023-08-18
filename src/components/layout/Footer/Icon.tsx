import React from "react";
import styled from "styled-components";

const StyledIcon = styled.div<{ src: string }>`
    width: 26px;
    height: 26px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(${(props) => props.src});
`;

interface IconProps {
    src: string;
}

const Icon: React.FC<IconProps> = ({ src }) => {
    return <StyledIcon src={src} />;
};

export default Icon;
