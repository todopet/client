//hook
import { useState, useRef, useEffect } from "react";
//img
import background from "@/assets/images/miniPetBackground.png";
import miniPet from "@/assets/images/lvZeroPet.png.png";
//components
import MiniPetToast, {
    ToastTypes
} from "@/components/pages/Todo/MiniPet/Toast/MiniPetToast";
//styles
import { MiniPetWrap, Bg, MyPet } from "./MiniPet.styles";

export default function MiniPet() {
    //보상관련 toast(투두를 체크를 했을때 set)
    const [isActive, setIsActive] = useState<boolean>(true); //api 적용 후 기본값 false로..
    const [itemName, setItemName] = useState<string>("사과");
    const [toastType, setToastType] = useState<ToastTypes>(ToastTypes.SPECIAL);

    //새싹이 관련
    const miniPetWrapperRef = useRef<HTMLDivElement | null>(null);
    const miniPetRef = useRef<HTMLImageElement | null>(null);
    const [yDirection, setYDirection] = useState(1); // 1 :up, -1 :down, 0 :stay
    const [xPosition, setXPosition] = useState(0);
    const [yPosition, setYPosition] = useState(5);

    useEffect(() => {
        //새싹이 이동패턴
        const moveSessak = () => {
            if (miniPetRef.current && miniPetWrapperRef.current) {
                //배경, 새싹 너비와 높이
                const containerWidth = miniPetWrapperRef.current.offsetWidth;
                const sessakWidth = miniPetRef.current.offsetWidth;
                const containerHeight = miniPetWrapperRef.current.offsetHeight;
                const sessakHeight = miniPetRef.current.offsetHeight;

                //x축 이동
                setXPosition(xPosition + 5);
                // console.log("xxx");
                if (xPosition > containerWidth) {
                    setXPosition(-sessakWidth);
                }

                //y축 이동
                if (yDirection === 1) {
                    setYPosition(yPosition + 5);
                    // console.log(1);
                } else if (yDirection === -1) {
                    setYPosition(yPosition - 5);
                    // console.log(-1);
                }

                //container영역으로 이동 제한
                if (
                    yPosition + sessakHeight >= containerHeight ||
                    yPosition - 5 === 5
                ) {
                    setYDirection(-yDirection);
                    setXPosition(xPosition + 5);
                    setXPosition(xPosition + 5);
                    setXPosition(xPosition + 5);

                    // console.log("stay");
                }

                miniPetRef.current.style.left = xPosition + "px";
                miniPetRef.current.style.bottom = yPosition + "px";
            }
        };

        const intervalId = setInterval(moveSessak, 250);

        return () => clearInterval(intervalId);
    }, [xPosition]);

    return (
        <MiniPetWrap ref={miniPetWrapperRef}>
            <MiniPetToast
                isActive={isActive}
                toastType={toastType}
                itemName={itemName}
            />
            <MyPet ref={miniPetRef} src={miniPet} alt="miniPet" />
            <Bg src={background} alt="background" />
        </MiniPetWrap>
    );
}
