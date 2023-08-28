import {
    createContext,
    useState
} from "react";

import axiosRequest from "@/api/index";
import { res, todo, todoCategory } from "@/@types/index";

//context로 관리할 객체 타입
export interface TodoContextProps {
    periodTodos?: todoCategory[];
    updateSelectedDate: (selected: string) => void;
    dateTodos?: todoCategory[];
    selectedDate: string;
    getTodos: (startDate: string, endDate: string) => void;
    updateStatus: (
        contentId: string,
        checkStatus: string,
        content: string
    ) => void;
    reward: string;
    isActiveToast: boolean;
}

//context 생성
export const TodoContext = createContext<TodoContextProps>({
    getTodos: () => {},
    periodTodos: [],
    updateSelectedDate: () => {},
    selectedDate: "",
    dateTodos: [],
    updateStatus: (
        contentId: string,
        checkStatus: string,
        content: string
    ) => {},
    reward: "",
    isActiveToast: false
});

interface TodoContextProviderProps {
    children: React.ReactNode;
}
export default function TodoContextProvider({
    children
}: TodoContextProviderProps) {
    const [periodTodos, setPeriodTodos] = useState<todoCategory[]>();

    const [dateTodos, setDateTodos] = useState<todoCategory[]>();

    const today = new Date();

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };
    
    const [selectedDate, setSelectedDate] = useState(formatDate(today));

    const updateSelectedDate = (selected: string) => {
        setSelectedDate(selected);
    };

    //기간별 투두 불러오기
    async function getTodos(startDate: string, endDate: string) {
        try {
            const response: res<todoCategory[]> =
                await axiosRequest.requestAxios<res<todoCategory[]>>(
                    "get",
                    `/todoContents?start=${startDate}&end=${endDate}`
                );
            if (startDate === endDate) setDateTodos(response.data);
            else setPeriodTodos(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const [reward, setReward] = useState<string>("");
    const [isActiveToast, setIsActiveToast] = useState<boolean>(false);

    //투두 체크시 상태 변경(unchecked->completed, completed->reverted, reverted->completed)
    async function updateStatus(
        contentId: string,
        content: string,
        checkStatus: string
    ) {
        try {
            const response: res<todo> = await axiosRequest.requestAxios<
                res<todo>
            >("patch", `/todoContents/${contentId}`, {
                contentId: contentId,
                todo: content,
                status: checkStatus
            });
            console.log("체크!", response.data.message);
            setIsActiveToast(true);
            setTimeout(() => {
                setIsActiveToast(false);
            }, 5500);
            setReward(response.data.message?.reward || "");
        } catch (error) {
            console.error(error);
        }
    }

    const contextValue: TodoContextProps = {
        getTodos,
        periodTodos,
        dateTodos,
        updateSelectedDate,
        selectedDate,
        updateStatus,
        reward,
        isActiveToast
    };

    return (
        <TodoContext.Provider value={contextValue}>
            {children}
        </TodoContext.Provider>
    );
}
