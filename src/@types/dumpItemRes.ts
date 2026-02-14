export interface Item {
    item: string;
    quantity: number;
    _id: string;
}

export interface DumpItemRes {
    createdAt: string;
    updatedAt: string;
    userId: string;
    _id: string;
    items: Item[];
}

// 하위 호환성을 위한 타입 별칭 (추후 제거 예정)
/** @deprecated Use DumpItemRes instead */
export type dumpItemRes = DumpItemRes;
