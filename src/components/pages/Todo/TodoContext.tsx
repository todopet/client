import { createContext, useState } from "react";

import axiosRequest from "@/api/index";
import { res, todo, todoCategory } from "@/@types/index";
import { Message, ToastTypes } from "@/@types/todo";

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
    message: Message | null;
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
    message: { reward: null, type: ToastTypes.NORMAL, inventoryCount: 0 },
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

    const [message, setMessage] = useState<Message | null>({
        type: ToastTypes.NORMAL,
        reward: null,
        inventoryCount: 0
    });

    const [isActiveToast, setIsActiveToast] = useState<boolean>(false);
    //
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
            }
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
        message,
        isActiveToast
    };

    return (
        <TodoContext.Provider value={contextValue}>
            {children}
        </TodoContext.Provider>
    );
}
