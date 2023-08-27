import { useEffect, useState } from 'react';
import { PetArea } from '@/components/pages/Pet/PetArea/PetArea';
import axiosRequest from '@/api';
import { res, myPet } from '@/@types';

export default function Pet() {
    const [petData, setPetData] = useState({
        hungerInfo: {},
        affectionInfo: {},
        conditionInfo: {},
        cleanlinessInfo: {},
        expInfo: {},
        levelInfo: 0, // 초기값으로 0 설정
    });

    async function receivePetData() {
        try {
            const response: res<myPet> = await axiosRequest.requestAxios<res<myPet>>("get", "/myPets", {});
            const petInfo = response.data.pets[0];
            // console.log(petInfo);
            const petLevel: number = petInfo.pet.level;
            
            // 데이터를 객체로 업데이트
            setPetData({
                hungerInfo: {
                    curHunger: petInfo.pet.hunger,
                    maxHunger: 100 + petLevel*20
                },
                affectionInfo: {
                    curAffection: petInfo.pet.affection,
                    maxAffection: 100 + petLevel*20
                },
                conditionInfo: {
                    curCondition: petInfo.pet.condition,
                    maxCondition: 100 + petLevel*20
                },
                cleanlinessInfo: {
                    curCleanliness: petInfo.pet.cleanliness,
                    maxCleanliness: 100 + petLevel*20
                },
                expInfo: {
                    curExperience: petLevel < 5 ? petInfo.pet.experience : 1,
                    maxExperience: petLevel < 5 ? 100 * (2 ** petLevel) : 1
                },
                levelInfo: petLevel // level 업데이트
            });
        } catch (error) {
            console.error("Error fetching pet data: ", error);
        }
    }

    useEffect(() => {
        receivePetData();
    }, []);

    // 데이터를 모두 받은 후에 PetArea 컴포넌트를 렌더링
    return (
        <PetArea
            hungerInfo={petData.hungerInfo}
            affectionInfo={petData.affectionInfo}
            conditionInfo={petData.conditionInfo}
            cleanlinessInfo={petData.cleanlinessInfo}
            expInfo={petData.expInfo}
            levelInfo={petData.levelInfo}
        />
    );
}
