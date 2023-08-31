import styled from "styled-components";
import CircleButton from "@/components/CircleButton/CircleButton";

const ButtonStyled = styled(CircleButton)`
    width: 62px;
    height: 62px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
        & > path {
            fill: ${(props) =>
                props.modaltype === "useModal" ? "#2dc770" : "#adadad"};
        }
    }

    &:hover {
        opacity: ${props => props.iscountpositivenum ? .7 : false};
    }
`;

export { ButtonStyled };
