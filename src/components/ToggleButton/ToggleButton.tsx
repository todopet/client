import { FC, SyntheticEvent, useState } from "react";
import { ToggleDiv, ToggleWrapper, Switch } from "./ToggleButton.styles";

interface ToggleButtonProps {
    onToggle?: (isToggled: boolean) => void;
    active?: boolean;
}

const ToggleButton: FC<ToggleButtonProps> = ({ onToggle }) => {
    const [isToggled, setIsToggled] = useState(false);

    const handleChangeToggle = (e:SyntheticEvent) => {
        const newToggled = !isToggled;
        setIsToggled(newToggled);
        onToggle?.(newToggled); // 콜백프롭스 형식으로 자식의 상태 변경을 부모에게 알림
    }

    return (
        <ToggleDiv>
            <ToggleWrapper active={isToggled} onClick={handleChangeToggle}>
                <Switch active={isToggled}>{isToggled ? "월" : "주"}</Switch>
            </ToggleWrapper>
        </ToggleDiv>
    );
}

export default ToggleButton;
