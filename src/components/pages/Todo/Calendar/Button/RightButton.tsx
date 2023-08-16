import styled from "styled-components";
import Button from "@/components/Button/Button";
import { ReactComponent as RightSvg } from "@/assets/images/RightButton.svg";

const RightButtonStyle = styled(Button)`
    width: 7px;
    height: 14px;
    background-color: transparent;
    border: none;
`;

export default function LeftButton() {
    return (
        <RightButtonStyle>
            <RightSvg />
        </RightButtonStyle>
    );
}
