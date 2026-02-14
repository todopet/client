import { Todo } from './todo';

export interface Category {
    _id: string;
    userId: string;
    category: string;
    ended: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface TodoCategory extends Category {
    todos: Todo[];
}

// 하위 호환성을 위한 타입 별칭 (추후 제거 예정)
/** @deprecated Use Category instead */
export type category = Category;

/** @deprecated Use TodoCategory instead */
export type todoCategory = TodoCategory;
