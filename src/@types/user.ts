import { UserStatus } from './enums';

export interface InventoryItem {
    itemId: string;
    quantity: number;
}

export interface User {
    id: string;
    name: string;
    status: UserStatus;
    inventory: InventoryItem[];
    createdAt: Date;
}

export interface MyUser {
    _id: string;
    googleId?: string;
    nickname: string;
    membershipStatus?: string;
    picture: string;
    createdAt: Date;
    updatedAt?: Date;
    withPetDate: number;
    todoCount: number;
    historyCount: number;
}

// 하위 호환성을 위한 타입 별칭 (추후 제거 예정)
/** @deprecated Use User instead */
export type user = User;

/** @deprecated Use MyUser instead */
export type myUser = MyUser;
