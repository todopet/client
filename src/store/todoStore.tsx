import { create } from "zustand";
import { ApiResponse, Todo, TodoCategory, TodoStatus, ToastType } from "@/@types";
import { axiosRequest } from "@/api";
import { API_ENDPOINTS } from "@/api/endpoints";
import { Message } from "@/@types/todo";
import { formatDateToString } from "@/libs/utils/global";
import { notifyApiError } from "@/libs/utils/notifyApiError";

const today = new Date();

export interface Todos {
    selectedDate: string;
    startDate: string;
    endDate: string;
    dateTodos?: TodoCategory[];
    periodTodos?: TodoCategory[];
    message: Message;
    isActiveToast: boolean;
    timer: NodeJS.Timeout | null;
    setSelectedDate: (date: string) => void;
    setStartEndDate: (start: string, end: string) => void;
    setTodos: (startDate: string, endDate: string) => Promise<TodoCategory[] | undefined>;
    deleteTodo: (contentId: string) => Promise<void>;
    setStatus: (
        contentId: string,
        content: string,
        checkStatus: TodoStatus,
        date: string
    ) => Promise<Message | null | undefined>;
}

const initialState = {
    selectedDate: formatDateToString(today),
    startDate: "",
    endDate: "",
    dateTodos: [],
    periodTodos: [],
    message: {
        type: ToastType.NORMAL,
        reward: null,
        inventoryCount: 0
    },
    isActiveToast: false,
    timer: null
};

export const useTodosStore = create<Todos>((set, get) => {
    const refreshTodos = async () => {
        const { selectedDate, startDate, endDate, setTodos } = get();
        const hasPeriodRange = Boolean(startDate && endDate);
        const isSameRange = selectedDate === startDate && selectedDate === endDate;

        if (!hasPeriodRange || isSameRange) {
            await setTodos(selectedDate, selectedDate);
            return;
        }

        await Promise.all([
            setTodos(selectedDate, selectedDate),
            setTodos(startDate, endDate)
        ]);
    };

    return {
        ...initialState,
        setSelectedDate: (date) => set({ selectedDate: date }),
        setStartEndDate: (start, end) => {
            set({ startDate: start, endDate: end });
        },
        setTodos: async (startDate, endDate) => {
            try {
                const response: ApiResponse<TodoCategory[]> =
                    await axiosRequest.requestAxios<ApiResponse<TodoCategory[]>>(
                        "get",
                        API_ENDPOINTS.TODO.CONTENTS_BY_DATE(startDate, endDate)
                    );
                if (startDate === endDate) {
                    set({ dateTodos: response.data });
                } else {
                    set({ periodTodos: response.data });
                }
                return response.data;
            } catch (error) {
                notifyApiError(
                    error,
                    "데이터를 가져오던 중 오류가 발생했습니다. 다시 시도해주세요."
                );
            }
        },
        deleteTodo: async (contentId) => {
            try {
                await axiosRequest.requestAxios<ApiResponse<Todo[]>>(
                    "delete",
                    API_ENDPOINTS.TODO.CONTENT(contentId)
                );
                await refreshTodos();
            } catch (error) {
                notifyApiError(
                    error,
                    "데이터를 가져오던 중 오류가 발생했습니다. 다시 시도해주세요."
                );
            }
        },

        setStatus: async (
            contentId: string,
            content: string,
            checkStatus: TodoStatus,
            date: string
        ) => {
            try {
                const response: ApiResponse<Todo> = await axiosRequest.requestAxios<
                    ApiResponse<Todo>
                >(
                    "patch",
                    API_ENDPOINTS.TODO.CONTENT_WITH_CACHE_BUSTER(contentId),
                    {
                        todo: content,
                        status: checkStatus,
                        date: date
                    }
                );

                await refreshTodos();

                return response.data.message;
            } catch (error) {
                notifyApiError(
                    error,
                    "데이터를 가져오던 중 오류가 발생했습니다. 다시 시도해주세요."
                );
            }
        }
    };
});
