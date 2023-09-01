export interface myItems {
    createdAt: string;
    updatedAt: string;
    userId: string;
    _id: string;
    items: items[];
}

export interface items {
    info: itemInfo;
    item: string;
    quantity: number;
    _id: string;
}

interface itemInfo {
    createdAt: string;
    description: string;
    effect: number;
    experience: number;
    image: string;
    name: string;
    probability: number;
    status: string[];
    updatedAt: string;
    _id: string;
}