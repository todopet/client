import ReactDom from "react-dom";
import useToastsStore from "@/store/toastStore";

export const Toast = () => {
    const { toast, isShow } = useToastsStore();

    if (!toast) return null;
    const { Component, props } = toast;
    const portalTarget = document.getElementsByClassName("toast-wrapper")[0];

    if (!portalTarget) return null;

    return ReactDom.createPortal(
        <div>{isShow && <Component {...props} />}</div>,
        portalTarget
    );
};
