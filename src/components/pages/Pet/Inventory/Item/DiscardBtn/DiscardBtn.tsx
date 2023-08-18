import { ReactComponent as DiscardIcon } from "@/assets/images/trash.svg";

import { ButtonStyled } from "./DiscardBtn.styles";

export default function ThrowBtn() {
    return (
        <ButtonStyled>
            <DiscardIcon />
        </ButtonStyled>
    );
}
