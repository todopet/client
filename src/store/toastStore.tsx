import { create } from "zustand";

export interface ToastState {
    toast: React.ReactNode | null;
    isShow: boolean;
    showToast: <P extends object>(
        Component: React.ComponentType<P>,
        props: P,
        duration?: number
    ) => void;
    closeToast: () => void;
    timer: ReturnType<typeof setTimeout> | null;
}

const useToastsStore = create<ToastState>((set, get) => ({
    toast: null,
    isShow: false,
    timer: null,
    showToast: (Component, props, duration = 5500) => {
        const { timer } = get();
        if (timer) {
            clearTimeout(timer);
        }

        set({
            toast: <Component {...props} />,
            isShow: true,
            timer: null
        });

        const newTimer = setTimeout(() => {
            set({ toast: null, isShow: false, timer: null });
        }, duration);

        set({ timer: newTimer });
    },
    closeToast: () => {
        const { timer } = get();
        if (timer) {
            clearTimeout(timer);
        }
        set({ toast: null, isShow: false, timer: null });
    }
}));
export default useToastsStore;
