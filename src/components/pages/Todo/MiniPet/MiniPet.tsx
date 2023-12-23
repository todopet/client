//hook
import { useState, useRef, useEffect } from "react";
//api, interface
import axiosRequest from "@/api/index";
import { res } from "@/@types/index";
//img
import background from "@/assets/images/miniPetBackground.png";
import miniPet from "@/assets/images/pet-0.png";
//components
import MiniPetToast from "@/components/pages/Todo/MiniPet/Toast/MiniPetToast";
import Toast from "@/components/Toast/Toast";

//styles
import { MiniPetWrap, Bg, MyPet } from "./MiniPet.styles";

interface Petlevel {
    level: number | null;
}
export default function MiniPet() {
    //마이펫 레벨 get
    async function getPetlevel() {
        try {
            const response: res<Petlevel> = await axiosRequest.requestAxios<
                res<Petlevel>
            >("get", `myPets/myPet/level`);
            setPetlevel(response.data.level);
        } catch (error) {
            console.error(error);
            alert(
                "데이터를 가져오던 중 에러가 발생했습니다. 다시 시도해 주세요."
            );
        }
    }
    useEffect(() => {
        getPetlevel();
    }, []);

    //마이펫 레벨
    const [petlevel, setPetlevel] = useState<number | null>(null);

    interface ItemsCount {
        count: number;
    }

    //인벤토리 아이템 수량 조회
    async function getItemsCount() {
        try {
            const response: res<ItemsCount> = await axiosRequest.requestAxios<
                res<ItemsCount>
            >("get", `inventories/itemsCount`);
            setItemsCount(response.data.count);
        } catch (error) {
            console.error(error);
            alert(
                "데이터를 가져오던 중 에러가 발생했습니다. 다시 시도해 주세요."
            );
        }
    }
    const [itemsCount, setItemsCount] = useState<number>(0);
    const [isActiveToast, setIsActiveToast] = useState<boolean>(false);
    const [toastContent, setToastContent] = useState<React.ReactNode | null>(
        null
    );
    useEffect(() => {
        getItemsCount();
        if (itemsCount >= 50) {
            setToastContent(
                <>
                    인벤토리가 가득찼습니다.
                    <br />
                    아이템을 정리하여 다음 보상을 받으세요 🙂
                </>
            );
            setIsActiveToast(true);
        }
    }, [itemsCount]);
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
                if (xPosition > containerWidth) {
                    setXPosition(-sessakWidth);
                }

                //y축 이동
                if (yDirection === 1) {
                    setYPosition(yPosition + 5);
                } else if (yDirection === -1) {
                    setYPosition(yPosition - 5);
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
                }

                miniPetRef.current.style.left = xPosition + "px";
                miniPetRef.current.style.bottom = yPosition + "px";
            }
        };

        const intervalId = setInterval(moveSessak, 250);

        return () => clearInterval(intervalId);
    }, [xPosition]);

    // 펫이 레벨별로 이미지 사이즈 지정
    let petImgSize = { petImgWidth: 50, petImgHeight: 50 };
    switch (petlevel) {
        case 0:
            petImgSize = { petImgWidth: 31, petImgHeight: 37.4 };
            break;
        case 1:
            petImgSize = { petImgWidth: 53, petImgHeight: 37.4 };
            break;
        case 2:
            petImgSize = { petImgWidth: 59.2, petImgHeight: 34.4 };
            break;
        case 3:
            petImgSize = { petImgWidth: 59.2, petImgHeight: 50 };
            break;
        case 4:
            petImgSize = { petImgWidth: 71.8, petImgHeight: 56.2 };
            break;
        case 5:
            petImgSize = { petImgWidth: 93.6, petImgHeight: 62.4 };
            break;
    }
    const { petImgWidth, petImgHeight } = petImgSize as {
        petImgWidth: number;
        petImgHeight: number;
    };
    return (
        <MiniPetWrap ref={miniPetWrapperRef}>
            {isActiveToast && (
                <Toast
                    isActive={isActiveToast}
                    bgcolor={"black"}
                    content={toastContent}
                />
            )}

            <MiniPetToast />
            <MyPet
                ref={miniPetRef}
                petlevel={petlevel}
                width={petImgWidth}
                height={petImgHeight}
            />
            <Bg src={background} alt="background" />
        </MiniPetWrap>
    );
}
