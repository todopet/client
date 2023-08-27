import { User, MyUser } from "@/@types/User";
import { Category, TodoCategory } from "@/@types/Category";
import { Todo } from "@/@types/Todo";
import { MyPet } from "@/@types/MyPet";
import { MyItems } from "./MyItems";
import { DumpItemRes } from "@/@types/DumpItemRes";
import { Ranking, UserInfo } from "@/@types/Ranking";

interface Res<D> {
    error: string | null;
    data: D;
}

export type {
    Res,
    User,
    MyPet,
    Category,
    Todo,
    MyItems,
    TodoCategory,
    DumpItemRes,
    Ranking,
    UserInfo,
    MyUser
};
