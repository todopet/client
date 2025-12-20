import { create } from "zustand";
import { res, todo, todoCategory } from "@/@types";
import { axiosRequest } from "@/api";
import { Message, ToastTypes } from "@/@types/todo";
import { formatDateToString } from "@/libs/utils/global";
import useToastsStore from "@/store/toastStore";
import { MiniPetToast } from "@/components/pages/Todo/MiniPet/Toast/MiniPetToast";

const today = new Date();

export interface Todos {
    selectedDate: string;
    startDate: string;
    endDate: string;
    dateTodos?: todoCategory[];
    periodTodos?: todoCategory[];
    message: Message;
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

export const useTodosStore = create<Todos>((set) => ({
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
                const { closeToast, showToast } = useToastsStore.getState();
                //이전 토스트를 꺼줍니다.
                closeToast();

                const response: res<todo> = await axiosRequest.requestAxios<
                    res<todo>
                >(
                    "patch",
                    `todoContents/${contentId}?_=${Date.now()}`,
                    {
                        todo: content,
                        status: checkStatus,
                        date: date
                    }
                );

                showToast(MiniPetToast, {
                    message: response.data.message
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
                    `todoContents/${contentId}?_=${Date.now()}`,
                    {
                        todo: content,
                        status: checkStatus,
                        date: date
                    }
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