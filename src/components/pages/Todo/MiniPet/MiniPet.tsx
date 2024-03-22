//hook
import { useState, useEffect } from "react";
//api, interface
import axiosRequest from "@/api/index";
import { res } from "@/@types/index";
//img
import background from "@/assets/images/miniPetBackground.png";
//components
import MiniPetToast from "@/components/pages/Todo/MiniPet/Toast/MiniPetToast";
import Toast from "@/components/Toast/Toast";
//styles
import { MiniPetWrap, Bg, MyPet, MyPetWrap } from "./MiniPet.styles";
//util
import getPetSize from "@/libs/utils/getPetSize";
import useToastsStore from "@/store/toastStore";

interface Petlevel {
    level: number | null;
}
export default function MiniPet() {
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

    const { showToast } = useToastsStore();
    const [itemsCount, setItemsCount] = useState<number>(0);

    useEffect(() => {
        getItemsCount();
        if (itemsCount >= 50) {
            showToast(MiniPetToast, {});
        }
    }, [itemsCount]);

    //새싹이 관련
    const { petImgWidth, petImgHeight } = getPetSize(petlevel);

    return (
        <MiniPetWrap className="toast-wrapper">
            <Toast />
            <MyPetWrap>
                <MyPet
                    petlevel={petlevel}
                    width={petImgWidth}
                    height={petImgHeight}
                />
            </MyPetWrap>
            <Bg src={background} alt="background" />
        </MiniPetWrap>
    );
}
