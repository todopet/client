import { useEffect, useState, createContext } from "react";
import { PetArea } from "@/components/pages/Pet/PetArea";
import { axiosRequest } from "@/api";
import { res, myPet } from "@/@types";
import { notifyApiError } from "@/libs/utils/notifyApiError";

export const MyContext = createContext<() => Promise<void>>(async () => {});

const Pet = () => {
    const [petData, setPetData] = useState({
        hungerInfo: {},
        affectionInfo: {},
        conditionInfo: {},
        cleanlinessInfo: {},
        expInfo: {},
        levelInfo: null as number | null, //levelInfo에 초기값을 숫자로 지정해주면 펫 정보가 받아와지기 전 딜레이 타이밍때 해당 레벨의 펫이미지, 레벨 정보 등이 나와서 초기값 null로 해줌
        petName: ""
    });

    const receivePetData = async () => {
        try {
            const response: res<myPet> = await axiosRequest.requestAxios<
                res<myPet>
            >("get", "myPets", {});
            const petInfo = response.data.pet;
            const petLevel: number | null = petInfo.level;
            // const petLevel: number = 5;

            // 데이터를 객체로 업데이트
            setPetData({
                hungerInfo: {
                    curHunger: petInfo.hunger,
                    maxHunger: 100 + petLevel * 20
                },
                affectionInfo: {
                    curAffection: petInfo.affection,
                    maxAffection: 100 + petLevel * 20
                },
                conditionInfo: {
                    curCondition: petInfo.condition,
                    maxCondition: 100 + petLevel * 20
                },
                cleanlinessInfo: {
                    curCleanliness: petInfo.cleanliness,
                    maxCleanliness: 100 + petLevel * 20
                },
                expInfo: {
                    curExperience: petLevel < 5 ? petInfo.experience : 1,
                    maxExperience:
                        petLevel < 5 ? 100 * 2 ** (petLevel + 1) - 100 : 1
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
