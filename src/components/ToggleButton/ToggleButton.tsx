import React, { useState } from "react";
import { ToggleWrapper, Switch } from "./ToggleButton.styles";

function ToggleButton() {
    const [isToggled, setIsToggled] = useState(false);

    return (
        <ToggleWrapper
            active={isToggled}
            onClick={() => setIsToggled(!isToggled)}
        >
            <Switch>{isToggled ? "주" : "월"}</Switch>
        </ToggleWrapper>
    );
}

export default ToggleButton;
