import { user, myUser } from "@/@types/user";
import { category, todoCategory } from "@/@types/category";
import { todo } from "@/@types/todo";
import { myPet } from "@/@types/myPet";
import { myItems } from "./myItems";
import { dumpItemRes } from "@/@types/dumpItemRes";
import { RankInfo, userInfo } from "@/@types/ranking";

interface res<D> {
    error: string | null;
    data: D;
}

export type {
    res,
    user,
    myPet,
    category,
    todo,
    myItems,
    todoCategory,
    dumpItemRes,
    RankInfo,
    userInfo,
    myUser
};
