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
    getAllTodos: (startDate: string, endDate: string) => void;

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
    getAllTodos: (startDate: string, endDate: string) => {},
    // mode: "week",
    // periodTodos: [],
    // dateTodos: [],
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
    //기간별 투두목록 불러오기
    async function getAllTodos(startDate: string, endDate: string) {
        try {
            const response = await axiosRequest.requestAxios<
                res<todoCategory[]>
            >("get", `/todoContents?start=${startDate}&end=${endDate}`);
            // setPeriodTodos(response.data);
        } catch (error) {
            console.error("error: ", error);
        }
    }

    const [reward, setReward] = useState<string>("");
    const [isActiveToast, setIsActiveToast] = useState<boolean>(false);
    //투두 체크시 patch요청(unchecked->completed, completed->reverted, reverted->completed)
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
            // console.log("체크!", response.data.message);
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
        // dateTodos,
        getAllTodos,
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
