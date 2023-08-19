import React, { useEffect } from "react";

import { Snackbar1, Snackbar2 } from "./Toast.styles";

// interface ToastProps {
//     message: string;
//     isActive: boolean;
//     setIsActive: (a: boolean) => void;
// }
// const Toast: React.FC<ToastProps> = ({ message, isActive, setIsActive }) => {
const Toast: React.FC = () => {
    useEffect(() => {});
    return (
        <>
            <Snackbar1>
                특별한 보상으로
                <br />
                '고급사료'(을)를 받았습니다!!!
            </Snackbar1>
            <Snackbar2>
                할 일을 완료하여
                <br />
                '사료'(을)를 받았습니다!
            </Snackbar2>
            {/* {isActive ? (
                <Snackbar.Toast show={true}>{message}</S.Toast>
            ) : (
                <Snackbar.Toast show={false} />
            )} */}
        </>
    );
};

export default Toast;
