import { useEffect, useState, createContext } from "react";
import { PetArea } from "@/components/pages/Pet/PetArea";
import { axiosRequest } from "@/api";
import { res, myPet } from "@/@types";
import { notifyApiError } from "@/libs/utils/notifyApiError";
import { PetAreaProps } from "@/components/pages/Pet/PetArea/types";

export const MyContext = createContext<() => Promise<void>>(async () => {});

const initialPetData: PetAreaProps = {
    hungerInfo: { curHunger: 0, maxHunger: 1 },
    affectionInfo: { curAffection: 0, maxAffection: 1 },
    conditionInfo: { curCondition: 0, maxCondition: 1 },
    cleanlinessInfo: { curCleanliness: 0, maxCleanliness: 1 },
    expInfo: { curExperience: 0, maxExperience: 1 },
    levelInfo: null,
    petName: ""
};

const Pet = () => {
    const [petData, setPetData] = useState<PetAreaProps>(initialPetData);

    const receivePetData = async () => {
        try {
            const response: res<myPet> = await axiosRequest.requestAxios<
                res<myPet>
            >("get", "myPets", {});
            const petInfo = response.data.pet;
            const petLevel: number | null = petInfo.level;
            const safeLevel = petLevel ?? 0;
            // const petLevel: number = 5;

            // 데이터를 객체로 업데이트
            setPetData({
                hungerInfo: {
                    curHunger: petInfo.hunger,
                    maxHunger: 100 + safeLevel * 20
                },
                affectionInfo: {
                    curAffection: petInfo.affection,
                    maxAffection: 100 + safeLevel * 20
                },
                conditionInfo: {
                    curCondition: petInfo.condition,
                    maxCondition: 100 + safeLevel * 20
                },
                cleanlinessInfo: {
                    curCleanliness: petInfo.cleanliness,
                    maxCleanliness: 100 + safeLevel * 20
                },
                expInfo: {
                    curExperience: safeLevel < 5 ? petInfo.experience : 1,
                    maxExperience:
                        safeLevel < 5 ? 100 * 2 ** (safeLevel + 1) - 100 : 1
                },
                levelInfo: petLevel,
                petName: petInfo.petName
            });
        } catch (error) {
            notifyApiError(
                error,
                "펫 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요."
            );
        }
    }

    useEffect(() => {
        receivePetData();
    }, []);

    // 데이터를 모두 받은 후에 PetArea 컴포넌트를 렌더링
    return (
        <MyContext.Provider value={receivePetData}>
            <PetArea
                hungerInfo={petData.hungerInfo}
                affectionInfo={petData.affectionInfo}
                conditionInfo={petData.conditionInfo}
                cleanlinessInfo={petData.cleanlinessInfo}
                expInfo={petData.expInfo}
                levelInfo={petData.levelInfo}
                petName={petData.petName}
            />
        </MyContext.Provider>
    );
}

export default Pet;
