import { todo } from "@/@types/todo";

export interface category {
    _id: string;
    userId: string;
    category: string;
    ended: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface todoCategory extends category {
    todos: todo[];
}
