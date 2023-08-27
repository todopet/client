import {
    createContext,
    FC,
    ReactNode,
    useCallback,
    useEffect,
    useState
} from "react";

import axiosRequest from "@/api/index";
import { res, todo, todoCategory } from "@/@types/index";

//context로 관리할 객체 타입
export interface TodoContextProps {
    // mode: "week" | "month";
    // periodTodos?: todoCategory[];
    // dateTodos?: todoCategory[];
    getTodos: () => void;
    dateTodos?: todoCategory[];
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
    // mode: "week",
    // periodTodos: [],
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
    const [dateTodos, setDateTodos] = useState<todoCategory[]>();

    //기간별 투두 불러오기
    async function getTodos() {
        const startDate = "2023-08-27"; //캘린더에서 정해진 날짜로 적용예정
        const endDate = "2023-08-27"; //캘린더에서 정해진 날짜로 적용예정
        try {
            const response: res<todoCategory[]> =
                await axiosRequest.requestAxios<res<todoCategory[]>>(
                    "get",
                    `/todoContents?start=${startDate}&end=${endDate}`
                );
            // console.log("categories", response);
            setDateTodos(response.data);
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
        // mode,
        // periodTodos,
        getTodos,
        dateTodos,
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
