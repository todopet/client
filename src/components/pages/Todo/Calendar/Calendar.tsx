import { createContext, FC, useCallback, useEffect, useState } from "react";
import Week from "@/components/pages/Todo/Calendar/Week/Week";
import Month from "./Month/Month";
import { CalendarStyles } from "./Calendar.styles";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import axiosRequest from "@/api/index";
import { res, category } from "@/@types/index";
import TodoList from "../TodoList/TodoList";
// import TodoList from "@/components/pages/Todo/Calendar/TodoList/TodoList";

export interface CalendarProps {
    defaultMode?: "week" | "month";
}

export interface CalendarContextProps {
    mode: "week" | "month";
    periodTodos?: category[];
    dateTodos?: category[];
    getAllTodos: (startDate: string, endDate: string) => void;
    // setStartDate: React.SetStateAction<string>;
    // setEndDate: React.SetStateAction<string>;
    updateDate: (start: string, end: string) => void;
    // setSeletedDate: React.SetStateAction<string>;
}

interface CalendarBodyProps {
    mode?: CalendarProps["defaultMode"];
    // onSendDate: (startDate: string, endDate: string) => void;
    // children: JSX.Element;
}

export const CalendarContext = createContext<any>({
    mode: "week",
    periodTodos: [],
    dateTodos: [],
    getAllTodos: () => {},
    updateDate: () => {},
    // setStartDate: () => "",
    // setEndDate: () => "",
    // setSeletedDate: () => "",
});

const CalendarBody: FC<CalendarBodyProps> = ({ mode }) => {
    return (
        <>
            {mode === "week" && <Week />}
            {mode === "month" && <Month />}
            <TodoList />
        </>
    );
};

const Calendar: FC<CalendarProps> = (props) => {
    const { defaultMode = "week" } = props;
    const [mode, setMode] = useState(defaultMode);
    const [periodTodos, setPeriodTodos] = useState<category[]>(); // 잔디 칠하기 위한 response
    const [dateTodos, setDateTodos] = useState<category[]>();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [seletedDate, setSeletedDate] = useState("");

    // const handleReceiveDate = (startDate: string, endDate: string) => {
    //     console.log(startDate, endDate);
    // };

    async function getAllTodos(startDate: string, endDate: string) {
        try {
            const response = await axiosRequest.requestAxios<res<category[]>>(
                "get",
                `/todoContents?start=${startDate}&end=${endDate}`
            );
            console.log("response: ", response);
            setPeriodTodos(response.data);
        } catch (error) {
            console.error("error: ", error);
        }
    }

    useEffect(() => {
        getAllTodos(startDate, endDate);
    }, [startDate, endDate]);

    const updateDate = (start: string, end: string) => {
        setStartDate(start);
        setEndDate(end);
        console.log("startDate: ",startDate);
        console.log("endDate: ",endDate);
    };

    const contextValue = {
        mode,
        periodTodos,
        dateTodos,
        getAllTodos,
        updateDate
        // setStartDate,
        // setEndDate,
        // setSeletedDate
    };

    const handleToggle = useCallback(
        (isToggled: boolean) => setMode(isToggled ? "month" : "week"), // newToggle이 isToggled로 들어옴
        []
    );

    return (
        // <CalendarContext.Provider value={contextValue}>
        <CalendarContext.Provider value={ updateDate }>
            <CalendarStyles>
                <ToggleButton onToggle={handleToggle} />
                <CalendarBody mode={mode} />
            </CalendarStyles>
        </CalendarContext.Provider>
    );
};
export default Calendar;
