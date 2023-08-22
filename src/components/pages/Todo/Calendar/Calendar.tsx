import { createContext, FC, useContext, useState } from "react";
import Week from "./Week/Week";
import Month from "./Month/Month";
import { CalendarStyles } from "./Calendar.styles";
// import ToggleButton from '@/components/ToggleButton/ToggleButton';
import {
    Switch,
    ToggleWrapper
} from "@/components/ToggleButton/ToggleButton.styles";

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

// const CalendarDateCell = () => {
//     const { mode } = useContext(CalendarContext);
//     return (
//         <div style={{ padding: "10px", border: "1px solid black" }}>
//             CalendarDateCell: {mode}
//         </div>
//     );
// };

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
    const [isToggled, setIsToggled] = useState(false);

    const contextValue = {
        mode
    };

    // const handleToggle = useCallback(
    //     (isToggled: boolean) => setMode(isToggled ? "month" : "week"),
    //     []
    // );

    return (
        <CalendarContext.Provider value={contextValue}>
            <CalendarStyles>
                <ToggleWrapper
                    active={isToggled}
                    onClick={() => {
                        setIsToggled(!isToggled)
                        setMode(isToggled ? "week" : "month")
                    }}
                >
                    <Switch active={isToggled}>
                        {isToggled ? "월" : "주"}
                    </Switch>
                </ToggleWrapper>
                {/* <ToggleButton props={isToggled} toggleFunction={handleToggle} /> */}
                <CalendarBody mode={mode}></CalendarBody>
            </CalendarStyles>
        </CalendarContext.Provider>
    );
};
export default Calendar;
