export interface useItemRes {
    itemUsed: itemUsed;
    updatedPet: updatedPet;
}

interface itemUsed {
    item: string;
    quantity: number;
    _id: string;
}

interface updatedPet {
    pet: pet;
    _id: string;
}

interface pet {
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