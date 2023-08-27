import { Todo } from "@/@types/Todo";

export interface Category {
    _id: string;
    userId: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface TodoCategory extends Category {
    todos: Todo[];
}
