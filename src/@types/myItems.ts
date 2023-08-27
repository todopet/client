export interface MyItems {
    createdAt: string;
    updatedAt: string;
    userId: string;
    _id: string;
    items: Items[];
}

export interface Items {
    info: ItemInfo;
    item: string;
    quantity: number;
    _id: string;
}

interface ItemInfo {
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
