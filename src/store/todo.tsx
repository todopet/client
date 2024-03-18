import { create } from "zustand";
import { res, todo, todoCategory } from "@/@types/index";
import axiosRequest from "@/api/index";
import { Message, ToastTypes } from "@/@types/todo";
import { formatDateToString } from "@/libs/utils/global";

const today = new Date();

export interface Todos {
    selectedDate: string;
    startDate: string;
    endDate: string;
    dateTodos?: todoCategory[];
    periodTodos?: todoCategory[];
    message: Message | null;
    isActiveToast: boolean;
    timer: NodeJS.Timeout | null;
    setSelectedDate: (date: string) => void;
    setStartEndDate: (start: string, end: string) => void;
    setTodos: (startDate: string, endDate: string) => void;
    deleteTodo: (contentId: string) => void;
    setStatus: (
        contentId: string,
        content: string,
        checkStatus: string,
        date: string
    ) => void;
}

const initialState = {
    selectedDate: formatDateToString(today),
    startDate: "",
    endDate: "",
    dateTodos: [],
    periodTodos: [],
    message: {
        type: ToastTypes.NORMAL,
        reward: null,
        inventoryCount: 0
    },
    isActiveToast: false,
    timer: null
};
const useTodosStore = create<Todos>((set) => ({
    ...initialState,
    setSelectedDate: (date) => set({ selectedDate: date }),
    setStartEndDate: (start, end) => {
        set({ startDate: start });
        set({ endDate: end });
    },
    setTodos: async (startDate, endDate) => {
        try {
            const response: res<todoCategory[]> =
                await axiosRequest.requestAxios<res<todoCategory[]>>(
                    "get",
                    `todoContents?start=${startDate}&end=${endDate}`
                );
            if (startDate === endDate) {
                set({ dateTodos: response.data });
            } else {
                set({ periodTodos: response.data });
            }
            return response.data;
        } catch (error) {
            console.error(error);
            alert(
                "데이터를 가져오던 중 오류가 발생했습니다. 다시 시도해주세요."
            );
        }
    },
    deleteTodo: async (contentId) => {
        try {
            const response: res<todo[]> = await axiosRequest.requestAxios<
                res<todo[]>
            >("delete", `todoContents/${contentId}`);
            const { selectedDate, startDate, endDate } =
                useTodosStore.getState();
            useTodosStore.getState().setTodos(selectedDate, selectedDate);
            useTodosStore.getState().setTodos(startDate, endDate);
        } catch (error) {
            console.error(error);
            alert(
                "데이터를 가져오던 중 오류가 발생했습니다. 다시 시도해주세요."
            );
        }
    },

    setStatus: async (
        contentId: string,
        content: string,
        checkStatus: string,
        date: string
    ) => {
        try {
            if (checkStatus === "completed") {
                //이전 토스트를 꺼줍니다.
                set({ isActiveToast: false });
                const { timer } = useTodosStore.getState();
                if (timer) {
                    // 이전 타이머가 있으면 취소합니다.
                    clearTimeout(timer);
                }
                const response: res<todo> = await axiosRequest.requestAxios<
                    res<todo>
                >(
                    "patch",
                    `todoContents/${contentId}`,
                    {
                        todo: content,
                        status: checkStatus,
                        date: date
                    },
                    { "x-custom-data": Date.now() * 4 + 1000 }
                );

                set({ message: response.data.message || null });
                set({ isActiveToast: true });

                // 새로운 타이머를 설정합니다.
                set({
                    timer: setTimeout(() => {
                        set({ isActiveToast: false });
                    }, 5500)
                });

                const { selectedDate, startDate, endDate } =
                    useTodosStore.getState();
                useTodosStore.getState().setTodos(selectedDate, selectedDate);
                useTodosStore.getState().setTodos(startDate, endDate);
            } else {
                const response: res<todo> = await axiosRequest.requestAxios<
                    res<todo>
                >(
                    "patch",
                    `todoContents/${contentId}`,
                    {
                        todo: content,
                        status: checkStatus,
                        date: date
                    },
                    { "x-custom-data": Date.now() * 4 + 1000 }
                );
                const { selectedDate, startDate, endDate } =
                    useTodosStore.getState();
                useTodosStore.getState().setTodos(selectedDate, selectedDate);
                useTodosStore.getState().setTodos(startDate, endDate);
            }
        } catch (error) {
            console.error(error);
            alert(
                "데이터를 가져오던 중 오류가 발생했습니다. 다시 시도해주세요."
            );
        }
    }
}));
export default useTodosStore;
