import styled from "styled-components";
import Button from "@/components/Button/Button";

const ArrowButtonStyle = styled(Button)`
    width: 30px;
    height: 14px;
    background-image: url($props=>props.url);
    background-repeat: no-repeat;
    background-position: center;
    background-color: transparent;
    border: none;
`;

export default ArrowButtonStyle;