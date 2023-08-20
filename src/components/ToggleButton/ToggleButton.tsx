import { FC, useState } from "react";
import { ToggleWrapper, Switch } from "./ToggleButton.styles";

// interface PropsData {
//     props: boolean;
//     toggleFunction: Function;
// }

interface ToggleButtonProps {
    onToggle: (isToggled: boolean) => void;
}

const ToggleButton: FC<ToggleButtonProps> = ({ onToggle }) => {
    const [isToggled, setIsToggled] = useState(false);

    return (
        <ToggleWrapper
            active={isToggled}
            onClick={() => setIsToggled(!isToggled)}
        >
            <Switch active={isToggled}>{isToggled ? "월" : "주"}</Switch>
        </ToggleWrapper>
    );
}

export default ToggleButton;
