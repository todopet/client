// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { PetArea } from '@/components/pages/Pet/PetArea/PetArea';

// export default function Pet() {
//     const [petData, setPetData] = useState({
//         hungerInfo: {},
//         affectionInfo: {},
//         conditionInfo: {},
//         cleanlinessInfo: {},
//         expInfo: {},
//         levelInfo: 0, // 초기값으로 0 설정
//     });

//     async function receiveData() {
//         try {
//             const response = await axios.get("http://localhost:3001/api/v1/myPet");
//             const petData = response.data.data.pets[0];
            
//             // 데이터를 객체로 업데이트
//             setPetData({
//                 hungerInfo: {
//                     curHunger: petData.curHunger,
//                     hunger: petData.petInfo.hunger,
//                 },
//                 affectionInfo: {
//                     curAffection: petData.curAffection,
//                     affection: petData.petInfo.affection,
//                 },
//                 conditionInfo: {
//                     curCondition: petData.curCondition,
//                     condition: petData.petInfo.condition,
//                 },
//                 cleanlinessInfo: {
//                     curCleanliness: petData.curCleanliness,
//                     cleanliness: petData.petInfo.cleanliness,
//                 },
//                 expInfo: {
//                     curExp: petData.curExp,
//                     exp: petData.petInfo.exp,
//                 },
//                 levelInfo: petData.petInfo.level, // level 업데이트
//             });
//         } catch (error) {
//             console.error("Error fetching pet data: ", error);
//         }
//     }

//     useEffect(() => {
//         receiveData();
//     }, []);

//     // 데이터를 모두 받은 후에 PetArea 컴포넌트를 렌더링
//     return (
//         <PetArea
//             hungerInfo={petData.hungerInfo}
//             affectionInfo={petData.affectionInfo}
//             conditionInfo={petData.conditionInfo}
//             cleanlinessInfo={petData.cleanlinessInfo}
//             expInfo={petData.expInfo}
//             levelInfo={petData.levelInfo}
//         />
//     );
// }


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

    async function receiveData() {
        try {
            const response: res<myPet> = await axiosRequest.requestAxios<res<myPet>>("get", "/myPet", {});
            console.log(response);
            const petData = response.data.pets[0];
            
            
            // 데이터를 객체로 업데이트
            setPetData({
                hungerInfo: {
                    curHunger: petData.curHunger,
                    hunger: petData.petInfo.hunger,
                },
                affectionInfo: {
                    curAffection: petData.curAffection,
                    affection: petData.petInfo.affection,
                },
                conditionInfo: {
                    curCondition: petData.curCondition,
                    condition: petData.petInfo.condition,
                },
                cleanlinessInfo: {
                    curCleanliness: petData.curCleanliness,
                    cleanliness: petData.petInfo.cleanliness,
                },
                expInfo: {
                    curExp: petData.curExp,
                    exp: petData.petInfo.exp,
                },
                levelInfo: petData.petInfo.level, // level 업데이트
            });
        } catch (error) {
            console.error("Error fetching pet data: ", error);
        }
    }

    useEffect(() => {
        receiveData();
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
