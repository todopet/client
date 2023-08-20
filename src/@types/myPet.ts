export interface myPet {
    _id: string;
    userId: string;
    pets: pets[];
    createdAt: Date;
    updatedAt: Date;
}

interface pets {
    pet: string;
    myPetName: string;
    curAffection: number;
    curCleanliness: number;
    curExp: number;
    curHunger: number;
    curCondition: number;
    _id: string;
    petInfo: petInfo;
}

interface petInfo {
    affection: number;
    cleanliness: number;
    condition: number;
    hunger: number;
    exp: number;
    level: number;
    createdAt: string;
    updatedAt: string;
    petName: string;
    _id: string;
}