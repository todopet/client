import { user, myUser } from "@/@types/user";
import { category, todoCategory } from "@/@types/category";
import { todo } from "@/@types/todo";
import { myPet } from "@/@types/myPet";
import { myItems } from "@/@types/myItems";
import { dumpItemRes } from "@/@types/dumpItemRes";
import { RankInfo, userInfo } from "@/@types/ranking";
import { useItemRes } from "@/@types/useItemRes";
import { itemsCount } from "@/@types/itemsCount";

interface res<D> {
  status: number;
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
    myUser,
    useItemRes,
    itemsCount
};