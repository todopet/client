export interface todo {
    categoryId: string;
    todoDate: Date;
    createdAt: Date;
    message: Message | null;
    status: string;
    todo: string;
    updatedAt: Date;
    userId: string;
    _id: string;
}
export interface Message {
    type: ToastTypes;
    reward: string | null;
    inventoryCount: number;
}
export enum ToastTypes {
    SPECIAL = "SPECIAL",
    NORMAL = "NORMAL",
    RECEIVED = "RECEIVED",
    ALL_RECEIVED = "ALL_RECEIVED",
    FULL = "FULL"
}
