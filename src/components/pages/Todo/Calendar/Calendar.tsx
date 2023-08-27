/*
기존에 Calendar.tsx에서 Context를 작성하였으나,
src/libs/hooks/useTodoContext.tsx에서 새롭게 작성 중입니다.

아직 반영이 안 되어 Context가 중복되어 있습니다
양해 부탁 드립니다
*/

import { createContext, FC, useCallback, useEffect, useState } from "react";
import Week from "@/components/pages/Todo/Calendar/Week/Week";
import Month from "./Month/Month";
import { CalendarStyles } from "./Calendar.styles";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import axiosRequest from "@/api/index";
import { res, category } from "@/@types/index";

export interface CalendarProps {
    defaultMode?: "week" | "month";
}

export interface CalendarContextProps {
    mode: "week" | "month";
    periodTodos?: category[];
    dateTodos?: category[];
    getAllTodos: (startDate: string, endDate: string) => void;
    updateDate: (start: string, end: string) => void;
    updateSelectedDate: (selected: string) => void;
}

interface CalendarBodyProps {
    mode?: CalendarProps["defaultMode"];
}

export const CalendarContext = createContext<any>({
    mode: "week",
    periodTodos: [],
    dateTodos: [],
    getAllTodos: () => {},
    updateDate: () => {},
    updateSelectedDate: () => {},
});

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

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [periodTodos, setPeriodTodos] = useState<category[]>();

    const [selectedDate, setSelectedDate] = useState("");
    const [dateTodos, setDateTodos] = useState<category[]>();

    async function getAllTodos(startDate: string, endDate: string) {
        try {
            const response = await axiosRequest.requestAxios<res<category[]>>(
                "get",
                `/todoContents?start=${startDate}&end=${endDate}`
            );
            setPeriodTodos(response.data);
            console.log("Calendar periodTodos: ", periodTodos);
        } catch (error) {
            console.error("error: ", error);
        }
    }

    async function getDateTodos(selectedDate: string) {
        try {
            const response = await axiosRequest.requestAxios<res<category[]>>(
                "get",
                `/todoContents?start=${selectedDate}&end=${selectedDate}`
            );
            setDateTodos(response.data);
            console.log("Calendar periodTodos: ", periodTodos);
        } catch (error) {
            console.error("error: ", error);
        }
    }

    useEffect(() => {
        getAllTodos(startDate, endDate);
        getDateTodos(selectedDate);
    }, [startDate, endDate, selectedDate]);

    const updateDate = (start: string, end: string) => {
        setStartDate(start);
        setEndDate(end);
    };

    const updateSelectedDate = (selected: string) => {
        setSelectedDate(selected);
    };

    const contextValue: CalendarContextProps = {
        mode: mode,
        periodTodos,
        dateTodos,
        getAllTodos,
        updateDate,
        updateSelectedDate,
    };

    const handleToggle = useCallback(
        (isToggled: boolean) => setMode(isToggled ? "month" : "week"), // newToggle이 isToggled로 들어옴
        []
    );

    return (
        <CalendarContext.Provider value={contextValue}>
            <CalendarStyles>
                <ToggleButton onToggle={handleToggle} />
                <CalendarBody mode={mode} />
            </CalendarStyles>
        </CalendarContext.Provider>
    );
};

export default Calendar;
