export interface PetInfo {
    petName: string;
    level: number; // 0-5
    affection: number;
    cleanliness: number;
    experience: number;
    hunger: number;
    condition: number;
    _id: string;
    updatedAt: string;
    createdAt: string;
}

export interface MyPet {
    _id: string;
    userId: string;
    pet: PetInfo;
    createdAt: Date;
    updatedAt: Date;
}

// 하위 호환성을 위한 타입 별칭 (추후 제거 예정)
/** @deprecated Use MyPet instead */
export type myPet = MyPet;

/** @deprecated Use PetInfo instead */
export type petInfo = PetInfo;
