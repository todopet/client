export interface ItemUsed {
    item: string;
    quantity: number;
    _id: string;
}

export interface Pet {
    affection: number;
    cleanliness: number;
    condition: number;
    hunger: number;
    experience: number;
    level: number;
    createdAt: string;
    updatedAt: string;
    _id: string;
    petName: string;
}

export interface UpdatedPet {
    pet: Pet;
    _id: string;
}

export interface UseItemRes {
    itemUsed: ItemUsed;
    updatedPet: UpdatedPet;
}

// 하위 호환성을 위한 타입 별칭 (추후 제거 예정)
/** @deprecated Use UseItemRes instead */
export type useItemRes = UseItemRes;