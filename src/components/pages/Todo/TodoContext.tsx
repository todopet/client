import { createContext, useState } from "react";
import axiosRequest from "@/api/index";
import { res, todo, todoCategory } from "@/@types/index";
import { Message, ToastTypes } from "@/@types/todo";

// Context로 관리할 요소들의 타입 설정
export interface TodoContextProps {
    selectedDate: string;
    startDate: string;
    endDate: string;
    dateTodos?: todoCategory[];
    periodTodos?: todoCategory[];
    setPeriodTodos: React.Dispatch<
        React.SetStateAction<todoCategory[] | undefined>
    >;
    getTodos: (startDate: string, endDate: string) => void;
    updateSelectedDate: (selected: string) => void;
    updateStartEnd: (startDate: string, endDate: string) => void;
    updateStatus: (
        contentId: string,
        checkStatus: string,
        content: string
    ) => void;
    message: Message | null;
    isActiveToast: boolean;
}

// Context 생성
export const TodoContext = createContext<TodoContextProps>({
    selectedDate: "",
    startDate: "",
    endDate: "",
    dateTodos: [],
    periodTodos: [],
    setPeriodTodos: () => {},
    getTodos: () => {},
    updateSelectedDate: () => {},
    updateStartEnd: () => {},
    updateStatus: (
        contentId: string,
        checkStatus: string,
        content: string
    ) => {},
    message: { reward: null, type: ToastTypes.NORMAL, inventoryCount: 0 },
    isActiveToast: false
});

interface TodoContextProviderProps {
    children: React.ReactNode;
}
export default function TodoContextProvider({
    children
}: TodoContextProviderProps) {
    const [dateTodos, setDateTodos] = useState<todoCategory[]>();
    const [periodTodos, setPeriodTodos] = useState<todoCategory[]>();

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

    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const updateStartEnd = (start: string, end: string) => {
        setStartDate(start);
        setEndDate(end);
    };

    //기간별 투두 불러오기
    async function getTodos(startDate: string, endDate: string) {
        try {
            const response: res<todoCategory[]> =
                await axiosRequest.requestAxios<res<todoCategory[]>>(
                    "get",
                    `/todoContents?start=${startDate}&end=${endDate}`
                );
            if (startDate === endDate) {
                setDateTodos(response.data);
            } else {
                setPeriodTodos(response.data);
            }
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    const [message, setMessage] = useState<Message | null>({
        type: ToastTypes.NORMAL,
        reward: null,
        inventoryCount: 0
    });

    const [isActiveToast, setIsActiveToast] = useState<boolean>(false);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    //투두 체크시 상태 변경(unchecked->completed, completed->reverted, reverted->completed)
    async function updateStatus(
        contentId: string,
        content: string,
        checkStatus: string
    ) {
        try {
            if (checkStatus === "completed") {
                //이전 토스트를 꺼줍니다.
                setIsActiveToast(false);
                if (timer) {
                    // 이전 타이머가 있으면 취소합니다.
                    clearTimeout(timer);
                }
                const response: res<todo> = await axiosRequest.requestAxios<
                    res<todo>
                >(
                    "patch",
                    `/todoContents/${contentId}`,
                    {
                        contentId: contentId,
                        todo: content,
                        status: checkStatus
                    },
                    { "x-custom-data": Date.now() * 4 + 1000 }
                );

                setMessage(response.data.message);
                setIsActiveToast(true);

                // 새로운 타이머를 설정합니다.
                setTimer(
                    setTimeout(() => {
                        setIsActiveToast(false);
                    }, 5500)
                );
                getTodos(startDate, endDate);
            } else {
                const response: res<todo> = await axiosRequest.requestAxios<
                    res<todo>
                >(
                    "patch",
                    `/todoContents/${contentId}`,
                    {
                        contentId: contentId,
                        todo: content,
                        status: checkStatus
                    },
                    { "x-custom-data": Date.now() * 4 + 1000 }
                );
                getTodos(startDate, endDate);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const contextValue: TodoContextProps = {
        selectedDate,
        startDate: "",
        endDate: "",
        dateTodos,
        periodTodos,
        setPeriodTodos,
        getTodos,
        updateSelectedDate,
        updateStartEnd,
        updateStatus,
        message,
        isActiveToast
    };

    return (
        <TodoContext.Provider value={contextValue}>
            {children}
        </TodoContext.Provider>
    );
}
