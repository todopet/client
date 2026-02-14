export interface ItemsCount {
    count: number;
}

// 하위 호환성을 위한 타입 별칭 (추후 제거 예정)
/** @deprecated Use ItemsCount instead */
export type itemsCount = ItemsCount;