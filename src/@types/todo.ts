export interface Todo {
    categoryId: string;
    createdAt: Date;
    message: Message | null;
    status: string;
    todo: string;
    updatedAt: Date;
    userId: string;
    _id: string;
}
interface Message {
    content: string;
    reward: string;
}
