import Button from "@/components/Button/Button";
import styled from "styled-components";

import { ReactComponent as TrashIcon } from "@/assets/images/trash.svg";

export default function ThrowBtn() {
    return (
        <ButtonStyled>
            <TrashIcon />
        </ButtonStyled>
    );
}
const ButtonStyled = styled(Button)`
    padding: 0;
`;
