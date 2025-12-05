import { FC, useCallback, useState } from "react";
import { Week } from "@/components/pages/Todo/Calendar/Week/Week";
import { Month } from "./Month/Month";
import { CalendarStyles } from "./Calendar.styles";
import { ToggleButton } from "@/components/ToggleButton/ToggleButton";

export interface CalendarProps {
    defaultMode?: "week" | "month";
}

interface CalendarBodyProps {
    mode?: CalendarProps["defaultMode"];
}

const CalendarBody: FC<CalendarBodyProps> = ({ mode }) => {
    return (
        <>
            {mode === "week" && <Week />}
            {mode === "month" && <Month />}
        </>
    );
};

export const Calendar: FC<CalendarProps> = (props) => {
    const { defaultMode = "week" } = props;
    const [mode, setMode] = useState(defaultMode);

    const handleToggle = useCallback(
        (isToggled: boolean) => setMode(isToggled ? "month" : "week"), // newToggle이 isToggled로 들어옴
        []
    );

    return (
        <CalendarStyles>
            <ToggleButton onToggle={handleToggle} />
            <CalendarBody mode={mode} />
        </CalendarStyles>
    );
};