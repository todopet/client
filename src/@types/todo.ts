import { TodoStatus, ToastType } from './enums';

export interface Todo {
    categoryId: string;
    todoDate: Date;
    createdAt: Date;
    message: Message | null;
    status: TodoStatus;
    todo: string;
    updatedAt: Date;
    userId: string;
    _id: string;
}

export interface Message {
    type: ToastType;
    reward: string | null;
    inventoryCount: number;
}

export const STATUS_TRANSITIONS: Record<TodoStatus, TodoStatus> = {
    [TodoStatus.UNCHECKED]: TodoStatus.COMPLETED,
    [TodoStatus.COMPLETED]: TodoStatus.REVERTED,
    [TodoStatus.REVERTED]: TodoStatus.COMPLETED,
};

export const isTodoStatus = (value: string): value is TodoStatus => {
    return Object.values(TodoStatus).includes(value as TodoStatus);
};

// 하위 호환성을 위한 타입 별칭 (추후 제거 예정)
/** @deprecated Use Todo instead */
export type todo = Todo;

/** @deprecated Use ToastType from './enums' instead */
export enum ToastTypes {
    SPECIAL = "SPECIAL",
    NORMAL = "NORMAL",
    RECEIVED = "RECEIVED",
    ALL_RECEIVED = "ALL_RECEIVED",
    FULL = "FULL"
}
