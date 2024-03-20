import ReactDom from "react-dom";
import useToastsStore from "../../store/toastStore";

const Toast = () => {
    const { toast, isShow } = useToastsStore();

    if (!toast) return null;
    const { Component, props } = toast;

    return ReactDom.createPortal(
        <div>{isShow && <Component {...props} />}</div>,
        document.getElementsByClassName("toast-wrapper")[0]
    );
};

export default Toast;
