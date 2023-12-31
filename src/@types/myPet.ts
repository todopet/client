export interface myPet {
    _id: string;
    userId: string;
    pet: petInfo;
    createdAt: Date;
    updatedAt: Date;
}

// interface pet {
//     pet: petInfo;
//     _id: string;
// }

interface petInfo {
    petName: string;
    level: number;
    affection: number;
    cleanliness: number;
    experience: number;
    hunger: number;
    condition: number;
    _id: string;
    updatedAt: string;
    createdAt: string;
}
