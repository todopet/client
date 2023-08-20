import { user } from "@/@types/user";
import { category } from "@/@types/category";
import { todo } from "@/@types/todo";
import { myPet } from "@/@types/myPet";

interface res<D> {
    error: string | null;
    data: D;
}

export type { res, user, myPet, category, todo };
