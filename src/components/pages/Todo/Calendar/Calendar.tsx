import { createContext, FC, useCallback, useContext, useState } from "react";
import Week from "./Week/Week";
import Month from "./Month/Month";
import { CalendarStyles } from "./Calendar.styles";
import ToggleButton from '@/components/ToggleButton/ToggleButton';

export interface CalendarProps {
    defaultMode?: "week" | "month";
}

export interface CalendarContextProps {
    mode: "week" | "month";
}
export const CalendarContext = createContext<CalendarContextProps>({
    mode: "week"
});

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

const Calendar: FC<CalendarProps> = (props) => {
    const { defaultMode = "week" } = props;
    const [mode, setMode] = useState(defaultMode);
    // const [isToggled, setIsToggled] = useState(false);

    const contextValue = {
        mode
    };

    const handleToggle = useCallback(
        (isToggled: boolean) => setMode(isToggled ? "month" : "week"), // newToggle이 isToggled로 들어옴
        []
    );

    return (
        <CalendarContext.Provider value={contextValue}>
            <CalendarStyles>
                <ToggleButton onToggle={handleToggle} />
                <CalendarBody mode={mode}></CalendarBody>
            </CalendarStyles>
        </CalendarContext.Provider>
    );
};
export default Calendar;
