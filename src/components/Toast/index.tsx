import ReactDom from "react-dom";
import useToastsStore from "@/store/toastStore";

export const Toast = () => {
    const toast = useToastsStore((state) => state.toast);
    const isShow = useToastsStore((state) => state.isShow);

    if (!toast || !isShow) return null;
    const portalTarget = document.getElementsByClassName("toast-wrapper")[0];

    if (!portalTarget) return null;

    return ReactDom.createPortal(
        <div>{toast}</div>,
        portalTarget
    );
};
