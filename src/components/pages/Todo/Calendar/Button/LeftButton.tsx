import styled from "styled-components";
import Button from "@/components/Button/Button";
import { ReactComponent as LeftSvg } from "@/assets/images/LeftButton.svg";

const LeftButtonStyle = styled(Button)`
    width: 7px;
    height: 14px;
    background-color: transparent;
    border: none;
`;

export default function LeftButton() {
    return (
        <LeftButtonStyle>
            <LeftSvg />
        </LeftButtonStyle>
    );
}
