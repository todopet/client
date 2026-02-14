export interface ItemInfo {
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

export interface Items {
    info: ItemInfo;
    item: string;
    quantity: number;
    _id: string;
}

export interface MyItems {
    createdAt: string;
    updatedAt: string;
    userId: string;
    _id: string;
    items: Items[];
}

// 하위 호환성을 위한 타입 별칭 (추후 제거 예정)
/** @deprecated Use MyItems instead */
export type myItems = MyItems;

/** @deprecated Use Items instead */
export type items = Items;

/** @deprecated Use ItemInfo instead */
export type itemInfo = ItemInfo;
