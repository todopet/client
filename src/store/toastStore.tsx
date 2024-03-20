import { create } from "zustand";
import { Message } from "@/@types/todo";

interface MiniPetToastProps {
    message?: Message;
}
interface Toast {
    Component: React.ComponentType<MiniPetToastProps>;
    props: { message?: Message };
}
export interface ToastState {
    toast: Toast | null;
    isShow: boolean;
    showToast: (Component: any, props: {}) => void;
    closeToast: () => void;
    timer: NodeJS.Timeout | null;
}

const useToastsStore = create<ToastState>((set) => ({
    toast: null,
    isShow: false,
    timer: null,
    showToast: (Component, props) => {
        set({
            toast: {
                Component,
                props
            },
            isShow: true,
            timer: setTimeout(() => {
                const { closeToast } = useToastsStore.getState();
                closeToast();
            }, 5500)
        });
    },
    closeToast: () => {
        set({ toast: null, isShow: false });
        const { timer } = useToastsStore.getState();
        timer && clearTimeout(timer);
    }
}));
export default useToastsStore;
