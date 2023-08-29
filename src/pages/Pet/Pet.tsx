import { useEffect, useState, createContext } from 'react';
import { PetArea } from '@/components/pages/Pet/PetArea/PetArea';
import axiosRequest from '@/api';
import { res, myPet } from '@/@types';

export const MyContext = createContext<() => Promise<void>>(async () => {});

export default function Pet() {
    const [petData, setPetData] = useState({
        hungerInfo: {},
        affectionInfo: {},
        conditionInfo: {},
        cleanlinessInfo: {},
        expInfo: {},
        levelInfo: 0,
        petName: ""
    });

    async function receivePetData() {
        try {
            const response: res<myPet> = await axiosRequest.requestAxios<res<myPet>>("get", "/myPets", {});
            const petInfo = response.data.pet;
            console.log(petInfo);
            const petLevel: number = petInfo.level;
            
            // 데이터를 객체로 업데이트
            setPetData({
                hungerInfo: {
                    curHunger: petInfo.hunger,
                    maxHunger: 100 + petLevel*20
                },
                affectionInfo: {
                    curAffection: petInfo.affection,
                    maxAffection: 100 + petLevel*20
                },
                conditionInfo: {
                    curCondition: petInfo.condition,
                    maxCondition: 100 + petLevel*20
                },
                cleanlinessInfo: {
                    curCleanliness: petInfo.cleanliness,
                    maxCleanliness: 100 + petLevel*20
                },
                expInfo: {
                    curExperience: petLevel < 5 ? petInfo.experience : 1,
                    maxExperience: petLevel < 5 ? 100 * (2 ** (petLevel + 1)) - 100 : 1
                },
                levelInfo: petLevel,
                petName: petInfo.petName
            });
        } catch (error) {
            console.error("Error fetching pet data: ", error);
        }
    }

    useEffect(() => {
        receivePetData();
    }, []);

    // console.log(petData);

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
