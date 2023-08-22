import { todo } from "@/@types/todo";

export interface category {
    _id: string;
    userId: string;
    category: string;
    todos: todo[];
    createdAt: Date;
    updatedAt: Date;
}
