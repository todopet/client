export interface MyPet {
    _id: string;
    userId: string;
    pets: Pet[];
    createdAt: Date;
    updatedAt: Date;
}

interface Pet {
    pet: PetInfo;
    _id: string;
}

interface PetInfo {
    petName: string;
    level: number;
    affection: number;
    cleanliness: number;
    experience: number;
    hunger: number;
    condition: number;
    _id: string;
}
