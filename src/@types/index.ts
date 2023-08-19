import { user } from "@/@types/user";
import { category } from "@/@types/category";
import { todo } from "@/@types/todo";

interface res<D> {
    error: string | null;
    data: D;
}

export type { res, user, category, todo };
