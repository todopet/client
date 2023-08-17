import { ReactComponent as TrashIcon } from "@/assets/images/trash.svg";

import { ButtonStyled } from "./ThrowBtn.styles";

export default function ThrowBtn() {
    return (
        <ButtonStyled>
            <TrashIcon />
        </ButtonStyled>
    );
}
