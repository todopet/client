//hook
import { useState, useEffect } from "react";
//api, interface
import { axiosRequest } from "@/api";
import { res } from "@/@types";
//img
import background from "@/assets/images/miniPetBackground.png";
//components
import { MiniPetToast } from "@/components/pages/Todo/MiniPet/Toast/MiniPetToast";
//styles
import { MiniPetWrap, Bg, MyPet, MyPetWrap } from "@/components/pages/Todo/MiniPet/MiniPet.styles";
//util
import getPetSize from "@/libs/utils/getPetSize";
import useToastsStore from "@/store/toastStore";
import { notifyApiError } from "@/libs/utils/notifyApiError";

interface PetLevel {
    level: number | null;
}
export const MiniPet = () => {
  const getPetLevel = async () => {
        try {
            const response: res<PetLevel> = await axiosRequest.requestAxios<
                res<PetLevel>
            >("get", `myPets/myPet/level`);
            setPetLevel(response.data.level);
        } catch (error) {
            notifyApiError(
                error,
                "데이터를 가져오던 중 에러가 발생했습니다. 다시 시도해 주세요."
            );
        }
    }

    useEffect(() => {
        getPetLevel();
    }, []);

    const [PetLevel, setPetLevel] = useState<number | null>(null);

    interface ItemsCount {
        count: number;
    }

    //인벤토리 아이템 수량 조회
   const getItemsCount = async () => {
        try {
            const response: res<ItemsCount> = await axiosRequest.requestAxios<
                res<ItemsCount>
            >("get", `inventories/itemsCount`);
            setItemsCount(response.data.count);
        } catch (error) {
            notifyApiError(
                error,
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
    const { petImgWidth, petImgHeight } = getPetSize(PetLevel);

    return (
        <MiniPetWrap>
            <MyPetWrap>
                <MyPet
                    petLevel={PetLevel}
                    width={petImgWidth}
                    height={petImgHeight}
                />
            </MyPetWrap>
            <Bg src={background} alt="background" />
        </MiniPetWrap>
    );
}
